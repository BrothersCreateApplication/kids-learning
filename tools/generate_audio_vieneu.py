import json
import subprocess
import sys
from pathlib import Path

import soundfile as sf
from vieneu import Vieneu


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "tools" / "audio-manifest.json"
TEMP_DIR = ROOT / ".cache" / "vieneu-output"
BATCH_SIZE = 16


def write_mp3(audio, sample_rate, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    wav_path = TEMP_DIR / f"{destination.stem}.wav"
    temporary_mp3 = destination.with_suffix(".new.mp3")
    sf.write(str(wav_path), audio, sample_rate)
    subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(wav_path),
            "-codec:a",
            "libmp3lame",
            "-b:a",
            "128k",
            str(temporary_mp3),
        ],
        check=True,
    )
    temporary_mp3.replace(destination)
    wav_path.unlink(missing_ok=True)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    clips = [
        clip
        for clip in json.loads(MANIFEST.read_text(encoding="utf-8"))
        if clip["voice"].startswith("vi-")
    ]
    tts = Vieneu(mode="v3nano")
    generated = 0

    for offset in range(0, len(clips), BATCH_SIZE):
        batch = clips[offset : offset + BATCH_SIZE]
        audios = tts.infer_batch(
            [clip["text"] for clip in batch],
            voice="Mỹ Duyên",
            speed=0.82,
            steps=24,
            apply_watermark=False,
        )
        for clip, audio in zip(batch, audios):
            destination = (ROOT / clip["path"]).resolve()
            write_mp3(audio, tts.sample_rate, destination)
            generated += 1
        print(
            f"Generated {generated}/{len(clips)} Vietnamese clips...",
            flush=True,
        )

    print(f"VieNeu audio ready: {generated} Vietnamese clips.")


if __name__ == "__main__":
    main()
