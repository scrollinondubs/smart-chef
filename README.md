# Smart Chef

Smart Chef turns a photo of your fridge into ready-to-cook meal ideas. Add what's on hand - either by uploading a photo or typing it in - and Smart Chef ranks recipes by how many of your ingredients they use, always surfacing at least one recipe you can make right now when one exists.

## Features

- **Ingredient recognition** - upload a fridge photo and Smart Chef proposes a starting ingredient list (see [Mock ingredient recognition](#mock-ingredient-recognition) below).
- **Manual ingredient management** - add, edit, and remove ingredients with quantities and units.
- **Meal suggestions** - 2-3 ranked recipe matches with a match percentage and missing-ingredient callouts.
- **Dietary filters** - vegetarian, vegan, gluten-free, dairy-free, and nut-free.
- **Servings adjustment** - scale any recipe's ingredient list up or down.

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Database**: libSQL (Turso-compatible), local file-based for development
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui-style primitives
- **Tests**: Vitest

## Quick Start

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone <your-repo-url>
cd smart-chef
npm install
```

### Database setup

No account or credentials are required. Smart Chef defaults to a local libSQL file (`local.db` in the project root) unless you set `DATABASE_URL` / `DATABASE_AUTH_TOKEN` to point at a hosted Turso database instead (see `.env.example`).

```bash
npm run db:push   # creates local.db and applies the schema
npm run db:seed   # loads the starter recipe catalog
```

### Development

```bash
npm run dev
```

Visit http://localhost:3000.

### Tests

```bash
npm test
```

## Mock ingredient recognition

There's no third-party vision API wired up, so the app runs entirely offline with no external credentials. `lib/ingredients/recognize.ts` exposes a single `recognizeIngredients(image)` function that currently returns a deterministic mock ingredient list. Swap its implementation for a real provider (Google Cloud Vision, AWS Rekognition, etc.) later without touching any of its callers. Regardless of what recognition returns, users can always add, edit, or remove ingredients by hand.

## Project Structure

- `app/` - routes, pages, and API route handlers (App Router)
- `components/` - UI components (`components/ui/` holds shared primitives)
- `lib/db/` - Drizzle schema and libSQL client
- `lib/ingredients/` - ingredient recognition
- `lib/mealSuggestions/` - the recipe matching algorithm
- `lib/recipes/` - seed recipe data and dietary tag definitions
- `lib/utils/` - shared helpers (servings scaling, class name merging)
- `scripts/seed.ts` - populates the local database with starter recipes

## Documentation

- [Product Requirements](./confabulator/PRD.md)
- [Project Vision](./confabulator/project-vision.md)
- [Implementation Plan](./confabulator/implementation-plan.md)
- [Business Model Canvas](./confabulator/business-model-canvas.md)
- [PR-FAQ](./confabulator/PR-FAQ.md)

---

*Generated with [Confabulator](https://vibecodelisboa.com/confabulator)*
