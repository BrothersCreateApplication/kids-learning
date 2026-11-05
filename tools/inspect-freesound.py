import argparse
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from importlib import import_module

feed = import_module("fetch-freesound")

sys.stdout.reconfigure(encoding="utf-8")

parser = argparse.ArgumentParser()
parser.add_argument("queries", nargs="+")
args = parser.parse_args()

for query in args.queries:
    print(f"\n### {query}")
    results = feed.parse_results(feed.fetch_search(query))
    for result in results[:10]:
        print(f"{result['duration']:5.1f}s | {result['id']} | {result['title']}")
    time.sleep(1)
