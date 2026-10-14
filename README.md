# The Estate Sale Ladies

A responsive website for The Estate Sale Ladies, built with React, TypeScript and Vite. The project includes a consultation-focused home page, service and process information, FAQs, and static detail pages for upcoming sales.

## Requirements

Node.js 20+ and npm.

## Run locally

```bash
npm install
npm run dev
```

## Build the static site

```bash
npm run generate
npm run preview
```

The generator creates the home page and one static page for each sale listed in `src/data/upcomingSales.json`. The current entries are fictional previews for presentation; they are labeled as samples on the site. Replace them with confirmed event information before publishing. The output is written to `dist/` and can be hosted by any static site provider.

## Add an upcoming sale

Replace the sample entries in `src/data/upcomingSales.json` with confirmed sales using this shape:

```json
[
  {
    "slug": "west-island-estate-sale",
    "title": "West Island Estate Sale",
    "date": "Date to be announced",
    "location": "West Island, Montréal",
    "coverTone": "blush",
    "summary": "A short description of the sale.",
    "summary": "A short description of the sale.",
    "images": ["/images/west-island-sale-1.jpg"],
    "featuredItems": ["Featured item"]
  }
]
```

Place approved sale photos in `public/images/`. The sale is then available at `/sales/west-island-estate-sale/` after running the generator. Publish listings only after dates, location details, photos and featured items are confirmed.

## Main files

- `src/App.tsx` contains the page sections, navigation and sale detail layout.
- `src/data/sales.ts` defines the sale data type and reads the JSON listing.
- `src/data/upcomingSales.json` contains upcoming sale listings.
- `src/styles/` contains the design tokens, global styles and responsive layout.
- `scripts/generate.mjs` prerenders the home page and each sale detail page.
- `src/assets/images/` contains the brand and site imagery.

The heading typography uses Playfair Display and the body typography uses Lora. Bodoni FLF is included as the brand display face when available on the viewer's system, with classic serif fallbacks.
