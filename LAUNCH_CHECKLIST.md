# WatchInOrder — Launch Checklist

Work through this list top to bottom. Check each item before moving to the next.

---

## Step 1 — Domain & Hosting (do this first, nothing else works without it)

- [ ] Register `watchinorder.com` on Namecheap (~$12/year)
- [ ] Create GitHub account at github.com if you don't have one
- [ ] Create new GitHub repo named `watchinorder` (public or private, doesn't matter)
- [ ] Push the code: `git init && git add . && git commit -m "launch" && git push`
- [ ] Create Vercel account at vercel.com (free)
- [ ] Import GitHub repo to Vercel → Framework: Other → Deploy
- [ ] Add custom domain in Vercel Settings → Domains → `watchinorder.com`
- [ ] Update Namecheap DNS to point to Vercel nameservers
- [ ] Wait 30 min → visit https://watchinorder.com → confirm it loads

---

## Step 2 — Affiliate Links (replace placeholders in index.html)

- [ ] Sign up for Amazon Associates at associates.amazon.com
  - Needs live URL → do after Step 1
  - Get your real tag (e.g. `yourname-20`)
  - In index.html: Find & Replace `watchinorder-20` → your real tag
  - Also replace in SP object: `tag=watchinorder-20`
- [ ] Apply for Disney+ affiliate via Rakuten Advertising
  - Get your partner ID
  - Replace `cid=WATCHINORDER` with your real ID
- [ ] Apply for Apple TV affiliate via Apple Performance Partners
  - Get your token
  - Replace `af_ref=watchinorder` with your real token

---

## Step 3 — Email List (free, takes 15 min)

- [ ] Create ConvertKit account at convertkit.com (free up to 1,000 subs)
- [ ] Create a Form → copy the form ID
- [ ] In index.html, find `function handleNL()` and replace the console.log with:
```javascript
function handleNL(){
  const email = document.getElementById('nlEmail').value;
  if(!email || !email.includes('@')) return;
  fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({api_key: 'YOUR_API_KEY', email})
  });
  document.getElementById('nlFine').style.display = 'none';
  document.getElementById('nlSuccess').style.display = 'block';
  if(STATE.user) addXP(50, 'Newsletter signup');
}
```
- [ ] Replace `YOUR_FORM_ID` and `YOUR_API_KEY` with real ConvertKit values
- [ ] Test by entering your own email on the site

---

## Step 4 — Analytics (10 min)

- [ ] Create Google Analytics 4 property at analytics.google.com
- [ ] Get your measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Add to index.html `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
- [ ] Verify data is appearing in Analytics within 24 hours

- [ ] Verify domain in Google Search Console at search.google.com/search-console
- [ ] Submit sitemap: `https://watchinorder.com/sitemap.xml`

---

## Step 5 — AdSense Application (do this day 1, takes 1–4 weeks to approve)

- [ ] Apply at adsense.google.com (needs live domain with real content)
- [ ] While waiting for approval, keep the `.ad-lb` divs in place (they're placeholder divs)
- [ ] When approved, replace each `.ad-lb` div with your AdSense code:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

---

## Step 6 — Stripe for Pro Subscriptions

- [ ] Create Stripe account at stripe.com (free to create, they take 2.9% + 30¢ per transaction)
- [ ] Create two Products:
  - "WatchInOrder Pro Monthly" — $3.99/month recurring
  - "WatchInOrder Pro Annual" — $29.99/year recurring
- [ ] Get Price IDs for each (format: `price_XXXXXXXXXXXXXXXXXXXXXXXXXX`)
- [ ] In index.html, find `function handleSubscribe(plan)` and replace the body with:
```javascript
function handleSubscribe(plan){
  if(!STATE.user){ openAuth('register'); return; }
  const prices = {
    monthly: 'price_YOUR_MONTHLY_PRICE_ID',
    annual: 'price_YOUR_ANNUAL_PRICE_ID'
  };
  // Redirect to Stripe Checkout
  fetch('/api/create-checkout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      priceId: prices[plan],
      email: STATE.user.email,
      userId: STATE.user.username
    })
  })
  .then(r => r.json())
  .then(data => window.location.href = data.url);
}
```
- [ ] Create `/api/create-checkout` serverless function (see `src/lib/stripe.js`)
- [ ] Add Stripe webhook to set `isPro = true` after successful payment

---

## Step 7 — OG Image (for social sharing)

- [ ] Create a 1200×630 image with:
  - Black background
  - "WATCHINORDER" in Bebas Neue or bold white font  
  - Subtitle: "The right watch order for every movie universe"
  - A few franchise emojis: 🦸 🔪 🚀 ⚔️ 💥 🎨
- [ ] Save as `public/og-image.jpg`
- [ ] Confirm the `og:image` meta tag in index.html points to `https://watchinorder.com/og-image.jpg`
- [ ] Test with Facebook Sharing Debugger: developers.facebook.com/tools/debug

---

## Step 8 — Pre-launch content

- [ ] Post in r/marvelstudios: answer a watch order question, mention the site
- [ ] Post in r/StarWars: same
- [ ] Post in r/horror: same
- [ ] Create Letterboxd account → create 3 franchise lists with site URL in description
- [ ] Tweet the MCU watch order with `#MCU` hashtag and site link

---

## Optional but high-value

- [ ] Create a free Hotjar account → add heatmap tracking to see where users click
- [ ] Submit to Product Hunt (prep a good description and screenshots first)
- [ ] Create a Twitter/X account for WatchInOrder — post daily watch order content
- [ ] Create a TikTok account — "correct order to watch X" format

---

## Revenue checklist (done when all green)

- [ ] Amazon Associates tag live (affiliate revenue on rentals)
- [ ] ConvertKit collecting emails (newsletter list growing)
- [ ] AdSense approved (ad revenue from traffic)
- [ ] Stripe connected (Pro subscription revenue)
- [ ] Analytics tracking sessions (know what's working)

**Estimated timeline to first $100:** 4–8 weeks after launch with active Reddit/social promotion.
