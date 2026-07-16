# Recipes

Personal Dutch-language cookbook. Recipes live in `data/{slug}/recipe.json` with a matching photo at `data/{slug}/image.webp`; `data/index.ts` is generated, never edit it by hand.

## Recipe images

- Canonical format: `data/{slug}/image.webp`, exactly **1536x1024 (3:2), WebP**. The UI crops to 16:9 on cards and 4:3 on the detail page, so keep the dish near the center of the frame — edges are lost in both crops.
- `pnpm run scripts:download-images` downloads missing images from each recipe's `image` URL, normalizes every image to 1536x1024 (cover-crop with attention positioning), and regenerates `data/index.ts`. It is idempotent; run it after adding or replacing any image, then verify the auto-crop didn't cut off the dish.
- When generating an image with AI, request 1536x1024 natively (or at least 3:2) so nothing meaningful is lost to cropping. The Trellis API (`/imagine`) currently returns 1408x768 regardless of the requested ratio; that's fine, but keep the dish centered since normalizing crops ~18% of the width.

### Style rules for generated images

Photorealistic food photography; the finished dish is the sole subject. No text, watermarks, or logos. No hands or people. Angle, crockery, backdrop, and lighting are free to vary per dish — images should feel related, not identical.
