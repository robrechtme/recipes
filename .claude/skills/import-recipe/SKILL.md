---
name: import-recipe
description: Import a recipe from a URL into the cookbook. Optionally apply user-requested changes.
argument-hint: "[recipe-url] [optional-changes]"
---

# Import Recipe Skill

Import a recipe from a URL into the cookbook. Optionally apply user-requested changes.

## Arguments

The user provides:
1. A recipe URL (required)
2. Optional change requests (e.g., "maak het vegetarisch", "vervang kip door tofu", "voor 2 personen")

## Steps

### 1. Scrape the recipe

Use WebFetch to fetch the recipe URL. In your prompt, ask to extract ALL of the following:

- **JSON-LD structured data** (`<script type="application/ld+json">`) — most recipe sites embed schema.org/Recipe data
- If no JSON-LD: extract recipe name, ingredients list, cooking instructions, image URL, prep/cook/total time, number of servings, cuisine type, category, description, and author from the page content
- The recipe image URL (highest resolution available)

Return ALL raw data — do not summarize or omit fields.

### 2. Parse into project format

Map the scraped data to this exact JSON structure (matching `src/core/types.ts`):

```json
{
  "name": "Recipe Name",
  "slug": "recipe-name-in-kebab-case",
  "image": "<original image URL for downloading>",
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
  ]
}
```

#### Ingredient parsing rules

Ingredients must be split into structured objects with `name`, `amount` (optional number), and `unit` (optional string):

- `"200 g bloem"` → `{ "name": "Bloem", "amount": 200, "unit": "g" }`
- `"3 eieren"` → `{ "name": "Eieren", "amount": 3 }`
- `"1 el olijfolie"` → `{ "name": "Olijfolie", "amount": 1, "unit": "el" }`
- `"½ tl zout"` → `{ "name": "Zout", "amount": 0.5, "unit": "tl" }`
- `"Peper naar smaak"` → `{ "name": "Peper" }` (omit amount and unit entirely)
- Unicode fractions: ½ = 0.5, ⅓ = 0.33, ¼ = 0.25, ¾ = 0.75, ⅔ = 0.67
- Capitalize ingredient names (first letter uppercase)
- Common Dutch units to recognize: `g`, `kg`, `ml`, `dl`, `cl`, `l`, `el` (eetlepel), `tl` (theelepel), `snufje`, `snuf`, `scheutje`, `scheut`, `bosje`, `takje`, `teen`, `teentje`, `stuk`, `plakje`, `plakjes`, `blikje`, `potje`, `bakje`, `zakje`, `handvol`
- Omit `amount` and `unit` fields entirely when they don't apply — do NOT include `null` values

#### Time format

ISO 8601 duration format: `PT30M` (30 min), `PT1H` (1 hour), `PT1H30M` (1h30m). Omit time fields that aren't available.

#### Slug generation

Generate a kebab-case slug from the Dutch recipe name. Keep it concise but descriptive.

### 3. Apply user-requested changes (if any)

If the user requested modifications, apply them to the parsed recipe data before saving. Examples:
- Swap or remove ingredients (update both ingredients list and instructions)
- Adjust `recipeYield` and scale all ingredient amounts proportionally
- Change cuisine, category, or description
- Modify instruction steps

### 4. Save recipe.json

1. Create the recipe directory: `mkdir -p data/{slug}`
2. Write the recipe JSON to `data/{slug}/recipe.json` (pretty-printed, 2-space indent)

### 5. Download image and regenerate index

Run the existing script which handles both image downloading (from the `image` URL in recipe.json) and `data/index.ts` regeneration:

```bash
pnpm run scripts:download-images
```

### 6. Verify

Run `pnpm build` to verify everything compiles correctly.

### 7. Report

Show the user a summary:
- Recipe name and slug
- Number of ingredients and instruction steps
- Any changes that were applied
- Any issues encountered (missing fields, image problems, etc.)
