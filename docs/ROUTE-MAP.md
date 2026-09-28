# Route map

## New routes

- `/` — Home
- `/our-clinic` — Our Clinic
- `/dentists` — Meet the Dentists
- `/treatments` — all 15 treatments with category filters
- `/treatments/[slug]` — 15 statically generated treatment detail routes
- `/gallery` — Clinic Gallery
- `/first-visit` — Your First Visit + practical FAQs
- `/advice` — Patient Advice index
- `/advice/[slug]` — source-grounded existing article pages
- `/contact` — Contact / Request an Appointment
- application 404 — branded not-found page

## Old → new redirects

Implemented in `next.config.mjs`:

- `/services-4` → `/treatments`
- `/contact-5` → `/contact`
- `/blog` → `/advice`
- `/post/what-to-expect-during-an-routine-dental-extraction` → `/advice/what-to-expect-during-a-routine-dental-extraction`
- `/post/do-you-really-need-a-crown-after-a-root-canal` → `/advice/do-you-really-need-a-crown-after-a-root-canal`
- `/post/do-i-really-need-a-root-canal-7-signs-your-tooth-may-need-one` → `/advice/seven-signs-you-may-need-a-root-canal`

Keep any additional historical Wix article aliases as redirects rather than deleting content after launch.
