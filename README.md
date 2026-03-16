# WatchInOrder 🎬

> The right watch order for every movie universe, franchise & saga.

**Live site:** [watchinorder.com](https://watchinorder.com)

---

## What this is

A single-file web app covering 45+ franchises with full watch orders, must-know tips, streaming links, XP gamification, and a "Before the Release" calendar.

Deployed as a static HTML file via Vercel — fast, free, zero infrastructure.

---

## Deploy in 5 minutes

### 1. Clone & push to GitHub
```bash
git clone https://github.com/YOUR_USERNAME/watchinorder
cd watchinorder
git add .
git commit -m "initial commit"
git push
```

### 2. Deploy to Vercel (free)
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework Preset: **Other**
4. Root Directory: `/`
5. Click Deploy

That's it. Vercel gives you a live HTTPS URL in ~30 seconds.

### 3. Add your domain
1. In Vercel → Settings → Domains → Add `watchinorder.com`
2. Copy the nameservers / CNAME to your registrar (Namecheap)
3. Wait 10–30 minutes for DNS propagation

---

## Before you launch — replace these placeholders

Open `index.html` and search for each of these:

| Placeholder | What to replace with | Where to get it |
|-------------|---------------------|-----------------|
| `watchinorder-20` | Your real Amazon Associates tag | [associates.amazon.com](https://associates.amazon.com) |
| `cid=WATCHINORDER` | Your Disney+ affiliate ID | [Rakuten Advertising](https://rakutenadvertising.com) |
| `af_ref=watchinorder` | Your Apple TV affiliate token | [Apple Performance Partners](https://affiliate.itunes.apple.com) |
| `handleNL()` console.log | ConvertKit form submit | [app.convertkit.com](https://app.convertkit.com) |
| `handleSubscribe()` alert | Stripe checkout redirect | [stripe.com](https://stripe.com) |
| `https://watchinorder.com/og-image.jpg` | Real OG image URL | Design a 1200×630 image |

---

## Revenue setup (do these in order)

1. **Amazon Associates** — apply at associates.amazon.com (needs live URL first)
2. **ConvertKit** — free up to 1,000 subscribers
3. **Google AdSense** — apply at adsense.google.com (takes 1–4 weeks)
4. **Stripe** — for Pro subscriptions ($3.99/mo or $29.99/yr)
5. **Mediavine** — replace AdSense when you hit 50K monthly sessions

---

## File structure

```
watchinorder/
├── index.html          ← The entire app (45 franchises, all JS/CSS)
├── vercel.json         ← Vercel routing config
├── robots.txt          ← SEO: allow all crawlers
├── sitemap.xml         ← SEO: page list for Google
├── public/
│   └── og-image.jpg    ← Replace with real 1200×630 OG image
└── README.md
```

---

## SEO notes

The single HTML file can rank for broad terms. For individual franchise pages to rank (e.g. `/mcu-watch-order`), you need to migrate to Next.js — each franchise needs its own URL.

**Current SEO wins even as single file:**
- Schema.org JSON-LD injected per franchise page
- Dynamic `<title>` and `<meta description>` per page
- FAQ schema for rich results
- Canonical URLs update on navigation

**What Next.js migration unlocks:**
- `/mcu-watch-order` → 300K/mo keyword
- `/halloween-movies-watch-order` → 80K/mo keyword  
- Server-side rendering = Google can index everything
- Individual page sitemaps

---

## Tech stack

- Vanilla HTML/CSS/JS — no build step, no dependencies
- Google Fonts (Bebas Neue, Outfit, Playfair Display)
- localStorage for state persistence
- Vercel for hosting (free)

---

## Promotion

See `PROMOTION.md` for the full playbook.

---

## License

MIT — use the structure freely, but the franchise data and copy is original.
