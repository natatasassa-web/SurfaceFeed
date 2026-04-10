#!/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3
"""
SurfaceFeed — analyze.py
Sends fetched Reddit posts to Claude for signal analysis.
Clusters themes, scores cross-community overlap, tracks momentum over time.

Usage:
    python3 analyze.py                  # analyze latest_fetch.json
    python3 analyze.py --fetch          # run fetch first, then analyze
    python3 analyze.py --no-history     # skip momentum comparison
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


FETCH_FILE   = Path(__file__).parent / "latest_fetch.json"
HISTORY_FILE = Path(__file__).parent / "history.json"
OUTPUT_DIR   = Path(__file__).parent / "web" / "public" / "data"
PYTHON       = "/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3"


ANALYSIS_PROMPT = """You are analyzing Reddit posts from a curated cross-community signal feed.
Your job: surface emerging theories, predictions, and narratives — especially ones gaining traction
across MULTIPLE unrelated communities, which is the strongest signal.

SUBREDDITS IN THIS FEED (and what they represent):
- unusual_whales, quiverquantitative, wallstreetbets → market / financial patterns
- law → legal / constitutional developments
- underreportednews, suppressed_news, prepperintel → things getting buried or early warnings
- outoftheloop → what's suddenly everywhere that people are confused about
- redscarepod → cultural / political vibe commentary (often ahead of mainstream)
- fauxmoi → celebrity + politics crossover, soft power signals
- whitepeopletwitter → mainstream cultural mood, what normies are noticing
- therewasanattempt → power failing in real time, institutions cracking
- sipstea → drama with receipts, interpersonal dynamics at scale

YESTERDAY'S THEORIES (for momentum tracking):
{yesterday_theories}

TODAY'S POSTS:
{posts}

---

TASK: Identify 6-10 distinct theories, narratives, or emerging patterns in these posts.

For EACH theory return:
- title: punchy name, 6 words max (not clickbait, just clear)
- summary: 2-3 sentences. What are people actually saying? What's the claim or pattern?
- subreddits: which communities touched this theme (list the subreddit names)
- cross_community_score: integer 1-5 (how many distinct community types touched it — financial + legal + cultural = strong signal)
- engagement_score: integer 1-5 (based on upvotes and comment counts of relevant posts)
- total_score: cross_community_score + engagement_score (out of 10)
- momentum: one of "emerging" | "holding" | "surging" | "fading" | "isolated"
  - emerging: new today, not in yesterday's list
  - holding: was present yesterday, still active today at similar level
  - surging: was in yesterday's list, noticeably bigger/more spread today
  - fading: was in yesterday's list, clearly weaker today
  - isolated: only one subreddit talking about it
- why_signal: one sentence — why might this be real, early, or worth watching?
- posts: array of 2-3 best representative posts, each with: title, url, subreddit, score

Sort theories by total_score descending.

Return ONLY valid JSON with this exact structure:
{
  "date": "YYYY-MM-DD",
  "run_timestamp": "ISO timestamp",
  "total_posts_analyzed": N,
  "subreddits_active": N,
  "theories": [
    {
      "title": "...",
      "summary": "...",
      "subreddits": ["...", "..."],
      "cross_community_score": N,
      "engagement_score": N,
      "total_score": N,
      "momentum": "...",
      "why_signal": "...",
      "posts": [
        {"title": "...", "url": "...", "subreddit": "...", "score": N}
      ]
    }
  ]
}"""


def load_history() -> dict:
    if HISTORY_FILE.exists():
        return json.loads(HISTORY_FILE.read_text())
    return {"runs": []}


def save_history(history: dict, today_result: dict):
    """Append today's theory titles + scores to history."""
    entry = {
        "date": today_result["date"],
        "theories": [t["title"] for t in today_result["theories"]],
        "scores": {t["title"]: t["total_score"] for t in today_result["theories"]},
    }
    # Keep last 14 days
    history["runs"] = (history.get("runs", []) + [entry])[-14:]
    HISTORY_FILE.write_text(json.dumps(history, indent=2))


def get_yesterday_summary(history: dict) -> str:
    runs = history.get("runs", [])
    if not runs:
        return "None — this is the first run."
    last = runs[-1]
    lines = [f"Date: {last['date']}"]
    for title in last["theories"]:
        score = last["scores"].get(title, "?")
        lines.append(f"  - {title} (score: {score})")
    return "\n".join(lines)


def build_posts_summary(posts: list[dict]) -> str:
    """Condense posts for the prompt — include enough signal without overloading context."""
    lines = []
    for p in posts:
        text = p.get("selftext", "").strip()
        snippet = f' | body: "{text[:200]}"' if text and text not in ("[deleted]", "[removed]") else ""
        flair = f" [{p['flair']}]" if p.get("flair") else ""
        lines.append(
            f"r/{p['subreddit']}{flair} | ↑{p['score']} | 💬{p['num_comments']} "
            f"| {p['title']}{snippet} | {p['url']}"
        )
    return "\n".join(lines)


def run_claude_analysis(prompt: str) -> dict:
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("✗ ANTHROPIC_API_KEY not set. Export it in your shell:\n  export ANTHROPIC_API_KEY=sk-...", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    print("  Sending to Claude for analysis...", file=sys.stderr)
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()

    # Strip markdown code fences if present
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1]
        if raw.endswith("```"):
            raw = raw.rsplit("```", 1)[0]

    return json.loads(raw)


def main():
    parser = argparse.ArgumentParser(description="Analyze Reddit posts with Claude.")
    parser.add_argument("--fetch", action="store_true", help="Run fetch.py first")
    parser.add_argument("--no-history", action="store_true", help="Skip momentum comparison")
    args = parser.parse_args()

    # Optionally run fetch first
    if args.fetch:
        print("\n📡 Fetching Reddit posts first...\n")
        result = subprocess.run([PYTHON, str(Path(__file__).parent / "fetch.py")], check=True)
        print()

    # Load fetch data
    if not FETCH_FILE.exists():
        print("✗ No latest_fetch.json found. Run fetch.py first or use --fetch.", file=sys.stderr)
        sys.exit(1)

    fetch_data = json.loads(FETCH_FILE.read_text())
    posts = fetch_data["posts"]
    print(f"\n🧠 Analyzing {len(posts)} posts from {len(fetch_data['subreddits'])} subreddits...")

    # Load history
    history = {} if args.no_history else load_history()
    yesterday_summary = "None — this is the first run." if args.no_history else get_yesterday_summary(history)

    # Build prompt
    prompt = ANALYSIS_PROMPT.format(
        yesterday_theories=yesterday_summary,
        posts=build_posts_summary(posts),
    )

    # Run analysis
    result = run_claude_analysis(prompt)

    # Fill in metadata if Claude didn't
    result.setdefault("date", datetime.now(timezone.utc).strftime("%Y-%m-%d"))
    result.setdefault("run_timestamp", datetime.now(timezone.utc).isoformat())
    result.setdefault("total_posts_analyzed", len(posts))
    result.setdefault("subreddits_active", len(fetch_data["subreddits"]))

    # Save output
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    latest_path = OUTPUT_DIR / "latest.json"
    dated_path  = OUTPUT_DIR / f"digest_{result['date']}.json"

    latest_path.write_text(json.dumps(result, indent=2))
    dated_path.write_text(json.dumps(result, indent=2))

    # Update history
    if not args.no_history:
        save_history(history, result)

    # Print summary
    print(f"\n✓ Analysis complete — {len(result['theories'])} theories surfaced\n")
    print(f"{'#':<3} {'Title':<35} {'Score':<7} {'Momentum':<12} {'Communities'}")
    print("-" * 85)
    for i, t in enumerate(result["theories"], 1):
        subs = ", ".join(t["subreddits"][:3])
        if len(t["subreddits"]) > 3:
            subs += f" +{len(t['subreddits'])-3}"
        momentum_icon = {
            "emerging": "🟢 emerging",
            "surging":  "⚡ surging",
            "holding":  "🟡 holding",
            "fading":   "🔴 fading",
            "isolated": "⚪ isolated",
        }.get(t["momentum"], t["momentum"])
        print(f"{i:<3} {t['title']:<35} {t['total_score']:<7} {momentum_icon:<20} {subs}")

    print(f"\n  Output: {latest_path}")
    print(f"  Output: {dated_path}\n")


if __name__ == "__main__":
    main()
