import asyncio
import argparse
import json
import os
import subprocess
import time
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "tools" / "audio-manifest.json"
TEMP_DIR = Path(os.environ["TEMP"]) / "be-hoc-vui-edge"
VOICES = {
    "vi": "vi-VN-HoaiMyNeural",
    "en": "en-US-AriaNeural",
}
RATE = "-15%"
BATCH_SIZE = 24


def clip_group(clip):
    language = "vi" if clip["voice"].startswith("vi-") else "en"
    if "/letters/" in clip["path"]:
        section = "letters"
    elif "/numbers/" in clip["path"]:
        section = "numbers"
    elif "/vehicles/" in clip["path"]:
        section = "vehicles"
    elif "/explore/" in clip["path"]:
        section = "explore"
    elif "/prompts/" in clip["path"]:
        section = "prompts"
    else:
        section = "animals"
    return language, section


async def synthesize_group(language, section, clips, batch_index):
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    text = " ".join(clip["text"] for clip in clips)
    batch_path = TEMP_DIR / f"{section}-{language}-{batch_index}.mp3"

    for attempt in range(1, 7):
        audio = bytearray()
        words = []
        communicator = edge_tts.Communicate(
            text,
            VOICES[language],
            rate=RATE,
            boundary="WordBoundary",
        )
        try:
            async for event in communicator.stream():
                if event["type"] == "audio":
                    audio.extend(event["data"])
                elif event["type"] == "WordBoundary":
                    words.append(event)
            expected_words = sum(len(clip["text"].rstrip(".").split()) for clip in clips)
            if len(words) == expected_words and len(audio) > 5000:
                batch_path.write_bytes(audio)
                return words
        except Exception as error:
            print(f"Retry {section}-{language} ({attempt}/6): {error}", flush=True)
        await asyncio.sleep(attempt * 1.5)

    raise RuntimeError(
        f"Edge TTS returned {len(words)} word boundaries for "
        f"{sum(len(clip['text'].rstrip('.').split()) for clip in clips)} "
        f"expected words in {section}-{language}"
    )


def extract_segment(batch_path, start, duration, destination):
    temporary = destination.with_suffix(".new.mp3")
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-ss",
            f"{start:.4f}",
            "-i",
            str(batch_path),
            "-t",
            f"{duration:.4f}",
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "128k",
            str(temporary),
        ],
        check=True,
    )
    temporary.replace(destination)


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--section", default="")
    parser.add_argument("--language", choices=("vi", "en"), default="")
    parser.add_argument("--missing", action="store_true")
    args = parser.parse_args()
    clips = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if args.missing:
        clips = [
            clip
            for clip in clips
            if not (ROOT / clip["path"]).resolve().exists()
        ]
    grouped = {}
    for clip in clips:
        grouped.setdefault(clip_group(clip), []).append(clip)

    total = 0
    for (language, section), group in grouped.items():
        if args.section and section != args.section:
            continue
        if args.language and language != args.language:
            continue
        for batch_index, batch_start in enumerate(range(0, len(group), BATCH_SIZE)):
            clips_batch = group[batch_start : batch_start + BATCH_SIZE]
            print(
                f"Synthesizing {len(clips_batch)} {section}-{language} clips "
                f"({batch_start + 1}-{batch_start + len(clips_batch)}/{len(group)})...",
                flush=True,
            )
            boundaries = await synthesize_group(
                language,
                section,
                clips_batch,
                batch_index,
            )
            batch_path = TEMP_DIR / f"{section}-{language}-{batch_index}.mp3"
            cursor = 0
            for index, clip in enumerate(clips_batch):
                word_count = len(clip["text"].rstrip(".").split())
                phrase_words = boundaries[cursor : cursor + word_count]
                cursor += word_count
                first = phrase_words[0]
                last = phrase_words[-1]
                start = max(0, first["offset"] / 10_000_000 - 0.06)
                desired_end = (
                    last["offset"] / 10_000_000
                    + last["duration"] / 10_000_000
                    + 0.18
                )
                if index + 1 < len(clips_batch):
                    next_word = boundaries[cursor]
                    next_start = next_word["offset"] / 10_000_000
                    desired_end = min(desired_end, next_start - 0.025)
                duration = max(0.3, desired_end - start)
                extract_segment(batch_path, start, duration, (ROOT / clip["path"]).resolve())
                total += 1
            print(f"Finished {section}-{language} batch {batch_index + 1}.", flush=True)
        await asyncio.sleep(1.2)

    print(f"Edge Neural audio ready: {total} files.")


if __name__ == "__main__":
    asyncio.run(main())
