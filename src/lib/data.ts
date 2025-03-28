import { Recipe } from "@lib/types";

export const mockRecipes: Recipe[] = [
  {
    name: "Kip Tikka Masala",
    image:
      "https://cdn.dagelijksekost.tv/recipes/q3Hq9x253fk6bAwrIgWY/landscape/1727274592377_1500x1125?GoogleAccessId=firebase-adminsdk-2hybg%40dagelijkse-kost-prod.iam.gserviceaccount.com&Expires=16725225600&Signature=g8K8OcrcdoIL7tHMABGCanOW3jdCfUaLB9q%2B0h7OJ73nuB85ih8mJy8Pf%2FOhXkzvhNG85zbLZMOJCmDDHpvg%2BhMJ%2BR74SbhZkpucI4Y8keqqGPzOr5BIddmbfH33WYwB1XVyn2%2Bn228w8yj0tU8K1P%2Fvi03hnZOCxxL%2FqARcijbkRrQ2aaFUSYD30KVnzd22Dwo0xuhSXQx2eqsRrhDufH4wAmufS2qUJxb7w5zQCXvlSHawa%2Bll6Bwz%2Bm%2FMEXjbRfywSGSslHNGJfZraY3V71sd4L%2FgCJsWGf%2FliGwegkq0sVi2g71zjN%2FFvAhfKqQEDn%2BFWi0LALpZ%2FpESKxuE%2FA%3D%3D",
    source: "https://dagelijksekost.vrt.be/gerechten/kip-tikka-masala",
    description:
      "Kip 'Tikka Masala' is een wereldberoemd Indiaas gerecht. Jeroen marineert de kip in een kruidige en romige saus op basis van yoghurt en kokosmelk. Serveer het gerecht met een portie geurige basmatirijst.",
    author: { name: "Dagelijkse kost" },
    datePublished: "2011-01-01",
    recipeCategory: "Hoofdgerecht",
    recipeCuisine: "Indiaas",
    keywords: "kip, tikka masala, Indiaas, curry",
    recipeYield: 4,
    prepTime: "PT30M",
    cookTime: "PT20M",
    totalTime: "PT50M",
    recipeIngredient: [
      { name: "Kipfilets", amount: 4 },
      { name: "Yoghurt", amount: 100, unit: "ml" },
      { name: "Kokosmelk", amount: 400, unit: "ml" },
      { name: "Tomatenstukjes", amount: 400, unit: "g" },
      { name: "Gember", amount: 40, unit: "g" },
      { name: "Rode uien", amount: 2 },
      { name: "Chilipeper", amount: 1 },
      { name: "Lookteentjes", amount: 3 },
      { name: "Limoen", amount: 1 },
      { name: "Koriander", amount: 0.5, unit: "bosje" },
      { name: "Kurkumapoeder", amount: 0.5, unit: "el" },
      { name: "Garam masala", amount: 0.5, unit: "el" },
      { name: "Tandoori-pasta", amount: 1, unit: "el" },
      { name: "Currypoeder", amount: 1, unit: "el" },
      { name: "Amandelschilfers", amount: 4, unit: "el" },
      { name: "Arachideolie", amount: 2, unit: "scheutjes" },
      { name: "Peper", amount: 1, unit: "snufje" },
      { name: "Zout", amount: 1, unit: "snufje" },
      { name: "Basmatirijst", amount: 200, unit: "g" },
    ],
    recipeInstructions: [
      {
        text: "Snijd de kipfilets in brede repen en doe ze in een ruime mengschaal.",
      },
      {
        text: "Voeg de yoghurt, garam masala, tandoori-pasta, currypoeder, kurkumapoeder, limoenzeste en het sap van een halve limoen toe. Meng alles goed en laat de kip marineren.",
      },
      {
        text: "Pel de lookteentjes, snipper de chilipeper en schil de gember. Mix deze samen met de koriandersteeltjes fijn in een blender.",
      },
      {
        text: "Rooster de amandelschilfers in een hete pan tot ze lichtbruin zijn. Zet opzij.",
      },
      {
        text: "Verhit een scheutje arachideolie in de pan. Haal de kip uit de marinade en bak de stukken kort aan beide zijden. Haal de kip uit de pan en zet opzij.",
      },
      {
        text: "Pel en snipper de rode uien fijn. Stoof ze aan in dezelfde pan met een extra scheutje arachideolie.",
      },
      {
        text: "Voeg het gemixte kruidenmengsel toe aan de uien en roer goed door.",
      },
      {
        text: "Schenk de tomatenstukjes en de kokosmelk in de pan. Roer tot een egale saus.",
      },
      {
        text: "Voeg de gebakken kip toe aan de saus en laat het geheel nog 20 minuten zachtjes sudderen.",
      },
      {
        text: "Kook ondertussen de basmatirijst volgens de aanwijzingen op de verpakking.",
      },
      {
        text: "Serveer de kip tikka masala met de basmatirijst en werk af met de geroosterde amandelschilfers en verse korianderblaadjes.",
      },
    ],
  },
  {
    name: "Risotto met pesto, courgette en halloumi",
    image: "https://chloekookt.be/wp-content/uploads/2020/08/5.jpg",
    source: "https://chloekookt.be/risotto-met-pesto-courgette-en-halloumi/",
    description:
      "Een smaakvolle risotto gecombineerd met groene pesto, gebakken courgette en krokant gebakken halloumi, afgewerkt met verse basilicum.",
    author: { name: "Chloé Kookt" },
    datePublished: "2019-08-15",
    recipeCategory: "Hoofdgerecht",
    recipeCuisine: "Italiaans",
    keywords: "risotto, pesto, courgette, halloumi, vegetarisch",
    recipeYield: 2,
    prepTime: "PT10M",
    cookTime: "PT20M",
    totalTime: "PT30M",
    recipeIngredient: [
      { name: "Risottorijst", amount: 125, unit: "g" },
      { name: "Bouillonblokje", amount: 1 },
      { name: "Halloumi", amount: 150, unit: "g" },
      { name: "Courgette", amount: 1 },
      { name: "Ui", amount: 1 },
      { name: "Lookteentjes", amount: 2 },
      { name: "Pesto", amount: 1.5, unit: "el" },
      { name: "Parmezaanse kaas", amount: 30, unit: "g" },
      { name: "Heet water", amount: 500, unit: "ml" },
      { name: "Olijfolie", amount: 2, unit: "el" },
      { name: "Peper", amount: 1, unit: "snufje" },
      { name: "Zout", amount: 1, unit: "snufje" },
      { name: "Basilicum", amount: 1, unit: "handvol" },
    ],
    recipeInstructions: [
      { text: "Verhit een pot op het vuur en voeg een scheut olijfolie toe." },
      {
        text: "Stoof de fijngehakte look samen met de risottorijst tot de rijst glazig wordt.",
      },
      {
        text: "Voeg beetje bij beetje heet water toe en los het bouillonblokje erin op. Blijf roeren en voeg water toe tot de rijst gaar is (ongeveer 15-20 minuten).",
      },
      {
        text: "Snijd de courgette en ui in stukjes en bak ze in een beetje olijfolie. Kruid met peper en zout.",
      },
      {
        text: "Meng de helft van de gebakken groenten onder de risotto; bewaar de rest voor de garnering.",
      },
      {
        text: "Roer de pesto en Parmezaanse kaas door de risotto en breng op smaak met peper en zout.",
      },
      {
        text: "Snijd de halloumi in plakjes en bak ze zonder vetstof tot ze een krokant korstje hebben.",
      },
      {
        text: "Serveer de risotto met de overgebleven groenten, de gebakken halloumi en werk af met verse basilicum.",
      },
    ],
  },
];
