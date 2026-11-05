import html
import io
import json
import re
import time
from pathlib import Path

import requests
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "tools" / "lesson-data.json"
OUTPUT_DIR = ROOT / "assets" / "animal-photos"
MANIFEST_PATH = ROOT / "tools" / "animal-photo-manifest.json"
SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "BeHocVui/1.0 (local educational website; contact: local-user)",
        "Accept": "application/json",
    }
)

PAGE_TITLES = {
    "dog": "Golden Retriever",
    "cat": "Maine Coon",
    "rabbit": "Rabbit",
    "hamster": "Golden hamster",
    "mouse": "House mouse",
    "turtle": "Red-eared slider",
    "parrot": "Parrot",
    "goldfish": "Goldfish",
    "cow": "Cattle",
    "pig": "Pig",
    "sheep": "Sheep",
    "goat": "Goat",
    "horse": "Horse",
    "donkey": "Donkey",
    "llama": "Llama",
    "chicken": "Chicken",
    "rooster": "Red junglefowl",
    "duck": "Duck",
    "goose": "Goose",
    "lion": "Lion",
    "tiger": "Tiger",
    "elephant": "Elephant",
    "giraffe": "Giraffe",
    "zebra": "Zebra",
    "monkey": "Monkey",
    "gorilla": "Gorilla",
    "fox": "Red fox",
    "wolf": "Wolf",
    "bear": "Brown bear",
    "polar-bear": "Polar bear",
    "panda": "Giant panda",
    "koala": "Koala",
    "kangaroo": "Kangaroo",
    "deer": "White-tailed deer",
    "moose": "Moose",
    "hippo": "Hippopotamus",
    "rhino": "Rhinoceros",
    "leopard": "Leopard",
    "camel": "Camel",
    "sloth": "Sloth",
    "badger": "European badger",
    "otter": "Eurasian otter",
    "beaver": "North American beaver",
    "hedgehog": "Hedgehog",
    "bat": "Bat",
    "squirrel": "Eastern gray squirrel",
    "skunk": "Skunk",
    "raccoon": "Raccoon",
    "bison": "American bison",
    "mammoth": "Woolly mammoth",
    "snake": "Snake",
    "lizard": "Lizard",
    "frog": "Frog",
    "eagle": "Bald eagle",
    "owl": "Owl",
    "peacock": "Indian peafowl",
    "flamingo": "Flamingo",
    "penguin": "Penguin",
    "swan": "Swan",
    "dove": "Columbidae",
    "turkey": "Domestic turkey",
    "dodo": "Dodo",
    "bird": "Bird",
    "whale": "Whale",
    "dolphin": "Dolphin",
    "shark": "Shark",
    "octopus": "Octopus",
    "squid": "Squid",
    "shrimp": "Shrimp",
    "crab": "Crab",
    "lobster": "Lobster",
    "fish": "Fish",
    "tropical-fish": "Coral reef fish",
    "pufferfish": "Tetraodontidae",
    "seal": "Earless seal",
    "jellyfish": "Jellyfish",
    "oyster": "Oyster",
    "coral": "Coral",
    "crocodile": "Crocodile",
    "caterpillar": "Caterpillar",
    "butterfly": "Butterfly",
    "bee": "Bee",
    "ladybug": "Coccinellidae",
    "ant": "Ant",
    "spider": "Spider",
    "scorpion": "Scorpion",
    "snail": "Snail",
    "cricket": "Cricket (insect)",
    "beetle": "Japanese beetle",
    "fly": "Housefly",
    "mosquito": "Mosquito",
    "t-rex": "Tyrannosaurus",
    "brachiosaurus": "Brachiosaurus",
}

SPECIAL_FILES = {
    "mammoth": "202003 Woolly mammoth.png",
    "t-rex": "Tyrannosaurus Rex, Expo Dinosaurios 2023 - A740976.jpg",
    "brachiosaurus": "Brachiosaurus Animatronic model NHM2.jpg",
}


def chunks(values, size):
    for index in range(0, len(values), size):
        yield values[index : index + size]


def api_get(base_url, params):
    for attempt in range(1, 4):
        response = SESSION.get(base_url, params=params, timeout=45)
        if response.ok:
            return response.json()
        if attempt == 3:
            response.raise_for_status()
        time.sleep(attempt)


def plain_text(value):
    if not value:
        return ""
    return html.unescape(re.sub(r"<[^>]+>", "", value)).strip()


def normalize_file_name(name):
    return name.replace("_", " ")


def slugify(value):
    value = value.lower().replace(" ", "-")
    return re.sub(r"[^a-z0-9-]", "", value)


def main():
    animals = json.loads(DATA_PATH.read_text(encoding="utf-8"))["ANIMALS"]
    missing_titles = [animal["id"] for animal in animals if animal["id"] not in PAGE_TITLES]
    if missing_titles:
        raise RuntimeError(f"Missing Wikipedia page titles for: {missing_titles}")

    page_lookup = {}
    titles = list(dict.fromkeys(PAGE_TITLES.values()))
    for title_batch in chunks(titles, 45):
        data = api_get(
            "https://en.wikipedia.org/w/api.php",
            {
                "action": "query",
                "titles": "|".join(title_batch),
                "prop": "pageimages",
                "piprop": "thumbnail|name",
                "pithumbsize": 900,
                "redirects": 1,
                "format": "json",
                "formatversion": 2,
            },
        )
        for normalized in data["query"].get("normalized", []):
            if normalized["to"] in page_lookup:
                page_lookup[normalized["from"]] = page_lookup[normalized["to"]]
        for redirect in data["query"].get("redirects", []):
            if redirect["to"] in page_lookup:
                page_lookup[redirect["from"]] = page_lookup[redirect["to"]]
        for page in data["query"]["pages"]:
            page_lookup[page["title"]] = page

    resolved_titles = {}
    for page in page_lookup.values():
        resolved_titles[page["title"]] = page

    file_metadata = {}
    file_names = list(
        dict.fromkeys(
            [
                page["pageimage"]
                for page in resolved_titles.values()
                if page.get("pageimage")
            ]
            + list(SPECIAL_FILES.values())
        )
    )
    for file_batch in chunks(file_names, 35):
        data = api_get(
            "https://commons.wikimedia.org/w/api.php",
            {
                "action": "query",
                "titles": "|".join(f"File:{name}" for name in file_batch),
                "prop": "imageinfo",
                "iiprop": "url|extmetadata",
                "iiurlwidth": 900,
                "format": "json",
                "formatversion": 2,
            },
        )
        for page in data["query"]["pages"]:
            if "imageinfo" not in page:
                continue
            file_name = normalize_file_name(page["title"].removeprefix("File:"))
            info = page["imageinfo"][0]
            metadata = info.get("extmetadata", {})
            file_metadata[file_name] = {
                "source": info.get("descriptionurl"),
                "image_url": info.get("thumburl") or info.get("url"),
                "artist": plain_text(metadata.get("Artist", {}).get("value")),
                "license": plain_text(metadata.get("LicenseShortName", {}).get("value")),
                "license_url": metadata.get("LicenseUrl", {}).get("value", ""),
            }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = (
        json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        if MANIFEST_PATH.exists()
        else {}
    )
    failures = []
    for index, animal in enumerate(animals, start=1):
        title = PAGE_TITLES[animal["id"]]
        page = resolved_titles.get(title)
        if not page or not page.get("pageimage"):
            failures.append((animal["id"], title, "No page image"))
            continue

        file_name = SPECIAL_FILES.get(animal["id"], page["pageimage"])
        metadata = file_metadata.get(normalize_file_name(file_name))
        if not metadata or not metadata.get("image_url"):
            failures.append((animal["id"], title, f"No metadata for {file_name}"))
            continue

        previous = manifest.get(animal["id"])
        same_source = previous and (
            previous.get("source_file") == file_name
            or (not previous.get("source_file") and animal["id"] not in SPECIAL_FILES)
        )
        if (
            previous
            and previous.get("title") == title
            and same_source
            and (ROOT / previous.get("file", "")).exists()
        ):
            destination = ROOT / previous["file"]
        else:
            source_stem = Path(file_name).stem
            destination = OUTPUT_DIR / f"{animal['id']}-{slugify(source_stem)}.webp"
        needs_download = not destination.exists() or destination.stat().st_size < 5_000
        if needs_download:
            response = None
            for attempt in range(1, 6):
                response = SESSION.get(metadata["image_url"], timeout=60)
                if response.ok:
                    break
                wait = int(response.headers.get("Retry-After", attempt * 3))
                print(
                    f"Retrying {animal['id']} after HTTP {response.status_code} "
                    f"in {wait}s...",
                    flush=True,
                )
                time.sleep(wait)
            if response is None or not response.ok:
                failures.append((animal["id"], title, f"Photo HTTP {response.status_code}"))
                continue
            try:
                image = Image.open(io.BytesIO(response.content)).convert("RGB")
                image = ImageOps.exif_transpose(image)
                image = ImageOps.fit(
                    image,
                    (640, 480),
                    method=Image.Resampling.LANCZOS,
                    centering=(0.5, 0.45),
                )
                image.save(destination, "WEBP", quality=84, method=6)
            except Exception as error:
                failures.append((animal["id"], title, f"Image error: {error}"))
                continue
        manifest[animal["id"]] = {
            "file": f"assets/animal-photos/{destination.name}",
            "title": title,
            "source_file": file_name,
            **metadata,
        }
        MANIFEST_PATH.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        if index % 15 == 0:
            print(f"Downloaded {index}/{len(animals)} photos...", flush=True)
        if needs_download:
            time.sleep(0.55)

    MANIFEST_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Photos ready: {len(manifest)}. Failures: {len(failures)}.")
    for failure in failures:
        print("FAILED", *failure)


if __name__ == "__main__":
    main()
