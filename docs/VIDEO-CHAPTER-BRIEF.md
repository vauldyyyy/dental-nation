# Two homepage film chapters

The FPV teeth film stays in the opening loader. The homepage has two separate, full-screen film placements with clinic-photo fallback until final clips arrive. Configuration is in `content/films.js`.

## Film 01 — The space

Placement: after the clinic introduction, before treatment pathways. Aim for an inviting transition into Dental Nation's world: warm daylight, sage glass, soft greenery and sculptural interior details. If filmed at the real clinic, a slow continuous camera move through reception/waiting areas is ideal. Avoid patients, visible personal details and invented signage. Current poster: `gallery-05.jpg`.

## Film 02 — The details

Placement: after treatment exploration, before the patient journey. Aim for macro-scale visual craft: clean dental instruments, enamel, ceramic and water/light details. Keep it elegant and non-graphic. Do not show a specific procedure or outcome unless the clinic can substantiate it. Current poster: `gallery-06.jpg`.

For each chapter, provide a muted, web-ready MP4, ideally 1920×1080, 24 or 30 fps, 8–15 seconds, with a clean beginning and end that can loop. Keep the key subject inside the middle 60% so the film crops well on phones. No baked-in text, CTA, music or watermark. Include a matching still frame if possible. Once the clips arrive, place them in `public/media/chapters/` and set each `src` in `content/films.js`; the page already supports playback, offscreen pause, reduced motion and image fallback.
