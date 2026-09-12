# Anamaya — Wellness & Retreat, Jaipur (Prototype Website · v2)

A fully responsive, dependency-free prototype website for **Anamaya Wellness and Retreat, Jaipur**.

> **Prototype note:** No official web presence for "Anamaya Wellness and Retreat, Jaipur"
> could be found during research, so all specifics (team names, prices, phone/email,
> address, schedule) are *realistic, clearly-marked placeholders*. Swap them for real
> details before launch — see "Placeholder inventory" below.

## Research basis

- **Name & philosophy** — *Anāmaya* (अनामय) is verified Sanskrit/Pali for
  "free from illness / healthy, sound" (Wisdomlib Sanskrit & Pali dictionaries).
  The brand story is built on this meaning plus the client's own positioning:
  conscious living through Yoga, Meditation, Healing and Naturopathy.
- **Naturopathy content** — grounded in the Indian nature-cure tradition and the
  five great elements (Panchamahabhuta: earth, water, fire, air, ether) with their
  classical therapies (mud packs/baths, hydrotherapy, sun & steam baths, breath
  work, fasting) as described in AYUSH-adjacent naturopathy literature.
- **Structure inspiration** — anammyaawellness.com (offerings grid, therapy
  packages with prices, consultation-first flow) and international retreat sites
  (program tiers, testimonials, day-rhythm timelines). Nothing was copied.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero, philosophy, four pillars, daily rhythm, retreat teasers, testimonials, journal teaser, CTA |
| `about.html` | Name meaning, values, sanctuary, approach, team |
| `practices.html` | Deep dive on Yoga · Meditation · Healing · Naturopathy + weekly rhythm |
| `retreats.html` | Programs (day → 14-day), rooms & kutirs, practical travel notes |
| `therapies.html` | Five-element therapy menu with prices, day pass, consultation, FAQ |
| `gallery.html` | Masonry gallery with accessible lightbox |
| `journal.html` | Featured essay, notes, newsletter signup |
| `contact.html` | Enquiry form with validation, stylised map, hours, FAQs |

## Design v2 — "Quiet luxury editorial"

Ivory / deep-pine / gold palette · sharp 2px geometry · thin serif display type ·
hairline rules · offset sand-block image frames · diamond bullets & rotated-dot
carousels · transparent header that solidifies on scroll · underline nav.
Replaces v1's rounded terracotta/clay look entirely.

## Tech & compatibility

- **Zero dependencies** — plain HTML/CSS/vanilla JS; no CDN, no build step.
- System font stacks (serif display + sans body) so it renders identically offline.
- Cross-browser: no CSS nesting/`:has()`, flex+grid layouts, `-webkit-` prefix for
  backdrop-filter, `prefers-reduced-motion` respected, content visible with JS off.
- Responsive breakpoints at 1024 / 900 / 720 / 640 / 560 px; hamburger nav on mobile.
- Accessibility: skip link, landmarks, `aria-current`, labelled controls, keyboard
  lightbox & accordions, focus styles, sufficient contrast.

## Run locally

```bash
cd anamaya
python3 -m http.server 8080 --bind 0.0.0.0
# open http://localhost:8080
```

## Placeholder inventory (replace before launch)

- Social handles: research found NO verified accounts for this Jaipur business
  (only unrelated namesakes: @anamayaresort Costa Rica, Anamay Ashram Kausani).
  Footer icons currently point at illustrative handles (@anamaya.jaipur) — replace
  with real URLs when they exist.
- Phone `+91 141 400 0000`, WhatsApp `+91 98290 00000`, email `hello@anamayajaipur.in`
- Address "Aravalli Foothills, Amer Road, Jaipur 302028" + map distances
- Prices (₹3,500 day pass → ₹78,000 14-day), therapy prices
- Team names/credentials; testimonials; schedule times
- Photography: real, watermark-free stock photos downloaded from Pexels
  (free license, no attribution required): haveli courtyard 36562003, yoga 36941720,
  meditation 5201529, herbal compress 6187852, turmeric 12122270, thali 36885763,
  practice hall 11671894, bedroom 4045540, garden path 9459200, diyas 10182772.

## Files

```
anamaya/
  *.html            8 pages
  assets/css/main.css   design system
  assets/js/main.js     nav, reveal, tabs, accordion, carousel, lightbox, forms
  assets/img/           10 concept images + favicon.svg
  robots.txt, sitemap.xml, README.md
```
