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
OUTPUT_DIR = ROOT / "assets" / "vehicle-photos"
MANIFEST_PATH = ROOT / "tools" / "vehicle-photo-manifest.json"
SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "BeHocVui/1.0 (local educational website; contact: local-user)",
        "Accept": "application/json",
    }
)

PAGE_TITLES = {
    "car": "Automobile",
    "bicycle": "Bicycle",
    "motorcycle": "Motorcycle",
    "bus": "Bus",
    "truck": "Truck",
    "train": "Train",
    "airplane": "Airplane",
    "helicopter": "Helicopter",
    "boat": "Boat",
    "ship": "Ship",
    "sailboat": "Yacht",
    "ambulance": "Ambulance",
    "fire-engine": "Fire engine",
    "police-car": "Police car",
    "taxi": "Yellow cab",
    "school-bus": "School bus",
    "tractor": "Tractor",
    "excavator": "Excavator",
    "rocket": "Rocket",
    "submarine": "Submarine",
    "tram": "Tram",
    "crane": "Gantry crane",
    "hot-air-balloon": "Hot air balloon",
    "road-roller": "Road roller",
    "dump-truck": "Dump truck",
}

PAGE_FILE_TITLES = {
    "container-truck": "Iraqi container truck, 2011.jpg",
}


def chunks(values, size):
    for index in range(0, len(values), size):
        yield values[index : index + size]


def api_get(base_url, params):
    for attempt in range(1, 5):
        response = SESSION.get(base_url, params=params, timeout=45)
        if response.ok:
            return response.json()
        if attempt == 4:
            response.raise_for_status()
        time.sleep(attempt * 2)


def plain_text(value):
    if not value:
        return ""
    return html.unescape(re.sub(r"<[^>]+>", "", value)).strip()


def normalized(name):
    return name.replace("_", " ")


def main():
    vehicles = json.loads(DATA_PATH.read_text(encoding="utf-8"))["VEHICLES"]
    titles = list(
        dict.fromkeys(
            PAGE_TITLES[vehicle["id"]]
            for vehicle in vehicles
            if vehicle["id"] in PAGE_TITLES
        )
    )
    aliases = {}
    pages = {}
    for title_batch in chunks(titles, 40):
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
        for normalized_title in data["query"].get("normalized", []):
            aliases[normalized_title["from"]] = normalized_title["to"]
        for redirect in data["query"].get("redirects", []):
            aliases[redirect["from"]] = redirect["to"]
        for page in data["query"]["pages"]:
            pages[page["title"]] = page

    file_names = list(
        dict.fromkeys(
            [
                *(
                    page["pageimage"]
                    for page in pages.values()
                    if isinstance(page, dict) and page.get("pageimage")
                ),
                *PAGE_FILE_TITLES.values(),
            ]
        )
    )
    file_metadata = {}
    for file_batch in chunks(file_names, 30):
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
            name = normalized(page["title"].removeprefix("File:"))
            info = page["imageinfo"][0]
            metadata = info.get("extmetadata", {})
            file_metadata[name] = {
                "source": info.get("descriptionurl"),
                "image_url": info.get("thumburl") or info.get("url"),
                "artist": plain_text(metadata.get("Artist", {}).get("value")),
                "license": plain_text(metadata.get("LicenseShortName", {}).get("value")),
                "license_url": metadata.get("LicenseUrl", {}).get("value", ""),
            }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {}
    failures = []
    for vehicle in vehicles:
        title = PAGE_TITLES.get(vehicle["id"], vehicle["en"].title())
        file_name = PAGE_FILE_TITLES.get(vehicle["id"])
        if not file_name:
            resolved_title = aliases.get(title, title)
            page = pages.get(resolved_title)
            if not page or not page.get("pageimage"):
                failures.append((vehicle["id"], title, "No page image"))
                continue
            file_name = page["pageimage"]
        metadata = file_metadata.get(normalized(file_name))
        if not metadata or not metadata.get("image_url"):
            failures.append((vehicle["id"], title, f"No metadata for {file_name}"))
            continue

        response = SESSION.get(metadata["image_url"], timeout=60)
        response.raise_for_status()
        image = ImageOps.exif_transpose(
            Image.open(io.BytesIO(response.content)).convert("RGB")
        )
        image = ImageOps.fit(
            image,
            (640, 440),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        destination = OUTPUT_DIR / f"{vehicle['id']}.webp"
        image.save(destination, "WEBP", quality=84, method=6)
        manifest[vehicle["id"]] = {
            "file": f"assets/vehicle-photos/{destination.name}",
            "title": title,
            **metadata,
        }
        time.sleep(0.4)

    MANIFEST_PATH.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Vehicle photos ready: {len(manifest)}. Failures: {len(failures)}.")
    for failure in failures:
        print("FAILED", *failure)


if __name__ == "__main__":
    main()
