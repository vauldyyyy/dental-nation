# Setup and deployment

## Requirements

- Node.js 20+ (Node 22 is fine)
- npm 10+
- A normal internet connection for the first `npm install`

## Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production

```bash
npm run build
npm run preview
```

The production domain is controlled by `NEXT_PUBLIC_SITE_URL`. The default remains `https://www.dentalnationclinic.com` so canonical metadata is correct for production. For a preview deployment, set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-preview-domain.example
```

No database, CMS, payment account or secret API key is required.

## Deployment notes

The app uses standard Next.js App Router routes and native browser scrolling. Deep links work when deployed to a normal Next.js host. `next.config.mjs` includes redirects from the old Wix Services, Contact, Blog and three preserved article URLs.

## Validation commands

```bash
npm run lint:content
npm run qa:static
npm run build
```

The first two are dependency-free data/file checks. The production build requires installed npm dependencies.

## Reference commit

Engineering patterns were inspected from `vauldyyyy/dolphin-aquarium-enhanced` at `239d18f107b4399806433dab6bfdeb14bd38d011` before implementation.

## Official photography

This reviewed package already includes the official public portraits and gallery images in the local paths that `SourceImage` checks first. `npm run fetch:official-assets` is a recovery command if those files are lost; rerunning it replaces the optimized copies with the larger source files.
