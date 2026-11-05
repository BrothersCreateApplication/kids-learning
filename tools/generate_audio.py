import argparse
import json
import time
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "tools" / "audio-manifest.json"
CONCURRENCY = 5
GOOGLE_TTS_URL = "https://translate.google.com/translate_tts"
SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/130.0 Safari/537.36"
        )
    }
)


def generate_clip(clip, counters, force):
    destination = ROOT / clip["path"]
    destination = destination.resolve()
    if not destination.is_relative_to((ROOT / "assets" / "audio").resolve()):
        raise RuntimeError(f"Audio path escaped the audio directory: {destination}")
    if not force and destination.exists() and destination.stat().st_size > 5000:
        counters["skipped"] += 1
        return

    destination.parent.mkdir(parents=True, exist_ok=True)
    language = "vi" if clip["voice"].startswith("vi-") else "en"
    for attempt in range(1, 5):
        response = SESSION.get(
            GOOGLE_TTS_URL,
            params={
                "ie": "UTF-8",
                "client": "tw-ob",
                "tl": language,
                "q": clip["text"],
            },
            timeout=45,
        )
        is_mpeg = response.content.startswith((b"ID3", b"\xff\xf3", b"\xff\xfb"))
        if response.ok and is_mpeg and len(response.content) > 5000:
            destination.write_bytes(response.content)
            counters["created"] += 1
            if counters["created"] % 20 == 0:
                print(f"Generated {counters['created']} clips...", flush=True)
            time.sleep(0.22)
            return
        wait = int(response.headers.get("Retry-After", attempt * 2))
        print(
            f"Speech retry in {wait}s for {clip['path']} "
            f"(HTTP {response.status_code})...",
            flush=True,
        )
        time.sleep(wait)
    raise RuntimeError(f"Could not generate {clip['path']} after 4 attempts")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Replace existing audio files")
    parser.add_argument(
        "--only",
        default="",
        help="Only generate clips whose path contains this folder name",
    )
    args = parser.parse_args()
    clips = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if args.only:
        clips = [clip for clip in clips if args.only in clip["path"]]
    counters = {"created": 0, "skipped": 0}
    for clip in clips:
        generate_clip(clip, counters, args.force)
    print(
        f"Audio ready: {counters['created']} created, "
        f"{counters['skipped']} already present."
    )


if __name__ == "__main__":
    main()
