---
version: alpha
name: yuansheng-design-system
description: A dark-luxury identity rooted in Five Elements philosophy, designed for a global Chinese diaspora audience. The system runs on a pure-black canvas with warm copper accent, pairing Inter (UI) and Playfair Display italic (wordmark) with Noto Sans SC for Chinese. The mood is contemplative premium — quiet space, precise typography, and atmospheric depth rather than decorative chrome.
colors:
  ink: "#1a1a1a"
  body: "#555555"
  body-muted: "#888888"
  body-soft: "#aaaaaa"
  hairline: "#e5e5e5"
  hairline-soft: "#f0f0f0"
  canvas: "#ffffff"
  canvas-soft: "#f8f8f8"
  surface: "#000000"
  surface-soft: "#0a0a0a"
  surface-elevated: "#141414"
  surface-card: "#1a1a1a"
  surface-chip: "#222222"
  on-surface: "#f5f5f7"
  on-surface-muted: "#888888"
  on-surface-soft: "#666666"
  primary: "#c8783a"
  primary-hover: "#a86028"
  primary-active: "#8c5018"
  primary-on-dark: "#d4884a"
  primary-soft: "#f0d4b8"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  element-wood: "#4a8c6f"
  element-fire: "#c85a3a"
  element-earth: "#8B7355"
  element-metal: "#8a8a8a"
  element-water: "#3a7a9c"
typography:
  display-hero:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-1.28px"
  display-xl:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.96px"
  display-lg:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.72px"
  display-md:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.28px"
  wordmark:
    fontFamily: "'Playfair Display', serif"
    fontSize: 24px
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  wordmark-cn:
    fontFamily: "'Noto Sans SC', 'Inter', system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "0.04em"
  header-lg:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.22px"
  body-lg:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.17px"
  body-md:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  body-sm:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0"
  caption:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.12px"
  caption-strong:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.12px"
  fine-print:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0"
  nav-link:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "-0.12px"
  button:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "0"
  button-lg:
    fontFamily: "Inter, 'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "0"
rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px
spacing:
  xxxs: 2px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: 96px
  super: 128px
components:
  global-nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 44px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 22px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-on-dark:
    backgroundColor: "{colors.primary-on-dark}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 22px
  button-secondary-ghost:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    borderColor: "{colors.on-surface-muted}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 10px 22px
  button-hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.pill}"
    padding: 14px 28px
  input-text:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    borderColor: "{colors.on-surface-muted}"
    typography: "{typography.body-md}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
    height: 44px
  card-dark:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  footer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.on-surface-muted}"
    typography: "{typography.caption}"
    padding: 48px
---

## 1. Overview

源生万象 | YUANSHENG is a dark-luxury identity for a Five Elements / self-discovery brand serving the global Chinese diaspora. The design language draws from three sources:

- **Bugatti's austerity** — pure black canvas, no unnecessary chrome, typography carries the weight
- **Apple's precision** — exact spacing, single interactive accent, photography-first mentality
- **Ferrari's editorial craft** — dark surfaces with rare, intentional bursts of color

The mood is meditative luxury. Every element earns its place. White space is not empty — it's breath. The copper accent (`#c8783a`) appears only on interactive signals and the wordmark, never as decoration. On dark surfaces, text lives at `#f5f5f7` — not pure white — giving the page a photographic warmth rather than a digital coldness.

## 2. Colors

### Brand & Accent

- **Copper** (`{colors.primary}` — #c8783a): The single interactive accent. Used for primary CTAs, the wordmark italic emphasis, and selected focus indicators. A warm, sophisticated orange-brown — neither gold (too traditional) nor bright orange (too playful). It's the fire that warms the dark.
- **Copper Press** (`{colors.primary-hover}` — #a86028): Hover state for primary buttons.
- **Copper Active** (`{colors.primary-active}` — #8c5018): Active/pressed state.
- **Copper On Dark** (`{colors.primary-on-dark}` — #d4884a): A brighter variant used for CTAs on dark surfaces where Copper would recede.
- **Copper Soft** (`{colors.primary-soft}` — #f0d4b8): Light variant for subtle backgrounds.

### Surface

- **Pure Black** (`{colors.surface}` — #000000): The primary page background for the hero, global nav, and dark sections. True void.
- **Soft Black** (`{colors.surface-soft}` — #0a0a0a): Micro-step above pure black for section differentiation — barely perceptible but creates depth.
- **Elevated Dark** (`{colors.surface-elevated}` — #141414): Card surfaces, elevated panels sitting on the black canvas.
- **Card Surface** (`{colors.surface-card}` — #1a1a1a): The most "visible" dark surface — cards, content blocks in dark sections.
- **Chip Surface** (`{colors.surface-chip}` — #222222): Interactive elements like tags, chips, small badges on dark backgrounds.
- **Pure White** (`{colors.canvas}` — #ffffff): Used sparingly — content pages, light-mode sections.
- **Soft White** (`{colors.canvas-soft}` — #f8f8f8): Footer area, secondary light sections.

### Text

- **On Surface** (`{colors.on-surface}` — #f5f5f7): Primary text on dark backgrounds. Not pure white — Apple-inspired warmth.
- **On Surface Muted** (`{colors.on-surface-muted}` — #888888): Secondary text, metadata, labels on dark.
- **On Surface Soft** (`{colors.on-surface-soft}` — #666666): Disabled text, fine print, placeholder text on dark.
- **Ink** (`{colors.ink}` — #1a1a1a): Headline text on light surfaces.
- **Body** (`{colors.body}` — #555555): Body text on light surfaces.

### Five Elements Palette (Semantic)

These colors are used sparingly for element-specific content (crystal pages, consulting tier cards, element-based products):

- **Wood** (`{colors.element-wood}` — #4a8c6f): Sage green
- **Fire** (`{colors.element-fire}` — #c85a3a): Deep terracotta
- **Earth** (`{colors.element-earth}` — #8B7355): Warm brown
- **Metal** (`{colors.element-metal}` — #8a8a8a): Cool gray
- **Water** (`{colors.element-water}` — #3a7a9c): Deep teal blue

## 3. Typography

### Font Families

- **UI / English Body**: Inter (Google Fonts, variable) — clean, geometric, works at thin and bold weights
- **Display English**: Inter at weight 600-700 with negative letter-spacing for the "tight" premium feel
- **Wordmark**: Playfair Display, italic — serif elegance for the brand name in English contexts
- **Chinese**: Noto Sans SC (Google Fonts) — designed for CJK readability, pairs well with Inter

### Hierarchy

| Token | Size | Weight | Line H | Letter Sp | Use |
|---|---|---|---|---|---|
| `display-hero` | 64px | 700 | 1.05 | -1.28px | Homepage hero headline |
| `display-xl` | 48px | 600 | 1.1 | -0.96px | Section hero titles |
| `display-lg` | 36px | 600 | 1.15 | -0.72px | Feature section headings |
| `display-md` | 28px | 500 | 1.2 | -0.28px | Card titles, sub-sections |
| `body-lg` | 17px | 400 | 1.5 | -0.17px | Large body text |
| `body-md` | 15px | 400 | 1.5 | 0 | Default body, card text |
| `body-sm` | 13px | 400 | 1.4 | 0 | Small print |
| `caption` | 12px | 400 | 1.3 | -0.12px | Secondary captions |
| `nav-link` | 12px | 400 | 1.0 | -0.12px | Navigation items |
| `button` | 14px | 500 | 1.0 | 0 | Button labels |
| `wordmark` | 24px | 400 italic | 1.0 | -0.02em | Brand name (English, Playfair) |

### Principles

- **Negative tracking at display sizes** — every headline above 17px tightens letter-spacing for the premium "compressed" look.
- **Chinese text uses Noto Sans SC** with Inter for English/numbers within the same element — the two fonts work together at the same size.
- **Body never heavier than 400.** Weight carries hierarchy through display sizes; body stays invisible.
- **Line-height 1.5 for readability** on body text — generous but not wasteful.
- **Wordmark italic only** — Playfair Display italic creates the brand signature; never use roman weight for the wordmark.

## 4. Layout

### Spacing System

Base unit: 4px. Structural layout snaps to 8px increments.

- Intra-component gaps: `md` (16px)
- Inter-component gaps: `lg` (24px) or `xl` (32px)
- Section vertical padding: `section` (96px)
- Page gutters: `xl` (32px) on desktop, `lg` (24px) on tablet, `md` (16px) on mobile

### Grid & Container

- **Content max width:** 1200px for content pages, full-bleed for hero sections.
- **Columns:** 2-3 column card grids on dark sections; single-column centered layout for editorial content.
- **Gutters:** 24px between cards in grid layouts.

### Whitespace Philosophy

Black is not a color — it's space. Content floats on the void. Every section has at least 64px of air above its first heading. The goal is to make the user feel like they're in a quiet gallery, not scrolling a web page.

## 5. Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Background canvas, global nav |
| Soft separation | 1px `rgba(255,255,255,0.06)` border | Card edges, surface differentiation on dark |
| Elevated | `rgba(0,0,0,0.4) 0 8px 32px` | Floating panels, modals, dropdowns |
| Backdrop blur | `backdrop-filter: blur(20px)` | Sticky bars, frosted overlays |
| Atmospheric | CSS gradient `rgba(primary, 0.15)` | Hero sections, subtle glow behind content |

**No decorative shadows.** Elevation is functional — it signals hierarchy, not ornament.

## 6. Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed hero sections, nav bar |
| `{rounded.sm}` | 6px | Inline inputs, small chips |
| `{rounded.md}` | 8px | Compact utility elements |
| `{rounded.lg}` | 12px | Cards, content blocks |
| `{rounded.xl}` | 16px | Larger container cards |
| `{rounded.pill}` | 9999px | Primary CTAs, ghost buttons, tags |

## 7. Components

### Global Navigation (`global-nav`)

Pure black bar, 44px height, fixed to top. White text at 12px/400/-0.12px. Links spaced ~20px apart, center-dominant layout. Right side: search icon + account icon. Collapses to hamburger at 834px. No hover underline, no active background — the text color shift from 0.7 to 1.0 is the only feedback.

### Primary Button (`button-primary`)

Copper fill (`#c8783a`), white text, pill shape. Hover darkens to `#a86028`. Active scale: 0.97. The only high-emphasis action per section.

### Hero Button (`button-hero`)

Larger variant of primary CTA — 16px font, 14px x 28px padding. Used on the homepage hero and major section CTAs.

### Ghost Button (`button-secondary-ghost`)

Transparent fill, white text at 0.7 opacity, white 1px border at 0.3 opacity. Used as secondary actions on dark backgrounds.

### Input (`input-text`)

Transparent background, white border at 0.2 opacity, white text. Focus state: border shifts to copper with glow. Pill shape. Height 44px.

### Dark Card (`card-dark`)

Elevated dark surface (#1a1a1a), 12px radius, 24px padding. No shadow — the lightness change from the canvas provides depth.

### Footer (`footer`)

Soft black (#0a0a0a), muted text. Columns of links in caption type. Single hairline separator. Vertical padding 48px.

## 8. Do's and Don'ts

### Do
- Use Copper (`{colors.primary}`) as the ONLY interactive accent — every clickable signal is this color.
- Run hero sections full-bleed with the black canvas absorbing edges.
- Keep nav links at 12px with tight tracking — the subtle density signals precision.
- Use `transform: scale(0.97)` as the active/press state on all buttons.
- Alternate pure black and soft black (`surface` ↔ `surface-soft`) for section rhythm on dark pages.
- Center the wordmark in the nav on mobile when the hamburger replaces link rows.

### Don't
- Don't introduce red, gold, or bright yellow — these read as "Chinese traditional" and contradict the global-luxury positioning.
- Don't use shadows on dark surfaces — lightness elevation (`surface` → `surface-elevated`) replaces drop shadows.
- Don't round the nav bar or full-bleed heroes — corners belong on cards only.
- Don't set body text above 15px for multi-line reading — 17px is reserved for hero lead paragraphs.
- Don't mix accent colors on a single page — Copper is the single voice.
- Don't use the Five Elements palette as UI chrome — those colors are semantic content markers only.

## 9. Responsive Behavior

### Breakpoints

| Width | Key Changes |
|---|---|
| ≥ 1200px | Desktop layout: full nav, multi-column grids, 1200px content max-width |
| 834–1199px | Tablet landscape: nav still expanded, cards go 2-column |
| 768–833px | Tablet portrait: global nav collapses to hamburger + centered wordmark |
| 480–767px | Phone: single-column everything, hero type drops to 36px |
| < 480px | Small phone: hero type at 28px, touch targets at minimum 44px |

### Collapsing Strategy
- **Global nav**: desktop link row → centered wordmark + hamburger + icons at 834px.
- **Content grids**: 3-col → 2-col at 834px → 1-col at 640px.
- **Hero typography**: 64px → 48px at 834px → 36px at 640px → 28px at 480px.