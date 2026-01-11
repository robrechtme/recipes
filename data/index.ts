import aardappelOvenschotelMetLinzenEnKikkererwtenImage from './aardappel-ovenschotel-met-linzen-en-kikkererwten/image.webp';
import aardappelOvenschotelMetLinzenEnKikkererwtenRecipe from './aardappel-ovenschotel-met-linzen-en-kikkererwten/recipe.json';
import chiliSinCarneImage from './chili-sin-carne/image.webp';
import chiliSinCarneRecipe from './chili-sin-carne/recipe.json';
import creamyPastaMetKerstomatensausEnRicottaImage from './creamy-pasta-met-kerstomatensaus-en-ricotta/image.webp';
import creamyPastaMetKerstomatensausEnRicottaRecipe from './creamy-pasta-met-kerstomatensaus-en-ricotta/recipe.json';
import gnocchiInRomigeTomatensausImage from './gnocchi-in-romige-tomatensaus/image.webp';
import gnocchiInRomigeTomatensausRecipe from './gnocchi-in-romige-tomatensaus/recipe.json';
import gnocchiMetBloemkoolEnPaprikasausUitDeOvenImage from './gnocchi-met-bloemkool-en-paprikasaus-uit-de-oven/image.webp';
import gnocchiMetBloemkoolEnPaprikasausUitDeOvenRecipe from './gnocchi-met-bloemkool-en-paprikasaus-uit-de-oven/recipe.json';
import griekseMoussakaImage from './griekse-moussaka/image.webp';
import griekseMoussakaRecipe from './griekse-moussaka/recipe.json';
import kipTikkaMasalaImage from './kip-tikka-masala/image.webp';
import kipTikkaMasalaRecipe from './kip-tikka-masala/recipe.json';
import lasagneMetGegrildeGroentenImage from './lasagne-met-gegrilde-groenten/image.webp';
import lasagneMetGegrildeGroentenRecipe from './lasagne-met-gegrilde-groenten/recipe.json';
import ovenschotelMetKipEnItaliaanseGroentenImage from './ovenschotel-met-kip-en-italiaanse-groenten/image.webp';
import ovenschotelMetKipEnItaliaanseGroentenRecipe from './ovenschotel-met-kip-en-italiaanse-groenten/recipe.json';
import ovenschotelMetVeggieGehaktEnBroccoliImage from './ovenschotel-met-veggie-gehakt-en-broccoli/image.webp';
import ovenschotelMetVeggieGehaktEnBroccoliRecipe from './ovenschotel-met-veggie-gehakt-en-broccoli/recipe.json';
import parelcouscousMetKerstomaatjesEnHalloumiImage from './parelcouscous-met-kerstomaatjes-en-halloumi/image.webp';
import parelcouscousMetKerstomaatjesEnHalloumiRecipe from './parelcouscous-met-kerstomaatjes-en-halloumi/recipe.json';
import pastaMetScampiInTomatenroomsausImage from './pasta-met-scampi-in-tomatenroomsaus/image.webp';
import pastaMetScampiInTomatenroomsausRecipe from './pasta-met-scampi-in-tomatenroomsaus/recipe.json';
import pastagratinMetBoontjesEnBroccolisausImage from './pastagratin-met-boontjes-en-broccolisaus/image.webp';
import pastagratinMetBoontjesEnBroccolisausRecipe from './pastagratin-met-boontjes-en-broccolisaus/recipe.json';
import pastitsioImage from './pastitsio/image.webp';
import pastitsioRecipe from './pastitsio/recipe.json';
import quicheMetPreiZalmEnGeitenkaasImage from './quiche-met-prei-zalm-en-geitenkaas/image.webp';
import quicheMetPreiZalmEnGeitenkaasRecipe from './quiche-met-prei-zalm-en-geitenkaas/recipe.json';
import risottoMetPestoCourgetteEnHalloumiImage from './risotto-met-pesto-courgette-en-halloumi/image.webp';
import risottoMetPestoCourgetteEnHalloumiRecipe from './risotto-met-pesto-courgette-en-halloumi/recipe.json';
import zalmSpinazieLasagneImage from './zalm-spinazie-lasagne/image.webp';
import zalmSpinazieLasagneRecipe from './zalm-spinazie-lasagne/recipe.json';

import { Recipe } from '@core/types';

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