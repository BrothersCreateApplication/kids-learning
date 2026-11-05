import html
import json
import re
import subprocess
import sys
import argparse
import time
from pathlib import Path
from urllib.parse import quote_plus, urljoin

import requests

sys.stdout.reconfigure(encoding="utf-8")


ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "tools" / "lesson-data.json"
OUTPUT_DIR = ROOT / "assets" / "animal-sounds"
MANIFEST_PATH = ROOT / "tools" / "freesound-manifest.json"
SEARCH_URL = "https://freesound.org/search/"
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

SEARCH_TERMS = {
    "dog": "dog bark",
    "cat": "cat meow",
    "rabbit": "rabbit squeak",
    "hamster": "hamster squeak",
    "mouse": "mouse squeak",
    "parrot": "parrot sound",
    "cow": "cow moo",
    "pig": "pig grunt",
    "sheep": "sheep bleat",
    "goat": "goat bleat",
    "horse": "horse neighing",
    "donkey": "donkey bray",
    "llama": "llama sound",
    "chicken": "chicken cluck",
    "rooster": "rooster crow",
    "duck": "duck quack",
    "goose": "goose honk",
    "lion": "lion roar",
    "tiger": "tiger growl",
    "elephant": "elephant trumpet",
    "zebra": "zebra sound",
    "monkey": "monkey sound",
    "gorilla": "gorilla sound",
    "fox": "fox call",
    "wolf": "wolf howl",
    "bear": "bear growl",
    "polar-bear": "polar bear growl",
    "panda": "panda sound",
    "koala": "koala call",
    "kangaroo": "kangaroo sound",
    "deer": "deer call",
    "moose": "moose call",
    "hippo": "hippo sound",
    "rhino": "rhino grunt",
    "leopard": "leopard growl",
    "camel": "camel grunt",
    "badger": "badger sound",
    "otter": "otter sound",
    "beaver": "beaver sound",
    "hedgehog": "hedgehog animal",
    "bat": "bat call",
    "squirrel": "squirrel chatter",
    "skunk": "skunk hiss",
    "raccoon": "raccoon sound",
    "bison": "bison bellow",
    "snake": "snake hiss",
    "lizard": "lizard hiss",
    "frog": "frog croak",
    "eagle": "eagle call",
    "owl": "owl hoot",
    "peacock": "peacock call",
    "flamingo": "flamingo sound",
    "penguin": "penguin sound",
    "swan": "swan honking",
    "dove": "dove coo",
    "turkey": "turkey gobble",
    "bird": "bird chirp",
    "whale": "whale song",
    "dolphin": "dolphin click",
    "crab": "crab animal",
    "lobster": "lobster click",
    "seal": "seal bark",
    "crocodile": "crocodile sound",
    "bee": "bee buzz",
    "cricket": "cricket chirp",
    "fly": "fly buzz",
    "mosquito": "mosquito buzz",
    "t-rex": "dinosaur roar",
}

QUIET_ANIMALS = {
    "turtle",
    "goldfish",
    "giraffe",
    "sloth",
    "mammoth",
    "shark",
    "octopus",
    "squid",
    "shrimp",
    "fish",
    "tropical-fish",
    "pufferfish",
    "jellyfish",
    "oyster",
    "coral",
    "caterpillar",
    "butterfly",
    "ladybug",
    "ant",
    "spider",
    "scorpion",
    "snail",
    "beetle",
    "brachiosaurus",
    "dodo",
}

BAD_TITLE_WORDS = (
    "music",
    "song",
    "remix",
    "beat",
    "instrument",
    "human",
    "imitation",
    "comedy",
)

PREFERRED_TITLES = {
    "parrot": "Macaw Parrot screaming in a park",
    "horse": "horse neigh shortened",
    "goose": "Goose Trumpet",
    "tiger": "Tiger Roar",
    "elephant": "Elephant Trumpets Growls",
    "zebra": "Grant's Zebra Braying",
    "lion": "Big Lion Roar",
    "monkey": "monkey noises.mp3",
    "fox": "Fox Scream Mating Call",
    "bear": "Grizzly Bear growl eating",
    "eagle": "Bald Eagle Calls",
    "peacock": "Peacock call",
    "swan": "Swans at Marsh Lake",
    "turkey": "Wild Turkey.wav",
    "bird": "Single Bird Chirping",
    "whale": "whale song",
    "dolphin": "Alien Dolphin Clicking",
    "chicken": "Chicken clucking 2",
    "rhino": "Indian rhinoceros",
    "deer": "Deer_chucker_call_s",
    "camel": "G12-05-Camel Grunt",
    "badger": "badger eating peanuts",
    "hedgehog": "Hedgehog in the bathtub",
    "bat": "Bat echolocation call captured",
    "bison": "Bison bellowing",
    "frog": "frog croak.wav",
    "penguin": "Penguin at Brown Bluff",
    "crab": "crab walking",
    "lobster": "Lobsters, breathing, clicking",
    "seal": "G12-28-Seal Bark",
    "crocodile": "Baby Crocodile",
    "llama": "51-Llamas.wav",
    "gorilla": "G-Gorilla_1-2",
    "otter": "otters.mp3",
    "mosquito": "Single Mosquito Buzz",
    "flamingo": "Flamingos",
    "t-rex": "dinosaur roar 1",
}

UNAVAILABLE_ANIMALS = QUIET_ANIMALS | {
    "koala",
    "panda",
    "polar-bear",
    "kangaroo",
    "raccoon",
    "leopard",
    "beaver",
    "skunk",
    "lizard",
    "moose",
}


def slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")[:64]


def fetch_search(query):
    response = SESSION.get(
        SEARCH_URL,
        params={
            "q": query,
            "f": 'license:"Creative Commons 0"',
        },
        timeout=45,
    )
    response.raise_for_status()
    return response.text


def parse_results(page_html):
    blocks = re.split(r'<div\s+class="bw-player"', page_html)[1:]
    results = []
    for block in blocks:
        attributes = dict(
            re.findall(r'data-([a-z0-9-]+)="([^"]*)"', block, flags=re.IGNORECASE)
        )
        sound_id = attributes.get("sound-id", "")
        title = html.unescape(attributes.get("title", ""))
        mp3 = html.unescape(attributes.get("mp3", ""))
        username = html.unescape(attributes.get("username", ""))
        if not sound_id or not title or not mp3:
            continue
        try:
            duration = float(attributes.get("duration", "0"))
        except ValueError:
            duration = 0
        results.append(
            {
                "id": sound_id,
                "title": title,
                "username": username,
                "duration": duration,
                "mp3": mp3.replace("-lq.mp3", "-hq.mp3"),
                "source": urljoin(
                    SEARCH_URL,
                    f"/people/{quote_plus(username)}/sounds/{sound_id}/",
                ),
            }
        )
    return results


def choose_result(results, animal_id):
    preferred = PREFERRED_TITLES.get(animal_id, "").lower()
    if preferred:
        for result in results:
            if preferred in result["title"].lower():
                return result
    viable = [
        result
        for result in results
        if 0.35 <= result["duration"] <= 90
        and not any(word in result["title"].lower() for word in BAD_TITLE_WORDS)
    ]
    if not viable:
        return None
    viable.sort(
        key=lambda result: (
            abs(result["duration"] - 3.0),
            -result["duration"],
        )
    )
    return viable[0]


def download_clip(animal_id, result, force=False):
    destination = OUTPUT_DIR / (
        f"{animal_id}-{slugify(result['title'])}-freesound.mp3"
    )
    if destination.exists() and destination.stat().st_size > 4000 and not force:
        return destination
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    source = OUTPUT_DIR / f"{animal_id}-freesound-source.mp3"
    for attempt in range(1, 5):
        response = SESSION.get(result["mp3"], timeout=60)
        if response.ok:
            break
        wait = int(response.headers.get("Retry-After", attempt * 2))
        print(f"Sound retry in {wait}s for {animal_id}...", flush=True)
        time.sleep(wait)
    else:
        raise RuntimeError(f"Could not download sound for {animal_id}")

    source.write_bytes(response.content)
    subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(source),
            "-t",
            "7",
            "-af",
            "afade=t=in:st=0:d=0.06,afade=t=out:st=6.1:d=0.9",
            "-ar",
            "44100",
            "-b:a",
            "112k",
            str(destination),
        ],
        check=True,
    )
    source.unlink(missing_ok=True)
    return destination


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--refresh",
        default="",
        help="Comma-separated animal IDs to download again",
    )
    args = parser.parse_args()
    refresh = {item.strip() for item in args.refresh.split(",") if item.strip()}
    animals = json.loads(DATA_PATH.read_text(encoding="utf-8"))["ANIMALS"]
    manifest = (
        json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        if MANIFEST_PATH.exists()
        else {}
    )
    failures = []

    for index, animal in enumerate(animals, start=1):
        animal_id = animal["id"]
        if animal_id in UNAVAILABLE_ANIMALS:
            manifest.pop(animal_id, None)
            continue
        existing = manifest.get(animal_id, {})
        preferred = PREFERRED_TITLES.get(animal_id, "").lower()
        existing_matches = not preferred or preferred in existing.get("title", "").lower()
        existing_file = ROOT / existing.get("file", "")
        expected_file = OUTPUT_DIR / (
            f"{animal_id}-{slugify(existing.get('title', ''))}-freesound.mp3"
        )
        if existing_file.exists() and existing_matches and animal_id not in refresh:
            if existing_file.resolve() != expected_file.resolve():
                existing_file.replace(expected_file)
                existing["file"] = f"assets/animal-sounds/{expected_file.name}"
                manifest[animal_id] = existing
                MANIFEST_PATH.write_text(
                    json.dumps(manifest, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )
            continue
        query = SEARCH_TERMS.get(animal_id, f"{animal['en']} animal sound")
        try:
            results = parse_results(fetch_search(query))
            result = choose_result(results, animal_id)
            if not result and "animal" not in query:
                results = parse_results(fetch_search(f"{query} animal"))
                result = choose_result(results, animal_id)
            if not result:
                failures.append((animal_id, "No suitable CC0 result"))
                print(f"FAILED {animal_id}: no suitable CC0 result", flush=True)
                continue
            destination = download_clip(animal_id, result, animal_id in refresh)
            manifest[animal_id] = {
                "status": "ready",
                "file": f"assets/animal-sounds/{destination.name}",
                **result,
                "artist": result["username"],
                "license": "CC0 1.0",
                "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
                "query": query,
            }
            MANIFEST_PATH.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            print(
                f"[{index}/{len(animals)}] {animal_id}: "
                f"{result['title']} ({result['duration']:.1f}s)",
                flush=True,
            )
        except Exception as error:
            failures.append((animal_id, str(error)))
            print(f"FAILED {animal_id}: {error}", flush=True)
        time.sleep(0.7)

    MANIFEST_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Freesound manifest ready: {len(manifest)} entries.")
    for failure in failures:
        print("FAILED", *failure)


if __name__ == "__main__":
    main()
