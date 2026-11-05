import json
import os
import argparse
import subprocess
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets" / "audio" / "animal-cards"


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    animals = load_json(ROOT / "tools" / "lesson-data.json")["ANIMALS"]
    wikimedia_sounds = load_json(ROOT / "tools" / "animal-sound-manifest.json")
    freesound_sounds = load_json(ROOT / "tools" / "freesound-manifest.json")
    sounds = {**wikimedia_sounds, **freesound_sounds}
    OUTPUT.mkdir(parents=True, exist_ok=True)
    built = 0

    for animal in animals:
        sound = sounds.get(animal["id"], {})
        if sound.get("status") != "ready" or not sound.get("file"):
            continue
        sound_path = ROOT / sound["file"]
        if not sound_path.exists():
            continue
        for language in ("vi", "en"):
            voice_path = ROOT / "assets" / "audio" / "animals" / f"{animal['id']}-{language}.mp3"
            if not voice_path.exists():
                continue
            destination = OUTPUT / f"{animal['id']}-{language}.mp3"
            if (
                not args.force
                and
                destination.exists()
                and destination.stat().st_mtime
                >= max(voice_path.stat().st_mtime, sound_path.stat().st_mtime)
            ):
                continue

            filter_graph = (
                "[0:a]aresample=44100,aformat=sample_fmts=fltp:"
                "sample_rates=44100:channel_layouts=stereo[a0];"
                "[2:a]aresample=44100,aformat=sample_fmts=fltp:"
                "sample_rates=44100:channel_layouts=stereo[a1];"
                "[1:a]aresample=44100,aformat=sample_fmts=fltp:"
                "sample_rates=44100:channel_layouts=stereo[a2];"
                "[a0][a1][a2]concat=n=3:v=0:a=1[out]"
            )
            command = [
                "ffmpeg",
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-i",
                str(voice_path),
                "-f",
                "lavfi",
                "-t",
                "0.35",
                "-i",
                "anullsrc=r=44100:cl=stereo",
                "-i",
                str(sound_path),
                "-filter_complex",
                filter_graph,
                "-map",
                "[out]",
                "-b:a",
                "128k",
                str(destination.with_suffix(".new.mp3")),
            ]
            subprocess.run(command, check=True)
            temporary = destination.with_suffix(".new.mp3")
            for attempt in range(5):
                try:
                    os.replace(temporary, destination)
                    break
                except PermissionError:
                    if attempt == 4:
                        raise
                    time.sleep(0.4)
            built += 1
            if built % 20 == 0:
                print(f"Built {built} combined animal clips...", flush=True)

    print(f"Combined animal audio ready. Newly built: {built}.")


if __name__ == "__main__":
    main()
