# SurfaceFeed

Cross-community Reddit signal tracker. Monitors a curated set of subreddits,
uses Claude to filter noise and surface emerging theories, predictions, and narratives.
The key insight: if multiple unrelated communities are independently converging on
the same thing, that's signal.

---

## Python
Always use: `/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3`

---

## Project Structure

| File | Purpose |
|---|---|
| `fetch.py` | Pulls posts from all subreddits via Reddit hot/top JSON |
| `analyze.py` | Claude analysis layer — clusters, scores, surfaces signal |
| `history.json` | Rolling log of past runs for momentum tracking |
| `output/` | Generated digests (markdown + web) |
| `CLAUDE.md` | This file |

---

## Subreddit Sources

| Subreddit | Signal type |
|---|---|
| r/unusual_whales | Market anomalies, financial patterns |
| r/quiverquantitative | Congressional trades, institutional moves |
| r/wallstreetbets | Retail sentiment, momentum plays |
| r/law | Legal/constitutional developments |
| r/underreportednews | Stories getting buried |
| r/suppressed_news | Fringe but sometimes early |
| r/prepperintel | Infrastructure, supply chain signals |
| r/outoftheloop | What's suddenly everywhere |
| r/redscarepod | Cultural/political vibe commentary |
| r/fauxmoi | Celebrity + politics crossover |
| r/whitepeopletwitter | Mainstream cultural mood |
| r/therewasanattempt | Power failing in real time |
| r/sipstea | Drama with receipts |

---

## Stack
- Next.js + Vercel for the web dashboard
- Python for fetch + Claude analysis
- Obsidian Pulse notes as a secondary output (optional)
- `history.json` for momentum tracking (compare today vs yesterday)

---

## Run Commands

```bash
# Full run: fetch + analyze + output
/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3 fetch.py
/Users/hinatasa/.pyenv/versions/3.11.9/bin/python3 analyze.py

# Manual trigger any time
# Scheduled: daily
```

---

## What Claude Does (Analysis Layer)

1. **Cluster** — group posts by theme across subreddits
2. **Score** — upvotes + comment velocity + cross-community overlap
3. **Flag momentum** — compare against history.json to detect emerging vs fading
4. **Verdict per theory** — "emerging / holding / fading / isolated spike"
5. **Output** — clean digest with top theories, evidence threads, momentum arrows
