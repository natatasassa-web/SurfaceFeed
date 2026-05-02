---
name: SurfaceFeed
description: Cross-community Reddit signal tracker — daily dispatch of emerging narratives.
colors:
  morning-paper: "#E9E5DC"
  ink: "#1C1A17"
  worn-type: "#9E9589"
  warm-rule: "#D4CFC6"
  muted-secondary: "#6B6358"
  signal-surging: "#E8C96B"
  signal-emerging: "#B8D4A8"
  signal-holding: "#A8BEC8"
  signal-fading: "#C4909A"
  signal-isolated: "#D8D2C8"
typography:
  display:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
  mono:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  full: "9999px"
  card: "16px"
  post: "12px"
  button: "6px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "32px"
components:
  theory-card:
    backgroundColor: "{colors.signal-isolated}"
    rounded: "{rounded.card}"
    padding: "20px"
  theory-card-surging:
    backgroundColor: "{colors.signal-surging}"
    rounded: "{rounded.card}"
    padding: "20px"
  theory-card-emerging:
    backgroundColor: "{colors.signal-emerging}"
    rounded: "{rounded.card}"
    padding: "20px"
  theory-card-holding:
    backgroundColor: "{colors.signal-holding}"
    rounded: "{rounded.card}"
    padding: "20px"
  theory-card-fading:
    backgroundColor: "{colors.signal-fading}"
    rounded: "{rounded.card}"
    padding: "20px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.morning-paper}"
    rounded: "{rounded.button}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "10px 20px"
  momentum-badge:
    rounded: "{rounded.full}"
    padding: "2px 8px"
  subreddit-tag:
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: SurfaceFeed

## 1. Overview

**Creative North Star: "The Signal Room"**

SurfaceFeed is a room you enter every morning to find what matters. It is not a feed — it is a filtered dispatch. The name says it: surface, then feed. The design follows that logic. Everything that is not signal is invisible. Everything that is signal has weight.

The palette is warm parchment — Morning Paper, Ink, Worn Type. Not clinical white, not aggressive dark. The material reference is the printed page: considered, legible, made with care. Momentum colors (surging gold, emerging green, holding blue, fading rose, isolated grey) are the only saturated elements; their restraint as a percentage of the surface makes them meaningful when they appear.

Typography is quiet and confident. Geist Sans carries the hierarchy; Geist Mono handles metadata (ranks, scores) as a secondary material. Spacing is generous — the july.fund principle: let things breathe. Components are tactile and considered: rounded enough to feel warm, structured enough to hold information. No shadows, no depth tricks — surfaces are flat, distinction comes from tonal shifts and border weight.

This system explicitly rejects the aesthetic of amie.so (too plain, no personality) and usedropshot.com (too dark, too heavy). It is not a productivity tool with a dark theme. It is not a generic SaaS dashboard. It is a publication-grade reading experience, built to be opened.

**Key Characteristics:**
- Warm parchment base with flat tonal surfaces
- Momentum color system as the primary semantic layer
- Generous spacing with deliberate rhythm
- Subtle retro sensibility: print textures, not nostalgia
- No shadows — elevation through tone, not depth

## 2. Colors: The Morning Paper Palette

A warm, restrained palette anchored in parchment and ink. The five momentum colors are semantic, not decorative — their meaning is fixed.

### Primary
- **Ink** (`#1C1A17`): The foreground. All primary text, titles, icons, active states. Not pure black — warm and slightly brown, like dried ink on paper.

### Neutral
- **Morning Paper** (`#E9E5DC`): The page. Background for all surfaces. Warm enough to feel considered, light enough to hold long-form reading.
- **Worn Type** (`#9E9589`): Secondary text. Timestamps, subreddit attribution, metadata, legends. The color of text that's been read many times.
- **Muted Secondary** (`#6B6358`): Tertiary text. Italic signal reasons, the "Feed" in the wordmark. One step darker than Worn Type.
- **Warm Rule** (`#D4CFC6`): Borders and dividers. Header underline, card borders at rest. Present but quiet.

### Semantic: Momentum Colors
Used only for momentum state assignment on TheoryCards. Each color conveys velocity, not decoration. Never use momentum colors outside of their assigned card state.

- **Surging** (`#E8C96B`): Gold. Breaking signal, high cross-community convergence. Use badge `#C9A840`, tag text `#5C4A10`.
- **Emerging** (`#B8D4A8`): Muted green. New signal gaining traction. Use badge `#7AA860`, tag text `#2D5C1A`.
- **Holding** (`#A8BEC8`): Dusty blue. Stable signal, still present. Use badge `#6A94A8`, tag text `#1A3D50`.
- **Fading** (`#C4909A`): Dusty rose. Signal losing momentum. Use badge `#A05860`, tag text `#5C1A22`.
- **Isolated** (`#D8D2C8`): Warm grey. Low cross-community signal, single source. Use badge `#9E9589`, tag text `#4A4540`.

### Named Rules
**The Momentum Monopoly Rule.** Momentum colors are the only saturated elements in the interface. They appear exclusively on TheoryCards as background tints. Their rarity is their meaning — diluting them to decorative use destroys the signal system.

**The Warm Neutral Rule.** Every neutral is warm, not cool. Never introduce a grey with blue or green cast. The palette reads as parchment and print, not screen and glass.

## 3. Typography

**Primary Font:** Geist Sans (system-ui, sans-serif fallback)
**Mono Font:** Geist Mono (monospace fallback)

**Character:** Geist Sans is clean and contemporary with enough warmth to avoid sterility. The mono face carries metadata — ranks, scores — giving them a distinct material quality separate from editorial content.

### Hierarchy
- **Display** (700 weight, 1.5rem / 24px, −0.025em tracking): The "SurfaceFeed" wordmark. Used once per view.
- **Headline** (700 weight, 1rem / 16px, snug line-height ~1.375): Theory titles. The most important text on any card — bold, scannable.
- **Body** (400 weight, 1rem / 16px, 1.375 line-height): Theory summaries. No max-width on the card, but the overall column caps at ~768px (max-w-3xl). Readable over time.
- **Label** (600 weight, 0.75rem / 12px, 0.1em letter-spacing, uppercase): Momentum badges. Small caps energy — present without shouting.
- **Caption** (400 weight, 0.75rem / 12px): Subreddit tags, scores, timestamps, metadata. Uses Worn Type color by default.
- **Mono** (400 weight, 0.875rem): Rank numbers (left of each card). The monospace face signals "data" — a deliberate material contrast.

### Named Rules
**The Two-Face Rule.** Geist Sans handles editorial content; Geist Mono handles data. Never use mono for prose, never use sans for rank numbers or scores. The material distinction is functional.

## 4. Elevation

This system is flat by default. No shadows appear on any surface. Depth is conveyed entirely through tonal contrast: momentum-colored card backgrounds sit against Morning Paper, creating figure-ground distinction without lifting off the page.

The only visual separation tools are background tint, border weight, and internal padding. This is a deliberate choice — the interface should feel like a well-laid printed page, not a layered digital stack.

**The Flat Surface Rule.** If you are considering adding a box-shadow, the answer is no. Reconsider the tonal hierarchy instead.

## 5. Components

### Buttons
Buttons are sparsely used — the current interface has no primary CTAs, only a text toggle for expanding post threads. When buttons are introduced (future landing page, sharing flows), follow this:

- **Shape:** Gently squared edges (6px radius). Not a pill, not a hard rectangle — the timespent.so register of subtle, considered rounding.
- **Primary:** Ink (`#1C1A17`) background, Morning Paper (`#E9E5DC`) text. Padding 10px 20px. Uppercase, 0.75rem, 600 weight, 0.1em tracking. On hover: slight upward translate (−1px) and background softens to `#2C2A27`.
- **Ghost:** Transparent background, 1px Warm Rule border, Ink text. On hover: Morning Paper tint background (`rgba(233,229,220,0.5)`), border shifts to `rgba(28,26,23,0.3)`.
- **Text toggle (current):** `text-xs`, Worn Type color, hover to Ink. Used for "▼ show N threads / ▲ hide threads". Not a button — a discreet inline action.

### TheoryCard (Signature Component)
The primary surface. Each card is a signal cluster, colored by its momentum state.

- **Shape:** 16px radius (rounded-2xl). Warm, not pill-shaped.
- **Background + Border:** Assigned by momentum state. See Colors section. Default (isolated): `#D8D2C8` bg, `#C4BEB4` border.
- **Internal Padding:** 20px (p-5). Generous — cards breathe.
- **Layout:** Rank number (mono, 30% ink opacity) + content block indented 32px from rank. Title → summary → italic why-signal → subreddit tags → score bars.
- **Momentum Badge:** Uppercase label on a rounded-full pill. Background and text colors from momentum config. Surging uses the ⚡ icon; all others use ● dot.
- **Score Bars:** ▪ character repeated 5×. Filled = full Ink; unfilled = 20% Ink. Two rows: cross-community and engagement. Typography as data.
- **Expand State:** Text toggle reveals post links below score bars. No animation — instant appear.

**The Indent Rule.** All card body content (title, summary, signal reason, tags, scores) is offset 32px from the left edge — visually aligning with the content, not the rank number. The rank number is a margin annotation, not a column.

### Subreddit Tags
- **Style:** Rounded-full pill, text-xs, 2px 8px padding. Background is momentum color at 40% opacity; text is momentum's dark variant. Border: `1px solid rgba(28,26,23,0.1)`.
- **Behavior:** Static — display-only. Not interactive.

### Post Links (Expanded State)
- **Style:** 12px radius, text-xs, `rgba(255,255,255,0.3)` background (a white glaze over the momentum tint), `1px solid rgba(28,26,23,0.1)` border. Padding 10px.
- **Hover:** Background lifts to `rgba(255,255,255,0.5)`, border to `rgba(28,26,23,0.2)`, text darkens from 60% to 100% Ink.
- **Layout:** Subreddit (40% opacity) · score · title. All inline, left to right.

### Header
- **Wordmark:** "Surface" in Ink, "Feed" in Muted Secondary (`#6B6358`). Display size, 700 weight, −0.025em tracking. The split color is the signature — understated, distinctive.
- **Tagline:** "What Reddit is cooking — across communities." Caption size, Worn Type color.
- **Meta block (right-aligned):** Date in Ink medium weight; time and post count in caption Worn Type.
- **Momentum Legend:** Five items inline. Icon + label pairs. Uses each momentum state's color for the icon.
- **Bottom border:** 1px Warm Rule. Separates the header from the feed without visual weight.

## 6. Do's and Don'ts

### Do:
- **Do** use Morning Paper (`#E9E5DC`) as the page background. All light surfaces should be this warm parchment, never pure white or cool grey.
- **Do** give cards and text room to breathe. The july.fund principle: generous, rhythmic spacing. Padding at 20px inside cards, 32px at the page header, 16px gap between cards.
- **Do** use momentum colors only in their assigned semantic context — TheoryCard backgrounds and their derived badge/tag colors. Their meaning depends on their rarity.
- **Do** use Geist Mono exclusively for rank numbers and score metadata. The material contrast is intentional and functional.
- **Do** keep the "Surface" + "Feed" wordmark split: Ink for "Surface", Muted Secondary for "Feed". Do not unify the colors.
- **Do** distinguish momentum states through color, icon, and label simultaneously — never by color alone (accessibility requirement).
- **Do** use the `▪` score bar convention for quantitative values. It reads as tactile and considered, consistent with the print aesthetic.

### Don't:
- **Don't** add shadows. No `box-shadow`, no `drop-shadow`. This system is flat by design — elevation through tone, not depth.
- **Don't** use momentum colors decoratively or outside of TheoryCard state assignment. A gold accent button, a green heading — both violate the system.
- **Don't** make this look like amie.so: no featureless flat UI with no personality, no interaction affordance, no considered hierarchy.
- **Don't** make this look like usedropshot.com: no dark mode, no heavy backgrounds, no aggressive color weight.
- **Don't** use pure black (`#000`) or pure white (`#fff`). All surfaces and text are warm-tinted.
- **Don't** introduce gradients. No `background-clip: text` gradient treatments, no gradient backgrounds, no glass morphism.
- **Don't** use border-left accent stripes on cards or list items. Momentum is expressed through full background tint, not a left-border decoration.
- **Don't** nest cards. The TheoryCard is the container — post links inside are link items, not nested cards.
- **Don't** make buttons pill-shaped (border-radius: 9999px). The 6px radius is the correct register — warm and restrained, not candy.
