---
name: import-recipe
description: Import a recipe from a URL into the cookbook. Use whenever the user provides a recipe URL, pastes a link from a recipe site (dagelijksekost, ah.nl, jumbo.com, leukerecepten.nl, etc.), or says things like "add this recipe", "import this", "scrape this dish", "put this in my kookboek", or "voeg dit toe aan mijn kookboek". Optionally applies user changes like servings scaling, ingredient swaps, dietary adaptations (vegetarian, vegan, gluten-free), or cuisine tweaks.
argument-hint: "[recipe-url] [optional-changes]"
---

# Import Recipe Skill

Import a recipe from a URL into the cookbook at `data/{slug}/recipe.json`, download its image, and regenerate the data index. Optionally apply user-requested modifications before saving.

## Arguments

1. A recipe URL (required)
2. Optional change requests (e.g., "maak het vegetarisch", "vervang kip door tofu", "voor 2 personen")

## Steps

### 1. Scrape the recipe

Use WebFetch on the URL and ask for ALL of:

- **JSON-LD structured data** (`<script type="application/ld+json">`) — most recipe sites embed schema.org/Recipe data, and this is the cleanest source
- If no JSON-LD: recipe name, ingredients, instructions, image URL, prep/cook/total time, servings, cuisine, category, description, author — pulled from the rendered page
- The highest-resolution image URL available

Return the raw data verbatim — don't summarize, don't drop fields you think are unimportant.

**If WebFetch returns a thin shell** (no JSON-LD and almost no body text — common on SPA-based sites), fall back to the Playwright MCP to render the page first, then extract.

### 2. Check for duplicates

Before parsing, derive the slug (kebab-case Dutch name) and check whether `data/{slug}/` already exists. If it does, ask the user whether to overwrite, pick a different slug, or abort. Silently overwriting an existing recipe is almost never what the user wants.

### 3. Parse into project format

The target shape matches `src/core/types.ts`. Optional fields are truly optional — **omit them entirely when absent rather than writing `null` or `""`**, otherwise TypeScript and the build will complain.

```json
{
  "name": "Recipe Name",
  "slug": "recipe-name-in-kebab-case",
  "image": "<original image URL — the download script fetches this>",
  "source": "<the URL the user provided>",
  "description": "Short description in Dutch",
  "author": { "name": "Source site name" },
  "datePublished": "YYYY-MM-DD",
  "recipeCategory": "Hoofdgerecht",
  "recipeCuisine": "Italiaans",
  "keywords": "keyword1, keyword2, keyword3",
  "recipeYield": 4,
  "prepTime": "PT20M",
  "cookTime": "PT30M",
  "totalTime": "PT50M",
  "recipeIngredient": [
    { "name": "Bloem", "amount": 200, "unit": "g" },
    { "name": "Eieren", "amount": 3 }
  ],
  "recipeInstructions": [
    { "text": "Instruction step 1." },
    { "text": "Instruction step 2." }
  ],
  "notes": "Kip vervangen door tofu en geschaald van 4 naar 2 personen."
}
```

#### Notes (adaptations)

`notes` is an optional **single string** that records *true* adaptations vs the original source recipe — changes to what the cook actually does or eats. Omit the field entirely when there are none. It renders on the recipe page as a handwritten-style note, so write it as one friendly, display-ready Dutch sentence; combine multiple changes into that one sentence.

**Include:**
- Servings scaling ("Geschaald van 4 naar 2 personen.")
- Ingredient swaps ("Rundergehakt vervangen door linzen.")
- Dietary adaptations ("Vegetarisch gemaakt door X.")
- Format/cookware changes ("Eén grote quiche in plaats van meerdere kleine vormpjes!")

**Exclude** (these are data-quality fixes, not adaptations):
- Fixing typos, wrong units, mislabeled fields
- Renaming an ingredient for clarity
- Adding metadata (recipeCategory, times)
- Clarifying an ambiguous step

Keep it factual and readable — no reasoning ("Omdat de gebruiker vegetarisch wilde…"). When there are several changes, join them naturally into one sentence ("Zonder harissa, laurier en olijven, met selderijzout in plaats van verse selder en 3 extra paprika's.").

#### Ingredient parsing

Ingredients render in the UI as a scalable list, so they need structured fields rather than raw strings. Keep `name` **lowercase** — the UI renders the string verbatim with no normalization, and the existing corpus is lowercase.

- `"200 g bloem"` → `{ "name": "bloem", "amount": 200, "unit": "g" }`
- `"3 eieren"` → `{ "name": "eieren", "amount": 3 }`
- `"½ tl kaneel"` → `{ "name": "kaneel", "amount": 0.5, "unit": "tl" }`

#### Universal pantry items — do NOT include

Skip these even if the source recipe lists them. They're assumed pantry staples, and listing them adds noise to the scalable ingredient list:

- **peper**, **zout** (any variant: zwarte peper, grof zout, peper en zout)
- **olie**, **olijfolie**, **arachideolie**, **plantaardige olie** (any cooking oil used for greasing/bakken/fruiten)
- **water** (unless it's a measured ingredient like bouillon water or a precise risotto liquid)
- **boter** when used only for "vet de ovenschaal in" or similar greasing

If the source lists e.g. `"1 el olijfolie"` or `"Peper naar smaak"`, drop it. Leave the mentions in `recipeInstructions` as-is — instructions can still say "bak in een scheutje olijfolie" or "kruid met peper en zout".

Exception: if oil/butter is a *substantive* ingredient (e.g. 30 g boter in a bechamel roux, or 5 el olijfolie that's the bulk of a dressing), keep it.

Unicode fractions: ½ = 0.5, ⅓ = 0.33, ¼ = 0.25, ¾ = 0.75, ⅔ = 0.67.

Common Dutch units to recognize: `g`, `kg`, `ml`, `dl`, `cl`, `l`, `el` (eetlepel), `tl` (theelepel), `snufje`, `snuf`, `scheutje`, `scheut`, `bosje`, `takje`, `teen`, `teentje`, `stuk`, `plakje`, `plakjes`, `blikje`, `potje`, `bakje`, `zakje`, `handvol`.

Anything you can't confidently split — like "1 ui, fijngesnipperd" — keep the descriptor in the `name` field rather than guessing at a unit: `{ "name": "ui, fijngesnipperd", "amount": 1 }`.

Optional `note` field on an ingredient holds side-info like substitutions or origin (e.g. `{ "name": "gegrilde paprika's (bokaal)", "amount": 2, "unit": "bokaal", "note": "alternatief: 5 verse paprika's" }`). Use it sparingly — only when the source provides a meaningful alternative.

#### Time format

ISO 8601 durations: `PT30M`, `PT1H`, `PT1H30M`. Omit time fields that aren't on the source — partial data is fine, fabricated data is not.

#### Date format

`datePublished` is a date, not a datetime. JSON-LD often returns a full ISO timestamp (`2011-01-01T08:00:00+01:00`) — trim it to `YYYY-MM-DD`. If the source has no publish date, omit the field.

#### Slug

Kebab-case from the Dutch name. Keep it concise but recognizable — `kip-tikka-masala`, not `lekkere-kip-tikka-masala-volgens-jeroen`.

### 4. Apply user-requested changes

If the user asked for modifications, apply them to the parsed data *before* writing. The point is to save the recipe in its final intended form, not to record the original and patch it later.

Examples and what they touch:

- **Substitutions** ("vervang kip door tofu") — update both `recipeIngredient` and any mentions in `recipeInstructions`. Don't leave the instructions saying "bak de kip" when there's no kip in the ingredients anymore.
- **Servings scaling** ("voor 2 personen") — update `recipeYield` and scale every numeric `amount` proportionally. Watch out for ingredients without amounts ("peper naar smaak") — those don't scale.
- **Dietary adaptations** ("maak het vegetarisch") — swap proteins, update `recipeCategory`/`keywords` if appropriate, adjust instructions.
- **Cuisine/category/description tweaks** — straightforward field edits.

### 5. Save recipe.json

```bash
mkdir -p data/{slug}
```

Write the JSON pretty-printed (2-space indent) to `data/{slug}/recipe.json`.

### 6. Download image and regenerate index

The download script reads `image` from every recipe.json, fetches it, converts to WebP, and rewrites `data/index.ts`. One command does both:

```bash
pnpm run scripts:download-images
```

### 7. Verify

```bash
pnpm build
```

This catches type mismatches (missing required fields, wrong shapes) and confirms static generation succeeds for the new page at `/r/{slug}`.

### 8. Report

Summarize for the user:

- Recipe name and slug
- Ingredient count, instruction step count
- Any user-requested changes that were applied
- Any issues — missing fields the source didn't provide, image download failures, fallbacks to Playwright, ambiguous ingredients you had to interpret
