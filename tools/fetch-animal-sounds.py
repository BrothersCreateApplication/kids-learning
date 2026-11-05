import html
import json
import re
import subprocess
import time
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "tools" / "lesson-data.json"
OUTPUT_DIR = ROOT / "assets" / "animal-sounds"
MANIFEST_PATH = ROOT / "tools" / "animal-sound-manifest.json"
SESSION = requests.Session()
SESSION.headers.update(
    {
        "User-Agent": "BeHocVui/1.0 (local educational website; contact: local-user)",
        "Accept": "application/json",
    }
)

SEARCH_TERMS = {
    "dog": "dog barking",
    "cat": "cat meowing",
    "rabbit": "rabbit thumping",
    "hamster": "hamster squeaking",
    "mouse": "mouse squeaking",
    "parrot": "parrot squawking",
    "cow": "cow mooing",
    "pig": "pig grunting",
    "sheep": "sheep bleating",
    "goat": "goat bleating",
    "horse": "horse neighing",
    "donkey": "donkey braying",
    "llama": "llama humming",
    "chicken": "chicken clucking",
    "rooster": "rooster crowing",
    "duck": "duck quacking",
    "goose": "goose honking",
    "lion": "lion roaring",
    "tiger": "tiger growling",
    "elephant": "elephant trumpet",
    "zebra": "zebra braying",
    "monkey": "monkey vocalization",
    "gorilla": "gorilla grunting",
    "fox": "red fox call",
    "wolf": "wolf howling",
    "bear": "brown bear growling",
    "polar-bear": "polar bear growl",
    "panda": "giant panda bleat",
    "koala": "koala bellow",
    "kangaroo": "kangaroo sound",
    "deer": "deer call",
    "moose": "moose call",
    "hippo": "hippopotamus sound",
    "rhino": "rhinoceros sound",
    "leopard": "leopard growl",
    "camel": "camel grunting",
    "badger": "badger vocalization",
    "otter": "otter squeaking",
    "beaver": "beaver sound",
    "hedgehog": "hedgehog snuffling",
    "bat": "bat echolocation",
    "squirrel": "squirrel chatter",
    "skunk": "skunk hissing",
    "raccoon": "raccoon vocalization",
    "bison": "bison bellow",
    "snake": "snake hissing",
    "lizard": "lizard hissing",
    "frog": "frog croaking",
    "eagle": "bald eagle call",
    "owl": "owl hooting",
    "peacock": "peacock call",
    "flamingo": "flamingo honking",
    "penguin": "penguin call",
    "swan": "swan honking",
    "dove": "dove cooing",
    "turkey": "turkey gobbling",
    "bird": "bird chirping",
    "whale": "whale song",
    "dolphin": "dolphin clicks",
    "crab": "crab clicking",
    "lobster": "lobster sound",
    "seal": "seal barking",
    "crocodile": "crocodile hissing",
    "bee": "bee buzzing",
    "cricket": "cricket chirping",
    "fly": "housefly buzzing",
    "mosquito": "mosquito buzzing",
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
    "t-rex",
    "brachiosaurus",
    "dodo",
}

GOOD_SOUND_WORDS = (
    "bark",
    "bray",
    "buzz",
    "call",
    "chirp",
    "click",
    "coo",
    "croak",
    "crow",
    "gobble",
    "grunt",
    "hiss",
    "honk",
    "hoot",
    "howl",
    "hum",
    "meow",
    "moo",
    "neigh",
    "quack",
    "roar",
    "scream",
    "sing",
    "song",
    "sound",
    "squeak",
    "trumpet",
    "vocal",
)
BAD_SOUND_WORDS = (
    "anthem",
    "dictionary",
    "en-au-",
    "fr-paris",
    "human",
    "imitation",
    "ll-q1860",
    "man ",
    "music",
    "national",
    "orchestra",
    "pronunciation",
    "speech",
    "spoken",
    "techno",
    "theme",
    "word",
)
AUDIO_EXTENSIONS = (".ogg", ".oga", ".wav", ".mp3", ".flac")

SOUND_FILE_OVERRIDES = {
    "cow": "Single Cow Moo.ogg",
    "goat": "Herd of goats bleating.ogg",
    "horse": "Wiehern.ogg",
    "donkey": "157763 felix-blume a-donkey-is-braying-in-his-enclosure-in-south-of-france.wav",
}


class RateLimitedError(RuntimeError):
    pass


def slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")[:72]


def api_get(params):
    for attempt in range(1, 6):
        response = SESSION.get(
            "https://commons.wikimedia.org/w/api.php",
            params=params,
            timeout=45,
        )
        if response.ok:
            return response.json()
        if response.status_code == 429 or response.status_code >= 500:
            wait = int(response.headers.get("Retry-After", attempt * 3))
            print(f"API retry in {wait}s after HTTP {response.status_code}...", flush=True)
            time.sleep(wait)
            continue
        response.raise_for_status()
    raise RuntimeError("Wikimedia API request failed after retries")


def plain_text(value):
    if not value:
        return ""
    return html.unescape(re.sub(r"<[^>]+>", "", value)).strip()


def candidate_score(title):
    lower = title.lower()
    score = 0
    if any(word in lower for word in GOOD_SOUND_WORDS):
        score += 8
    if any(word in lower for word in BAD_SOUND_WORDS):
        score -= 20
    if len(lower) < 90:
        score += 2
    return score


def find_sound(animal):
    if animal["id"] in QUIET_ANIMALS:
        return None
    override = SOUND_FILE_OVERRIDES.get(animal["id"])
    if override:
        data = api_get(
            {
                "action": "query",
                "titles": f"File:{override}",
                "prop": "imageinfo",
                "iiprop": "url|mime|size|extmetadata",
                "format": "json",
                "formatversion": 2,
            }
        )
        pages = data.get("query", {}).get("pages", [])
        if not pages or not pages[0].get("imageinfo"):
            return None
        page = pages[0]
        info = page["imageinfo"][0]
        metadata = info.get("extmetadata", {})
        return {
            "title": override,
            "url": info.get("url", ""),
            "mime": info.get("mime", ""),
            "size": info.get("size", 0),
            "score": 99,
            "source": info.get("descriptionurl"),
            "artist": plain_text(metadata.get("Artist", {}).get("value")),
            "license": plain_text(metadata.get("LicenseShortName", {}).get("value")),
            "license_url": metadata.get("LicenseUrl", {}).get("value", ""),
            "query": override,
        }
    query = SEARCH_TERMS.get(animal["id"], f"{animal['en']} sound")
    data = api_get(
        {
            "action": "query",
            "generator": "search",
            "gsrsearch": f"{query} filetype:audio",
            "gsrnamespace": 6,
            "gsrlimit": 10,
            "prop": "imageinfo",
            "iiprop": "url|mime|size|extmetadata",
            "format": "json",
            "formatversion": 2,
        }
    )
    pages = data.get("query", {}).get("pages", [])
    candidates = []
    for page in pages:
        info = (page.get("imageinfo") or [None])[0]
        if not info:
            continue
        url = info.get("url", "")
        if not url.lower().split("?")[0].endswith(AUDIO_EXTENSIONS):
            continue
        title = page["title"].removeprefix("File:")
        score = candidate_score(title)
        metadata = info.get("extmetadata", {})
        candidates.append(
            {
                "title": title,
                "url": url,
                "mime": info.get("mime", ""),
                "size": info.get("size", 0),
                "score": score,
                "source": info.get("descriptionurl"),
                "artist": plain_text(metadata.get("Artist", {}).get("value")),
                "license": plain_text(metadata.get("LicenseShortName", {}).get("value")),
                "license_url": metadata.get("LicenseUrl", {}).get("value", ""),
                "query": query,
            }
        )
    candidates.sort(key=lambda item: (-item["score"], item["size"]))
    return candidates[0] if candidates else None


def download_audio(candidate, animal_id):
    destination = OUTPUT_DIR / f"{animal_id}-{slugify(candidate['title'])}.mp3"
    if destination.exists() and destination.stat().st_size > 5000:
        return destination
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    source = OUTPUT_DIR / f"{animal_id}-source"
    for attempt in range(1, 5):
        response = SESSION.get(candidate["url"], timeout=90)
        if response.ok:
            break
        wait = int(response.headers.get("Retry-After", attempt * 3))
        if wait > 60:
            raise RateLimitedError(
                f"Wikimedia media host requested a {wait}s cooldown"
            )
        print(f"Audio retry in {wait}s after HTTP {response.status_code}...", flush=True)
        time.sleep(wait)
    else:
        raise RuntimeError(f"Could not download sound for {animal_id}")
    source.write_bytes(response.content)
    command = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        str(source),
        "-t",
        "8",
        "-af",
        "silenceremove=start_periods=1:start_silence=0.15:start_threshold=-42dB,"
        "afade=t=in:st=0:d=0.08,afade=t=out:st=7:d=1",
        "-ar",
        "44100",
        "-b:a",
        "112k",
        str(destination),
    ]
    subprocess.run(command, check=True)
    source.unlink(missing_ok=True)
    return destination


def main():
    animals = json.loads(DATA_PATH.read_text(encoding="utf-8"))["ANIMALS"]
    manifest = (
        json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        if MANIFEST_PATH.exists()
        else {}
    )
    failures = []

    for index, animal in enumerate(animals, start=1):
        animal_id = animal["id"]
        override = SOUND_FILE_OVERRIDES.get(animal_id)
        override_is_current = (
            not override
            or (manifest.get(animal_id, {}).get("title") == override)
        )
        if animal_id in manifest and (
            manifest[animal_id].get("status") == "quiet"
            or (ROOT / manifest[animal_id].get("file", "")).exists()
        ) and override_is_current:
            continue
        if animal_id in QUIET_ANIMALS:
            manifest[animal_id] = {
                "status": "quiet",
                "note_vi": "Con vật này thường không phát ra tiếng kêu.",
                "note_en": "This animal does not usually make a sound.",
            }
            MANIFEST_PATH.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            continue
        try:
            candidate = find_sound(animal)
            if not candidate:
                failures.append((animal_id, "No suitable audio result"))
                continue
            destination = download_audio(candidate, animal_id)
            manifest[animal_id] = {
                "status": "ready",
                "file": f"assets/animal-sounds/{destination.name}",
                **candidate,
            }
            MANIFEST_PATH.write_text(
                json.dumps(manifest, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            print(
                f"[{index}/{len(animals)}] {animal_id}: {candidate['title']}",
                flush=True,
            )
        except RateLimitedError as error:
            failures.append((animal_id, str(error)))
            print(f"PAUSED {animal_id}: {error}", flush=True)
            break
        except Exception as error:
            failures.append((animal_id, str(error)))
            print(f"FAILED {animal_id}: {error}", flush=True)
        time.sleep(0.85)

    print(f"Animal sound manifest ready: {len(manifest)} entries.")
    for failure in failures:
        print("FAILED", *failure)


if __name__ == "__main__":
    main()
