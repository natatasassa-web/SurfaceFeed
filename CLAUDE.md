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
| `run.py` | One-command pipeline: fetch → analyze → git push → Vercel deploys |
| `history.json` | Rolling 14-day log for momentum tracking (auto-created) |
| `web/` | Next.js dashboard |
| `web/public/data/latest.json` | Generated digest (read by dashboard) |
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
- `history.json` for momentum tracking (compare today vs yesterday)

---

## Run Commands

```bash
# One command — fetch + analyze + push → Vercel auto-deploys dashboard
python3 run.py

# Local only (preview without pushing)
python3 run.py --no-push

# Top posts from last 24h instead of hot feed
python3 run.py --sort top --time day

# More posts per subreddit
python3 run.py --count 20
```

---

## Setup (one-time, already done except where noted)

1. **ANTHROPIC_API_KEY** — must be set in your shell before running:
   ```bash
   export ANTHROPIC_API_KEY=sk-ant-...
   ```
   Add to `~/.zshrc` to make permanent.

2. **Connect GitHub → Vercel** for auto-deploy on push:
   - Go to: https://vercel.com/natatasassa-webs-projects/web/settings/git
   - Click "Connect Git Repository" → select `natatasassa-web/SurfaceFeed`
   - After this, every `python3 run.py` automatically updates the live dashboard

3. **GitHub repo**: https://github.com/natatasassa-web/SurfaceFeed
4. **Live dashboard**: https://web-rose-pi-luye4osjq4.vercel.app

---

## What Claude Does (Analysis Layer)

1. **Cluster** — group posts by theme across subreddits
2. **Score** — cross-community overlap (1-5) + engagement (1-5) = total out of 10
3. **Track momentum** — compare against history.json: emerging / surging / holding / fading / isolated
4. **Output** — clean digest with top theories, evidence threads, momentum arrows
5. **History** — last 14 days stored in history.json for trend tracking
