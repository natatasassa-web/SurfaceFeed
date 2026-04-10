#!/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3
"""
SurfaceFeed — fetch.py
Browses the hot/top feed of all tracked subreddits and saves raw posts to latest_fetch.json.

Usage:
    python3 fetch.py                    # hot feed, 15 posts per sub
    python3 fetch.py --count 20         # 20 posts per sub
    python3 fetch.py --sort top --time day   # top posts from last 24h
"""

import argparse
import json
import sys
import time
import urllib.request
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path


SUBREDDITS = [
    "unusual_whales",
    "quiverquantitative",
    "wallstreetbets",
    "law",
    "underreportednews",
    "suppressed_news",
    "prepperintel",
    "outoftheloop",
    "redscarepod",
    "fauxmoi",
    "whitepeopletwitter",
    "therewasanattempt",
    "sipstea",
]

HEADERS = {"User-Agent": "SurfaceFeed/1.0 (personal research tool)"}

OUTPUT_FILE = Path(__file__).parent / "latest_fetch.json"


def fetch_json(url: str, retries: int = 3) -> dict | None:
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=12) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                print(f"  ✗ Failed ({url[:60]}): {e}", file=sys.stderr)
    return None


def browse_subreddit(sub: str, count: int, sort: str, time_filter: str) -> list[dict]:
    params = {"limit": min(count * 2, 100)}
    if sort == "top":
        params["t"] = time_filter

    url = f"https://www.reddit.com/r/{sub}/{sort}.json?" + urllib.parse.urlencode(params)
    data = fetch_json(url)
    if not data:
        return []

    posts = []
    for child in data.get("data", {}).get("children", []):
        p = child.get("data", {})

        if p.get("stickied"):
            continue
        if p.get("removed_by_category") or p.get("selftext") == "[removed]":
            continue

        created_ts = p.get("created_utc")
        created_date = (
            datetime.fromtimestamp(created_ts, tz=timezone.utc).strftime("%Y-%m-%d %H:%M")
            if created_ts else None
        )

        post_url = p.get("url", "")
        permalink = "https://www.reddit.com" + p.get("permalink", "")

        posts.append({
            "subreddit": sub,
            "title": p.get("title", ""),
            "author": p.get("author", ""),
            "score": p.get("score", 0),
            "num_comments": p.get("num_comments", 0),
            "created_date": created_date,
            "selftext": (p.get("selftext") or "")[:800],
            "url": permalink,
            "external_url": post_url if not post_url.startswith("https://www.reddit.com") else None,
            "flair": p.get("link_flair_text"),
            "post_id": p.get("id"),
        })

        if len(posts) >= count:
            break

    return posts


def main():
    parser = argparse.ArgumentParser(description="Fetch Reddit posts for SurfaceFeed.")
    parser.add_argument("--count", type=int, default=15, help="Posts per subreddit (default: 15)")
    parser.add_argument("--sort", choices=["hot", "top", "new"], default="hot")
    parser.add_argument("--time", dest="time_filter",
                        choices=["hour", "day", "week", "month", "year"], default="day")
    args = parser.parse_args()

    print(f"\n🔍 SurfaceFeed fetch | sort: {args.sort} | time: {args.time_filter} | per sub: {args.count}")
    print(f"   Subreddits: {len(SUBREDDITS)}\n")

    all_posts = []
    for sub in SUBREDDITS:
        posts = browse_subreddit(sub, args.count, args.sort, args.time_filter)
        print(f"  r/{sub:<22} → {len(posts)} posts")
        all_posts.extend(posts)
        time.sleep(0.6)  # polite pacing

    output = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "sort": args.sort,
        "time_filter": args.time_filter,
        "subreddits": SUBREDDITS,
        "total_posts": len(all_posts),
        "posts": all_posts,
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2))
    print(f"\n✓ {len(all_posts)} posts saved to {OUTPUT_FILE.name}")


if __name__ == "__main__":
    main()
