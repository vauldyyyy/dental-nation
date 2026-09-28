# Optional future Veo ambience prompt pack

These clips are **optional enhancements**. The shipped procedural backgrounds are the production fallback and do not depend on these files.

## Opening FPV — desktop
**Filename:** `public/media/hero/dental-fpv-desktop.mp4`  
**Placement:** Full-screen opening sequence before the homepage  
**Aspect:** 16:10 master, safe for 16:9 crop  
**Prompt:** “Eight-second premium FPV glide through abstract dental architecture: monumental pearl-white enamel tooth forms, sculpted cream stone corridors, soft Goan morning sunlight, warm shadows, elegant curved openings, physically plausible materials, no people, no text, no clinic logos, no medical gore, gentle camera acceleration then settle on a hero tooth arch, editorial luxury healthcare cinematography, natural exposure, refined not sci-fi.”  
**Motion:** energetic first 3 s, then calm deceleration; no obvious loop requirement  
**Poster fallback:** `dental-fpv-poster.webp`

## Opening FPV — mobile
**Filename:** `public/media/hero/dental-fpv-mobile.mp4`  
**Placement:** Optional portrait-format full-screen opening under ~700 px  
**Aspect:** 9:16  
**Prompt:** same world as desktop; keep the architectural tooth centre-right with quiet lower-left negative space for live HTML headline; no baked text.  
**Motion:** preserve readable foreground region; settle cleanly  
**Poster fallback:** same poster with CSS focal crop

## Clinic daylight
**Filename:** `public/media/ambient/clinic-daylight.mp4`  
**Placement:** Our Clinic introduction  
**Aspect:** 16:9  
**Prompt:** “Abstract ivory plaster dental architecture, an arc-shaped shadow from a high window drifting slowly across tactile cream walls, barely perceptible dust in sunbeam, warm natural daylight, no people, no signage.”  
**Motion:** extremely slow light drift, seamless 10–14 s loop  
**Fallback:** `public/scenes/intro.svg` + live illumination

## Treatment enamel
**Filename:** `public/media/ambient/treatments-enamel.mp4`  
**Placement:** Treatment index / major transition  
**Aspect:** 16:9  
**Prompt:** “Macro pearly enamel-like curved surfaces, off-white and warm champagne reflections, fine engraved curved lines, shallow depth, slow lateral camera glide, clinical but warm, no anatomical gore, no human mouth.”  
**Motion:** slow 12 s loop  
**Fallback:** `public/scenes/treatments.svg`

## Team portrait light
**Filename:** `public/media/ambient/team-light.mp4`  
**Placement:** Behind team portraits only  
**Aspect:** 16:9  
**Prompt:** “Cream portrait-studio wall, soft oval architectural cutout, slow sunlight caustic moving on wall only, elegant warm neutral palette, empty set, no person.”  
**Motion:** 14–18 s quiet loop; never animate facial content  
**Fallback:** `public/scenes/team.svg`

## Trust glow
**Filename:** `public/media/ambient/trust-glow.mp4`  
**Placement:** Dark trust/value section  
**Aspect:** 16:9  
**Prompt:** “Deep espresso matte surface with extremely soft warm tan glow travelling behind frosted layers, low contrast, premium editorial, no particles crossing centre text area.”  
**Motion:** 16 s slow pulse loop  
**Fallback:** `public/scenes/trust.svg`

## Visit arch
**Filename:** `public/media/ambient/visit-arch.mp4`  
**Placement:** Contact / map section  
**Aspect:** 16:9  
**Prompt:** “Minimal line-art smile arch emerging as sunlight traces a curved cream wall, natural shadow, warm ivory and sand, calm architectural motion, no people, no text.”  
**Motion:** 10–14 s loop  
**Fallback:** `public/scenes/visit.svg`

Encoding recommendation for all optional clips: H.264 MP4, muted, no audio track required, web-optimised fast start, conservative bitrate. Only add a clip to component configuration after the real file exists.
