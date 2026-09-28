# Design and motion system

## Visual tokens

- Cream `#F8F3EC`
- Ivory `#FFFCF7`
- Sand `#E6D2BA`
- Warm tan `#B48B6B`
- Espresso `#30251F`
- Muted warm gray `#74665B`

Display type uses a restrained editorial serif stack; body type uses a high-legibility system sans stack. No font binaries are bundled.

## Background architecture

`components/backgrounds/SceneBackground.jsx` is the shared scene system. A preset combines:

1. **plate** — `/public/scenes/<preset>.svg`, absolute at the lowest decorative layer;
2. **illumination** — a blurred Framer Motion layer with preset focal point and cycle duration;
3. **canvas** — low-density procedural warm/dark particles and glow (`AmbientCanvas`);
4. **grain** — a fixed low-opacity SVG noise texture;
5. **content** — always above decorations with pointer interaction unaffected.

All decorative layers use `pointer-events: none`.

### Presets

| Preset | Use | Cycle | Character | Mobile |
|---|---|---:|---|---|
| hero | other page headers | ~19 s | strongest moving illumination | reduced drift |
| intro | clinic story | ~24 s | warm daylight / arc shadow | reduced drift |
| treatments | service exploration | ~22 s | enamel curves | same plate, lower visual weight |
| journey | patient flow | ~26 s | smile-line architecture | no large connecting overlay |
| team | portraits | ~28 s | soft highlights around frames | faces/images themselves never warped |
| gallery | clinic imagery | ~23 s | layered depth | simplified grid |
| trust | dark value statement | ~25 s | low-contrast tan glow | same, low density |
| read | FAQ/article surfaces | ~32 s | stable light-edge sweep | very quiet |
| visit | map/contact | ~22 s | arch / sunlight motif | tall composition |
| footer | footer | ~34 s | slow espresso illumination | quiet |

## Motion tokens

Primary easing follows the inspected Dolphin pattern: `[0.22, 0.61, 0.36, 1]` / `cubic-bezier(.22,.61,.36,1)`.

Section reveals are generally 0.65–0.75 s. Background cycles are intentionally much slower so UI and decoration do not compete.

## Lifecycle / performance

`AmbientCanvas`:

- caps redraw around 30 FPS;
- limits DPR (1 on smaller screens, 1.5 desktop);
- reduces particle density on mobile;
- pauses with IntersectionObserver when offscreen;
- pauses when the tab is hidden;
- cleans up `requestAnimationFrame`, ResizeObserver, IntersectionObserver and visibility listeners.

`OpeningExperience` plays the muted owner-supplied clip before the homepage on every direct load, with Skip and autoplay-blocked fallback controls. The actual homepage hero uses official clinic photography. `FilmChapter` provides two dedicated film placements with still-image fallback and offscreen resource management.

## Continuous motion

`MotionProvider` keeps the site's decorative motion running on all devices. Framer Motion uses `MotionConfig reducedMotion="never"`. The global pause button and saved pause state have been removed. Offscreen canvas and video work can still stop when invisible to conserve device resources, then resumes when visible.

Information, links, forms, accordions and gallery controls do not depend on animation.

## Z-order

- `-2`: scene media/backplates
- scene internal: plate → light → Canvas → grain
- `2`: `.wrap` content
- `80`: mobile action bar
- `85–90`: navigation / mobile menu
- `120`: gallery lightbox
- `9999`: keyboard skip link when focused
