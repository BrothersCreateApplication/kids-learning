import argparse
import json
import os
import subprocess
import sys
import wave
from pathlib import Path

from piper.config import SynthesisConfig
from piper.voice import PiperVoice


ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "tools" / "audio-manifest.json"
MODEL_DIR = Path(os.environ.get("PIPER_MODEL_DIR", Path(os.environ["TEMP"]) / "piper-voices"))
MODELS = {
    "vi": MODEL_DIR / "vi_VN-vais1000-medium.onnx",
    "en": MODEL_DIR / "en_US-lessac-medium.onnx",
}


def write_wav(voice, text, destination, length_scale):
    chunks = list(
        voice.synthesize(
            text,
            SynthesisConfig(
                length_scale=length_scale,
                noise_scale=0.68,
                noise_w_scale=0.8,
                normalize_audio=True,
            ),
        )
    )
    if not chunks:
        raise RuntimeError(f"No audio generated for: {text}")
    with wave.open(str(destination), "wb") as wav_file:
        first = chunks[0]
        wav_file.setnchannels(first.sample_channels)
        wav_file.setsampwidth(first.sample_width)
        wav_file.setframerate(first.sample_rate)
        for chunk in chunks:
            wav_file.writeframes(chunk.audio_int16_bytes)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", default="", help="Only paths containing this text")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    for language, model in MODELS.items():
        if not model.exists():
            raise FileNotFoundError(f"Missing Piper voice model: {model}")

    clips = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if args.only:
        clips = [clip for clip in clips if args.only in clip["path"]]

    voices = {
        "vi": PiperVoice.load(MODELS["vi"]),
        "en": PiperVoice.load(MODELS["en"]),
    }
    length_scales = {"vi": 1.06, "en": 1.02}
    temp_dir = Path(os.environ["TEMP"]) / "be-hoc-vui-piper"
    temp_dir.mkdir(parents=True, exist_ok=True)
    generated = 0

    for index, clip in enumerate(clips, start=1):
        destination = (ROOT / clip["path"]).resolve()
        if not destination.is_relative_to((ROOT / "assets" / "audio").resolve()):
            raise RuntimeError(f"Unsafe audio output: {destination}")
        if destination.exists() and not args.force:
            continue

        language = "vi" if clip["voice"].startswith("vi-") else "en"
        wav_path = temp_dir / f"{destination.stem}.wav"
        write_wav(voices[language], clip["text"], wav_path, length_scales[language])
        destination.parent.mkdir(parents=True, exist_ok=True)
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
                str(destination),
            ],
            check=True,
        )
        wav_path.unlink(missing_ok=True)
        generated += 1
        if generated % 20 == 0:
            print(f"Generated {generated}/{len(clips)} natural voice clips...", flush=True)

    print(f"Piper audio ready: {generated} generated.")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
