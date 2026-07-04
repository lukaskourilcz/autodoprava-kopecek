# NEEDED — things to wire up or confirm

Everything below is optional or needs a decision/account from you. The site works
without any of it — these steps upgrade reliability, SEO, and legal cleanliness.

---

## 1. Google Maps embed (Contact section)

**Current state:** the map uses the *keyless* Google Maps embed
(`https://maps.google.com/maps?q=<address>&output=embed`) in
`src/app/_sections/Contact.tsx`. No account or API key is required and it should
just work.

**To verify now:** open the contact section and check the pin lands on
*V Chalupách 228/50, Lužice* (next to Hodonín). If Google resolves the address
slightly off, tell me the exact GPS coordinates (right-click the correct spot in
Google Maps → copy coordinates) and I'll switch the embed to coordinates.

**Optional upgrade — official Maps Embed API (more reliable, customizable):**
1. Go to https://console.cloud.google.com/ and create a project (e.g. "autodoprava-web").
2. Enable **Maps Embed API** (APIs & Services → Library → Maps Embed API → Enable).
3. Create an API key (APIs & Services → Credentials → Create credentials → API key).
4. Restrict the key: Application restrictions → *Websites* → add
   `https://www.autobusyhodonin.cz/*` (and `http://localhost:3000/*` for testing);
   API restrictions → *Maps Embed API* only.
5. The Maps Embed API is free (unlimited usage, no billing charges), but Google
   still requires a billing account on the project.
6. Give me the key (or put it in `.env.local` as `NEXT_PUBLIC_MAPS_EMBED_KEY=...`)
   and I'll switch the iframe to
   `https://www.google.com/maps/embed/v1/place?key=...&q=...`.

**GDPR note:** the embedded Google map loads Google cookies as soon as the iframe
loads. Czech practice for a simple business site is generally tolerant, but the
strict approach is a "click to load map" consent overlay. Say the word and I'll
add one.

## 2. Google Business Profile (biggest trust win — recommended)

A verified Google listing makes the company show up on Google Maps and in local
search with reviews, photos, and hours — the single strongest "established
company" signal for locals.

1. Go to https://business.google.com/ and sign in with the company's Google account.
2. Add/claim the business: name "Autodoprava Kopeček", category "Bus charter" /
   "Autobusová doprava", address V Chalupách 228/50, Lužice.
3. Verify (Google sends a postcard with a code to the address, or offers phone/video
   verification).
4. Fill in: hours, phone +420 777 685 331, website https://www.autobusyhodonin.cz,
   and upload the fleet photos.
5. Ask a few happy customers for Google reviews — reviews compound.

## 3. Google Search Console (SEO monitoring)

1. Go to https://search.google.com/search-console and add property
   `autobusyhodonin.cz` (Domain property — needs one DNS TXT record at your
   domain registrar; Google shows the exact value).
2. After verification, submit the sitemap: **Sitemaps → add
   `https://www.autobusyhodonin.cz/sitemap.xml`** (the site now generates this
   automatically, along with robots.txt).
3. Nothing else needed — it monitors indexing and search performance.

## 4. Confirm two content decisions

- **Opening hours** now read "Po–Pá 7:00–17:00 · po domluvě kdykoliv"
  (*by arrangement anytime*) in all three languages. If that overpromises,
  edit it in `/dev` → Texts → Contact → Hours, or tell me the right wording.
- **Hero photos** were curated from 9 to 5 (kept: Dolomites coach, depot fleet
  lineup, Adriatic-coast van, winter mountain pass, coach+truck; dropped: rest-stop
  picnic, hotel forecourt, low-res trailer shot, gray-sky closeup). The dropped
  files are still in `/public/pics/` — to restore any, add it back to the
  `heroImages` list in `src/app/_sections/Header.tsx`.

## 5. Optional: analytics

If you want visitor stats, the lightweight options are Vercel Analytics (one
package, no cookie banner needed) or Plausible (~9 €/mo, EU-hosted). Google
Analytics 4 is free but requires a cookie consent banner under EU rules.
Tell me which one and I'll wire it.
