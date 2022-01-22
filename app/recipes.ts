import scrape from "~/lib/scraper/scraper";
import { SuccessResult } from "open-graph-scraper";

export type Recipe = SuccessResult["result"];

const recipes = [
  "https://njam.tv/recepten/pasta-met-scampi-in-tomatenroomsaus/",
  "https://chloekookt.be/risotto-met-pesto-courgette-en-halloumi/",
  "https://www.libelle-lekker.be/bekijk-recept/16877/farfalle-met-haloumi/",
  "https://www.leukerecepten.nl/recepten/vegetarische-groentelasagne/",
  "https://www.lekkerensimpel.com/aardappel-ovenschotel-met-linzen-en-kikkererwten/",
  "https://chloekookt.be/parelcouscous-met-kerstomaatjes-en-halloumi/",
  "https://dagelijksekost.een.be/gerechten/pastitsio/",
  "https://www.ah.be/allerhande/recept/R-R657508/ovenpasta-met-gehakt-en-courgette/",
  "https://dagelijksekost.een.be/gerechten/lasagne-met-gegrilde-groenten/",
  "https://15gram.be/recepten/ovenschotel-met-veggie-gehakt-en-broccoli/",
  "http://lovemyfood.nl/lovemyfood.nl/ovenschotel-kip-en-italiaanse-groenten/",
  "https://www.leukerecepten.nl/recepten/zalm-spinazie-lasagne/",
  "https://www.colruyt.be/nl/lekker-koken/italiaanse-mini-croques/"
];

export async function getRecipes() {
  const data = await Promise.all(
    recipes.map(async (url) => {
      try {
        const data = await scrape(url);
        return data;
      } catch {}
    })
  );
  return data.filter((d) => d);
}
