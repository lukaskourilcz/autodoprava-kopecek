# Autodoprava Kopeček — cost and scaling

A static bilingual Next.js marketing site on Vercel. The tech stack is in
`about-project.md`; this file covers cost and scaling only. Prices are
indicative — verify in the provider console.

## What it costs

| Mode | Fixed cost | Variable | Practical total |
|---|---|---|---|
| Current (static marketing) | Vercel Hobby (personal) or Pro $20 for commercial | ~0 (static) | **~$0–20/mo** |

A static marketing site is effectively free to run. The only real cost is a
custom domain and, if used commercially, a Vercel Pro seat.

## Scaling triggers

- Traffic is served as static assets from the edge — it scales trivially.
- The Google Maps embed is the only third-party dependency; if it grows costly
  or needs consent, switch to the official Maps Embed API with click-to-load.
- Add analytics (Vercel Analytics needs no cookie banner) only if you want stats.

## Cost controls

Keep it static, avoid server functions unless a contact form needs one, and set a
Vercel spend/usage alert if on a paid plan.
