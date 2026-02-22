import { Recipe } from '@core/types';

// Import all recipe data
import aardappelOvenschotelMetLinzenEnKikkererwtenRecipe from './aardappel-ovenschotel-met-linzen-en-kikkererwten/recipe.json';
import chiliSinCarneRecipe from './chili-sin-carne/recipe.json';
import creamyPastaMetKerstomatensausEnRicottaRecipe from './creamy-pasta-met-kerstomatensaus-en-ricotta/recipe.json';
import gnocchiInRomigeTomatensausRecipe from './gnocchi-in-romige-tomatensaus/recipe.json';
import gnocchiMetBloemkoolEnPaprikasausUitDeOvenRecipe from './gnocchi-met-bloemkool-en-paprikasaus-uit-de-oven/recipe.json';
import griekseMoussakaRecipe from './griekse-moussaka/recipe.json';
import kipTikkaMasalaRecipe from './kip-tikka-masala/recipe.json';
import lasagneMetGegrildeGroentenRecipe from './lasagne-met-gegrilde-groenten/recipe.json';
import orzoMetCourgetteTomaatEnSpinazieRecipe from './orzo-met-courgette-tomaat-en-spinazie/recipe.json';
import ovenschotelMetKipEnItaliaanseGroentenRecipe from './ovenschotel-met-kip-en-italiaanse-groenten/recipe.json';
import ovenschotelMetVeggieGehaktEnBroccoliRecipe from './ovenschotel-met-veggie-gehakt-en-broccoli/recipe.json';
import parelcouscousMetKerstomaatjesEnHalloumiRecipe from './parelcouscous-met-kerstomaatjes-en-halloumi/recipe.json';
import pastaMetScampiInTomatenroomsausRecipe from './pasta-met-scampi-in-tomatenroomsaus/recipe.json';
import pastagratinMetBoontjesEnBroccolisausRecipe from './pastagratin-met-boontjes-en-broccolisaus/recipe.json';
import pastitsioRecipe from './pastitsio/recipe.json';
import quicheMetPreiZalmEnGeitenkaasRecipe from './quiche-met-prei-zalm-en-geitenkaas/recipe.json';
import risottoMetPestoCourgetteEnHalloumiRecipe from './risotto-met-pesto-courgette-en-halloumi/recipe.json';
import zalmSpinazieLasagneRecipe from './zalm-spinazie-lasagne/recipe.json';

// Import all recipe images
import aardappelOvenschotelMetLinzenEnKikkererwtenImage from './aardappel-ovenschotel-met-linzen-en-kikkererwten/image.webp';
import chiliSinCarneImage from './chili-sin-carne/image.webp';
import creamyPastaMetKerstomatensausEnRicottaImage from './creamy-pasta-met-kerstomatensaus-en-ricotta/image.webp';
import gnocchiInRomigeTomatensausImage from './gnocchi-in-romige-tomatensaus/image.webp';
import gnocchiMetBloemkoolEnPaprikasausUitDeOvenImage from './gnocchi-met-bloemkool-en-paprikasaus-uit-de-oven/image.webp';
import griekseMoussakaImage from './griekse-moussaka/image.webp';
import kipTikkaMasalaImage from './kip-tikka-masala/image.webp';
import lasagneMetGegrildeGroentenImage from './lasagne-met-gegrilde-groenten/image.webp';
import orzoMetCourgetteTomaatEnSpinazieImage from './orzo-met-courgette-tomaat-en-spinazie/image.webp';
import ovenschotelMetKipEnItaliaanseGroentenImage from './ovenschotel-met-kip-en-italiaanse-groenten/image.webp';
import ovenschotelMetVeggieGehaktEnBroccoliImage from './ovenschotel-met-veggie-gehakt-en-broccoli/image.webp';
import parelcouscousMetKerstomaatjesEnHalloumiImage from './parelcouscous-met-kerstomaatjes-en-halloumi/image.webp';
import pastaMetScampiInTomatenroomsausImage from './pasta-met-scampi-in-tomatenroomsaus/image.webp';
import pastagratinMetBoontjesEnBroccolisausImage from './pastagratin-met-boontjes-en-broccolisaus/image.webp';
import pastitsioImage from './pastitsio/image.webp';
import quicheMetPreiZalmEnGeitenkaasImage from './quiche-met-prei-zalm-en-geitenkaas/image.webp';
import risottoMetPestoCourgetteEnHalloumiImage from './risotto-met-pesto-courgette-en-halloumi/image.webp';
import zalmSpinazieLasagneImage from './zalm-spinazie-lasagne/image.webp';

// Export recipes array
export const recipes: Recipe[] = [
  aardappelOvenschotelMetLinzenEnKikkererwtenRecipe as Recipe,
  chiliSinCarneRecipe as Recipe,
  creamyPastaMetKerstomatensausEnRicottaRecipe as Recipe,
  gnocchiInRomigeTomatensausRecipe as Recipe,
  gnocchiMetBloemkoolEnPaprikasausUitDeOvenRecipe as Recipe,
  griekseMoussakaRecipe as Recipe,
  kipTikkaMasalaRecipe as Recipe,
  lasagneMetGegrildeGroentenRecipe as Recipe,
  orzoMetCourgetteTomaatEnSpinazieRecipe as Recipe,
  ovenschotelMetKipEnItaliaanseGroentenRecipe as Recipe,
  ovenschotelMetVeggieGehaktEnBroccoliRecipe as Recipe,
  parelcouscousMetKerstomaatjesEnHalloumiRecipe as Recipe,
  pastaMetScampiInTomatenroomsausRecipe as Recipe,
  pastagratinMetBoontjesEnBroccolisausRecipe as Recipe,
  pastitsioRecipe as Recipe,
  quicheMetPreiZalmEnGeitenkaasRecipe as Recipe,
  risottoMetPestoCourgetteEnHalloumiRecipe as Recipe,
  zalmSpinazieLasagneRecipe as Recipe,
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

// Export images object using recipe slugs as keys
export const images = {
  'aardappel-ovenschotel-met-linzen-en-kikkererwten': aardappelOvenschotelMetLinzenEnKikkererwtenImage,
  'chili-sin-carne': chiliSinCarneImage,
  'creamy-pasta-met-kerstomatensaus-en-ricotta': creamyPastaMetKerstomatensausEnRicottaImage,
  'gnocchi-in-romige-tomatensaus': gnocchiInRomigeTomatensausImage,
  'gnocchi-met-bloemkool-en-paprikasaus-uit-de-oven': gnocchiMetBloemkoolEnPaprikasausUitDeOvenImage,
  'griekse-moussaka': griekseMoussakaImage,
  'kip-tikka-masala': kipTikkaMasalaImage,
  'lasagne-met-gegrilde-groenten': lasagneMetGegrildeGroentenImage,
  'orzo-met-courgette-tomaat-en-spinazie': orzoMetCourgetteTomaatEnSpinazieImage,
  'ovenschotel-met-kip-en-italiaanse-groenten': ovenschotelMetKipEnItaliaanseGroentenImage,
  'ovenschotel-met-veggie-gehakt-en-broccoli': ovenschotelMetVeggieGehaktEnBroccoliImage,
  'parelcouscous-met-kerstomaatjes-en-halloumi': parelcouscousMetKerstomaatjesEnHalloumiImage,
  'pasta-met-scampi-in-tomatenroomsaus': pastaMetScampiInTomatenroomsausImage,
  'pastagratin-met-boontjes-en-broccolisaus': pastagratinMetBoontjesEnBroccolisausImage,
  'pastitsio': pastitsioImage,
  'quiche-met-prei-zalm-en-geitenkaas': quicheMetPreiZalmEnGeitenkaasImage,
  'risotto-met-pesto-courgette-en-halloumi': risottoMetPestoCourgetteEnHalloumiImage,
  'zalm-spinazie-lasagne': zalmSpinazieLasagneImage,
} as const;