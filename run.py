#!/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3
"""
SurfaceFeed — run.py
One-command pipeline: fetch → analyze → git push → Vercel deploys automatically.

Usage:
    python3 run.py                  # full run
    python3 run.py --no-push        # run locally, don't push to git
    python3 run.py --sort top       # use top posts instead of hot
    python3 run.py --count 20       # 20 posts per subreddit
"""

import argparse
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

PYTHON = "/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3"
ROOT   = Path(__file__).parent


def run(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=check, cwd=ROOT)


def step(label: str):
    print(f"\n{'─'*50}")
    print(f"  {label}")
    print(f"{'─'*50}\n")


def main():
    parser = argparse.ArgumentParser(description="Run the full SurfaceFeed pipeline.")
    parser.add_argument("--no-push",  action="store_true", help="Skip git push (local only)")
    parser.add_argument("--sort",     choices=["hot", "top", "new"], default="hot")
    parser.add_argument("--time",     dest="time_filter",
                        choices=["hour", "day", "week", "month"], default="day")
    parser.add_argument("--count",    type=int, default=15, help="Posts per subreddit")
    parser.add_argument("--no-history", action="store_true", help="Skip momentum tracking")
    args = parser.parse_args()

    start = datetime.now(timezone.utc)
    print(f"\n🚀 SurfaceFeed run started at {start.strftime('%H:%M UTC')}")

    # 1. Fetch
    step("Step 1/3 — Fetching Reddit posts")
    fetch_cmd = [PYTHON, "fetch.py", "--sort", args.sort, "--time", args.time_filter, "--count", str(args.count)]
    run(fetch_cmd)

    # 2. Analyze
    step("Step 2/3 — Claude analysis")
    analyze_cmd = [PYTHON, "analyze.py"]
    if args.no_history:
        analyze_cmd.append("--no-history")
    run(analyze_cmd)

    # 3. Push
    if args.no_push:
        step("Step 3/3 — Skipping push (--no-push)")
        print("  Output is in web/public/data/latest.json")
        print("  Open web/ locally to preview: cd web && npm run dev")
    else:
        step("Step 3/3 — Pushing to GitHub → Vercel deploys")
        date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
        run(["git", "add", "web/public/data/latest.json", "web/public/data/", "history.json"])
        result = run(["git", "commit", "-m", f"digest: {date_str}"], check=False)
        if result.returncode == 0:
            run(["git", "push"])
            print("\n  ✓ Pushed — Vercel will deploy in ~30 seconds")
        else:
            print("\n  ℹ  Nothing new to commit (data unchanged)")

    elapsed = (datetime.now(timezone.utc) - start).seconds
    print(f"\n✓ Done in {elapsed}s\n")


if __name__ == "__main__":
    main()
