<div align="center">
  <br />
  <img src="public/favicon-32x32.png" height="32">
  <br />
  <h3 align="center">recipes</h3>
  <p align="center">

A collection of my favorite recipes
<br />
    <a href="https://kookboek.robrecht.me">» View Live</a>

<br />
    <a href="https://github.com/robrechtme/recipes/issues">Report bug</a>
·
<a href="https://github.com/robrechtme/recipes/issues">Request feature</a>

  </p>
</div>

## Tech Stack
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [csv-parse](https://www.npmjs.com/package/csv-parse)
- [open-graph-scraper](https://www.npmjs.com/package/open-graph-scraper)

## How it works

1. I have a Google Sheet with URL's to recipes.
2. The server side parses the Google Sheet and visits the websites.
3. The scraper looks for [Open Graph](https://ogp.me/) data on the recipe website and sends it to the client side.
4. Tailwind makes it pretty.

## License

This repo is lincensed under [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/). See [LICENSE](/LICENSE) for more information.

## Contact

Robrecht Meersman - [@robrechtme](https://twitter.com/robrechtme) - hello@robrecht.me



