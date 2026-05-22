# Kairo

Kairo is a Next.js application for browsing curated internship listings. It provides a student-facing interface with search, filters, sorting, pagination, loading states, empty states, and retry handling for listing fetch failures.

## Technology

- Next.js 15 with the App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React and Heroicons for interface icons
- Sonner for toast notifications

## Application Scope

- `/` renders the primary internship browsing experience with the Kairo topbar, hero section, listing filters, listing cards, pagination, and footer.
- `/internship-listings` renders an alternate listings page that includes mobile filters, sorting, and local bookmark persistence.
- `src/app/landing/LandingPage.tsx` contains a standalone landing page component that is not currently wired as the root route.
- `src/app/not-found.tsx` provides the custom 404 experience.

## Data Flow

Internship data is loaded from the Google Apps Script endpoint declared in `src/lib/internshipListings.ts`.

The data layer:

- normalizes incoming API records into the `Internship` type defined in `src/lib/internshipData.ts`;
- supports multiple possible API field names for title, company, location, stipend, skills, dates, and application links;
- normalizes locations, categories, work types, statuses, skills, and stipend ranges;
- deduplicates records by application URL or by role/company/location/duration;
- excludes listings whose application deadline has expired;
- sorts listings by posted date or deadline, depending on the page implementation.

`src/lib/internshipData.ts` also contains fallback mock listings and shared filter option metadata.

## Project Structure

```text
src/
  app/
    layout.tsx                         Root layout and metadata
    page.tsx                           Primary Kairo listings page
    not-found.tsx                      Custom not-found route
    landing/LandingPage.tsx            Standalone landing page component
    internship-listings/               Alternate listings route
  components/
    Topbar.tsx                         Kairo navigation bar
    listings/                          Primary listings components
    ui/                                Shared UI primitives
  lib/
    internshipData.ts                  Internship types, mock data, filter metadata
    internshipListings.ts              API fetching, normalization, filtering helpers
  styles/
    tailwind.css                       Global Tailwind styles and CSS variables
    index.css                          Tailwind stylesheet import
public/
  assets/images/                       Logo and fallback image assets
```

## Configuration

- `next.config.mjs` enables production browser source maps, configures the build output directory, and registers allowed remote image hosts.
- `image-hosts.config.mjs` contains the remote image host allowlist.
- `tailwind.config.js` defines the project theme, Kairo/Newton color tokens, fonts, animation utilities, and content paths.
- `tsconfig.json` enables strict TypeScript checking and the `@/*` source alias.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:4028`.

## Scripts

```bash
npm run dev         # Start the Next.js development server on port 4028
npm run build       # Build the application for production
npm run start       # Start the development server on port 4028
npm run serve       # Start the production server
npm run lint        # Run Next.js linting
npm run lint:fix    # Run linting with automatic fixes
npm run format      # Format source files with Prettier
npm run type-check  # Run TypeScript without emitting files
```

## Operational Notes

- The application depends on the external listings endpoint in `src/lib/internshipListings.ts`.
- Listing links open in a new browser tab using the normalized `applyUrl` value.
- The root listings page paginates results at 12 listings per page.
- The alternate `/internship-listings` route stores bookmarked listing IDs in browser local storage under `kairo:bookmarked-internships`.
- Production builds currently ignore TypeScript and ESLint build errors through `next.config.mjs`; run `npm run type-check` and `npm run lint` explicitly before release.
