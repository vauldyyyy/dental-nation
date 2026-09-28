# Content editing guide

## Business details and opening hours

Edit `content/site.js` → `business`.

Opening windows are represented as minutes after midnight in Goa local time. The current schedule is:

- 09:30 → `570`
- 13:00 → `780`
- 15:00 → `900`
- 18:30 → `1110`

Sunday is an empty array. `lib/business.js` uses `Asia/Kolkata` for open/closed and appointment-date logic.

## Phone, WhatsApp and email

Change `phoneDisplay`, `phoneE164`, `whatsappNumber` and `email` in `content/site.js`. Do not hard-code a new number inside components. `lib/business.js` builds `tel:`, `mailto:`, map and `wa.me` URLs centrally.

## Dentists

Edit the `dentists` array in `content/site.js`. Keep credentials and roles factual. Each person has:

- `name`
- `credentials`
- `role`
- `sourceImage` (official published portrait)
- `localFallback`
- `alt`

For a fully local deployment, place approved source photos under `public/images/team/official/` and change `sourceImage` to those local `/images/...` paths.

## Treatments

All 15 treatments live in the `treatments` array. Each treatment drives both the index and `/treatments/[slug]`, so a copy change happens in one place. Keep `slug` stable once indexed unless you add a redirect.

Do not add unverified prices, guarantees, equipment claims, outcome promises or universal suitability statements.

## Gallery

The official public sources are in `galleryRemote`. Once local clinic originals are supplied, replace each URL with a local path and retain meaningful alt text in the gallery component if you have more specific image context.

## Advice / articles

The `articles` array preserves source-grounded existing Dental Nation material. `editorialNote` makes the distinction between preserved clinical source content and newly organised website prose. If a dentist writes a genuinely new article, add it as a separate item and record the real author/source status.

## Hero video

Do not change video tags directly. Follow `HERO-VIDEO-INTEGRATION.md`; the only configuration file is `content/hero.js`.

## Localising the current official photos

Run `npm run fetch:official-assets` on a machine that can access `static.wixstatic.com`. The image components already prefer those generated local destinations before the official web URL and finally the abstract fallback, so no component edits are required after a successful fetch.
