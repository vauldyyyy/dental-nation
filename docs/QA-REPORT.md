# QA report — Dental Nation Website

## Reviewed animated build

The supplied animated redesign was rebuilt on 28 September 2026 with `npm run build`, `npm run qa:static`, and `npm run lint:content` passing. Browser checks confirmed three featured treatment cards, all remaining treatments in the horizontal rail, working treatment-card navigation, automatic rail movement, and Pause Motion behavior. The review corrected pointer capture stealing card clicks, preserved subpixel movement during auto-scroll, paused the rail during arrow interaction, and removed a decorative route overlay from the real map.

**QA date:** 28 September 2026  
**Reference clinic source:** current Dental Nation website supplied in the brief  
**Engineering reference:** `vauldyyyy/dolphin-aquarium-enhanced` commit `239d18f107b4399806433dab6bfdeb14bd38d011`

## Reviewed handoff verification

On a networked Windows machine, the archive was extracted and `npm install --ignore-scripts --no-audit --no-fund`, `npm run lint:content`, `npm run qa:static`, and `npm run build` completed successfully. The production build generated 31 routes. The homepage and full-screen opening film were reviewed in the browser at desktop and mobile widths; the 15 treatment links and official clinic photography appeared. The owner-supplied FPV clip is integrated as the opening sequence.

The 4 official dentist portraits and 10 official gallery photographs were fetched from the clinic's public Wix media URLs and packaged locally. Their combined size was reduced from 116.8 MB to 2.6 MB while preserving useful web dimensions. The notes below document the earlier archive-generation environment; its dependency and media network blocks no longer apply to this reviewed package.

## What actually ran

### 1. Content / data integrity — PASS

Command:

```bash
npm run lint:content
```

Equivalent script was run directly because dependencies are not required.

Verified:

- exactly **15** treatment records and unique slugs;
- exactly **4** current dentist records;
- exactly **3** preserved source-grounded article records;
- practical FAQ content exists;
- WhatsApp destination is `919270552454`;
- timezone is `Asia/Kolkata`.

### 2. Static project QA — PASS

Command:

```bash
npm run qa:static
```

Verified:

- required App Router page/system files are present;
- all 15 treatment illustrations are present;
- every related-treatment slug resolves to a real treatment;
- local relative imports resolve to a source file;
- no empty `href="#"` placeholders in app/components;
- configured hero video exists when enabled;
- hero poster exists;
- 10 clinic gallery source records exist;
- past preferred dates are rejected;
- Sunday preferred dates are rejected;
- Monday 10:00 IST returns open;
- Monday 14:00 IST returns lunch closure;
- Monday 17:00 IST returns open;
- Sunday returns closed;
- prepared WhatsApp URL starts with the correct `wa.me/919270552454` destination and decodes the selected treatment/date/period correctly.

No WhatsApp message was sent.

### 3. JavaScript / JSX syntax parse — PASS

Every `.js`, `.jsx` and `.mjs` source file was parsed through the locally available TypeScript parser in JSX-preserve mode. No syntax errors were reported.

### 4. Browser-rendered visual acceptance captures — PASS for the captured preview surfaces

The sandbox blocks Chromium navigation to `localhost` and `file://`, so Playwright used `page.set_content()` with the **project's actual final CSS and locally packaged visual assets inlined**. This still uses real Chromium layout/rendering, but it is not the Next.js server runtime.

Captured/checked:

| Surface | Viewport | Horizontal overflow | Browser page errors |
|---|---:|---|---|
| Home | 1440×1000 | none | none |
| Home | 390×844 | none | none |
| Treatments | 768×1024 | none | none |
| Contact | 390×844 | none | none |

Captures are in `docs/screenshots/`; raw results are in `docs/preview-checks.json`.

### 5. Production dependency install / build — PASSED ON REVIEWED HANDOFF MACHINE

`npm install --package-lock-only --ignore-scripts` was attempted and timed out because the execution container cannot resolve the public npm registry. A direct registry check produced:

```text
npm error code EAI_AGAIN
npm error syscall getaddrinfo
npm error request to https://registry.npmjs.org/-/ping failed
```

`npm run build` was then attempted and correctly failed with:

```text
sh: 1: next: not found
```

That was an environment/dependency-availability failure during the first generation. The reviewed handoff machine subsequently installed dependencies and completed `npm run build` successfully.

The reviewed package includes the lockfile after a successful `npm install`.

## Interaction checks: implementation status vs. runtime status

Implemented in source:

- animated desktop/mobile navigation;
- Escape close + mobile-menu focus trap;
- route focus reset and entrance/exit transitions;
- treatment category layout transitions;
- accessible FAQ accordions;
- keyboard gallery lightbox (Escape, arrows, Tab containment, focus restore);
- live/pause-aware hero media controls;
- manual global Pause Motion control;
- reduced-motion fallbacks;
- appointment validation and WhatsApp message preparation;
- mobile Call / WhatsApp / Directions bar;
- offscreen/hidden-tab Canvas pause and hero-video pause.

The production build and browser home page were verified on the reviewed handoff machine. The entire interaction matrix has not yet been tested end-to-end; the earlier static checks and booking/open-hours/WhatsApp logic checks still apply.

## Official photography packaging limitation

The official website exposed the clinic logo, four dentist portraits and ten gallery image source URLs. The sandbox could inspect the official pages/URLs but could not resolve `static.wixstatic.com` to download the binaries. Instagram media was not accessible in this environment either.

In the first generation, therefore:

- the implementation tries approved **local official file paths first**;
- if those are not present, it tries the clinic's official public Wix image URLs;
- if the network source is unavailable, it falls back to packaged abstract SVG art that does **not** impersonate staff or clinic photography;
- `npm run fetch:official-assets` was then used on the reviewed handoff machine to download the official public logo/portraits/gallery into those local preferred paths;
- `docs/ASSET-MANIFEST.json` records every source and fallback.

The official photographs and portraits are packaged locally; the external Wix URLs remain as fallbacks.

## Opening film

An owner-supplied Veo FPV clip is included as a full-screen opening review candidate. The packaged `dental-fpv-poster.webp` matches its opening frame; reduced-motion visitors may choose to play or skip it. The homepage hero uses official reception photography. See `HERO-VIDEO-INTEGRATION.md`.

## Remaining checks before launch

1. Review the site at ~768 and 1440 px, including keyboard/menu/lightbox/form behavior.
2. Review the included FPV cut and replace it if a later version is preferred.
3. Confirm business copy, doctors, opening hours and contact details with the clinic before publishing.

## 28 September 2026 cinematic homepage pass

The homepage was subsequently redesigned with section-specific scroll choreography and richer editorial layouts while retaining the opening FPV experience, both film chapters, the full treatment/team/content data, metadata and WhatsApp booking flow.

Current-pass verification in this sandbox:

- `node scripts/syntax-check.cjs` — **PASS**
- `node scripts/check-content.mjs` — **PASS** (15 treatments, 4 dentists, 3 articles, 6 FAQs)
- `node scripts/qa-static.mjs` — **PASS**
- PostCSS parse of `app/globals.css` — **PASS**
- Chromium static layout render using the final CSS/assets at **1440×1000** and **390×844** — **PASS**, no horizontal document overflow and no page/console errors in the static render
- A mobile journey layout issue found during the 390 px review was corrected and re-rendered successfully.

A fresh `npm run build` completed successfully in the final review environment and generated 31 routes. `npm run qa:static` and `npm run lint:content` also passed.

## Visible motion follow-up

The earlier decorative loops were too faint to register during ordinary scrolling. The manifesto, clinic image, pathway imagery, treatment cards, film chapters, team portraits, gallery, FAQ, smile story and Goa sections now have more legible motion, all governed by the Pause Motion control and reduced-motion preference. The visit journey now keeps its changing scene visible beside the current step on desktop and above it on mobile. Browser review confirmed that the manifesto orbit and clinic image move over time, and that the mobile scene and caption track the visible step while scrolling. The preview was left with motion running.

## Layout and motion refinement

Removed decorative section/card numbering, the manifesto divider, the clinic photo caption, and the line across the film chapter imagery. The three pathway cards now have equal dimensions and direct links to a relevant treatment filter or the appointment page. The home gallery is a complete three-by-two grid at desktop widths and remains complete at mobile widths. The empty map arch was replaced with a local clinic photograph and directions link. Ambient background particles and light now travel on shorter, more visible loops even when the visitor is not scrolling; the Pause Motion control continues to stop these effects. Browser checks confirmed aligned pathway cards, working treatment category links, complete gallery rows, the clinic location image, no mobile horizontal overflow, and motion running.

## Patient review wall

Added a Dolphin-inspired patient voices section after the clinic trust/gallery sequence: two rows of pinned cards move in opposite directions over an animated background. Hover, keyboard focus, the global Pause Motion control and reduced-motion settings pause or disable the movement. The header and footer link to the section.

The ten named cards are **editorial summaries, not verbatim quotes**, of public feedback on [Dental Nation Clinic's Google Maps listing](https://www.google.com/maps/place/Dental+Nation+Clinic+-+by+Dr.+Natasha+Lopez/@15.2047691,73.977089,17z/data=!4m18!1m9!3m8!1s0x3bbfb3199f576511:0xc23f63953ef6ff32!2sDental+Nation+Clinic+-+by+Dr.+Natasha+Lopez!8m2!3d15.2047691!4d73.977089!9m1!1b1!16s%2Fg%2F11xdw6ttrf!3m7!1s0x3bbfb3199f576511:0xc23f63953ef6ff32!8m2!3d15.2047691!4d73.977089!9m1!1b1!16s%2Fg%2F11xdw6ttrf). The listing showed 5.0 from 32 reviews when checked on 28 September 2026. Card and section links lead back to the source; rating and count are a dated snapshot and should be refreshed before launch.

`npm run qa:static`, `npm run lint:content` and `npm run build` passed after this change. Browser review confirmed 20 rendered cards (ten originals plus ten presentation-only loop duplicates), correct source links, opposing running CSS animations, and no document overflow at the default narrow preview or at 1440 px. The desktop review layout was inspected visually in the live production preview.

## Starting-point quiz

Added a four-question guide on the homepage and Treatments page, following the Dolphin companion quiz's open → progress → result → WhatsApp pattern. The guide suggests everyday, smile, alignment, restorative, family or assessment as a **starting point**, without making a diagnosis or claiming a treatment is suitable before an examination. The result links to the relevant treatment area and prepares a WhatsApp conversation; the visitor must choose to open and send it. Back, retake, Escape, focus trapping and reduced-motion/pause settings are supported.

For a pain, sensitivity or injury answer, the guide always points to an assessment and offers a direct clinic call. Its short emergency note is consistent with [ADA dental-emergency guidance](https://www.mouthhealthy.org/dental-care/dental-emergencies) and [NHS urgent-care guidance](https://www.nhs.uk/nhs-services/dentists/how-to-find-an-nhs-dentist-in-an-emergency/); the clinic should review this public-facing wording before launch.

`npm run qa:static`, `npm run lint:content` and `npm run build` passed. Browser review covered all four steps, a routine result, the concern/assessment result, encoded WhatsApp links, keyboard focus after each transition, retake, Escape close with focus restoration, and a 390 px mobile layout with no horizontal document overflow.
