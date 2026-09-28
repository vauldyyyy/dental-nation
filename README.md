# Dental Nation Clinic — Website

A multipage Next.js App Router website for **Dental Nation Clinic, Chinchinim, Goa**. It uses React + Framer Motion, structured editable content, an FPV opening film, official clinic photography, animated visual chapters, accessible interactions and a WhatsApp appointment-request flow.

## Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production:

```bash
npm run build
npm run preview
```

Static content checks:

```bash
npm run lint:content
npm run qa:static
```

## Main editing files

- `content/site.js` — business details, dentists, all 15 treatments, FAQs, article summaries, official gallery sources.
- `content/hero.js` — opening film and homepage hero image configuration.
- `content/films.js` — two homepage film placements, ready for owner-supplied clips.
- `content/treatment-media.js` — accurate treatment image descriptions.
- `components/backgrounds/SceneBackground.jsx` — living background presets.
- `app/globals.css` — tokens, layouts and responsive art direction.

## Opening film status

An owner-supplied FPV film plays full-screen before the homepage, like the Dolphin forest intro. It is a review candidate, can be skipped, and can be replayed with `/?intro`. The homepage itself opens on a real photograph of Dental Nation’s reception and continues through 15 more editorial, treatment and booking sections. See `docs/HERO-VIDEO-INTEGRATION.md`.

## Media handoff

This package includes 4 dentist portraits, 10 clinic gallery photographs and 15 treatment visuals from the clinic's public website. They were resized and compressed for web delivery. The opening FPV video and matching poster are packaged locally; two additional homepage film sections await final video clips. See `docs/ASSET-MANIFEST.json`, `docs/VIDEO-CHAPTER-BRIEF.md` and `docs/SEO-HANDOFF.md`.

## Reference engineering

Motion and lifecycle patterns were adapted after inspecting `vauldyyyy/dolphin-aquarium-enhanced` at commit:

`239d18f107b4399806433dab6bfdeb14bd38d011`

No aquarium copy, metadata, business details, reviews or media are carried into this project.
