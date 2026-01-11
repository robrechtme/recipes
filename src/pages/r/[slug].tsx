import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useWakeLock } from "react-screen-wake-lock";

import { RecipeImage } from "@components/RecipeImage";
import { getRecipe, getRecipes } from "@core/recipes";
import { Recipe } from "@core/types";
import { translateTime } from "@util/string";

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getRecipes();
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ recipe: Recipe }> = async ({
  params,
}) => {
  const recipe = await getRecipe(params?.slug as string);

  if (!recipe) {
    return { notFound: true };
  }

  return { props: { recipe } };
};

const RecipeDetail: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ recipe }) => {
  const [servings, setServings] = useState(recipe.recipeYield);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Prevent screen from going dark while viewing recipe
  const { isSupported, released, request, release } = useWakeLock({
    onRequest: () => console.log("Screen wake lock activated"),
    onError: () => console.log("An error happened 💥"),
    onRelease: () => console.log("Screen wake lock released"),
  });

  // Request wake lock when component mounts
  useEffect(() => {
    if (isSupported) {
      request();
    }

    // Release wake lock when component unmounts
    return () => {
      if (!released) {
        release();
      }
    };
  }, [isSupported, request, release, released]);

  const adjustServings = (change: number) => {
    setServings((prev) => Math.max(1, prev + change)); // Prevent servings < 1
  };

  return (
    <main className="container mx-auto my-16 text-secondary-900">
      <Head>
        <title>{`${recipe.name} - Tweede kookboek van Robrecht`}</title>
        <meta
          name="description"
          content={
            recipe.description ||
            `Recept voor ${recipe.name} met ingrediënten en stap-voor-stap instructies.`
          }
        />
        <meta property="og:title" content={recipe.name} />
        <meta
          property="og:description"
          content={
            recipe.description ||
            `Recept voor ${recipe.name} met ingrediënten en stap-voor-stap instructies.`
          }
        />
        <meta property="og:type" content="article" />
        {recipe.recipeCuisine && (
          <meta
            name="keywords"
            content={`${recipe.recipeCuisine}, recept, koken, ${
              recipe.keywords || ""
            }`}
          />
        )}
      </Head>

      <article className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 lg:gap-8">
        <figure className="mb-8 md:mb-0">
          <RecipeImage
            slug={recipe.slug}
            className="aspect-video object-cover bg-neutral-200 w-full rounded-lg"
          />
        </figure>

        <header className="md:mx-12">
          <h1 className="text-4xl font-extrabold mb-4 mt-2 text-pretty max-w-2xl">
            {recipe.name}
          </h1>

          <div
            className="flex flex-wrap gap-2 justify-start mb-6"
            role="list"
            aria-label="Categorieën en tags"
          >
            {recipe.recipeCategory && (
              <span
                className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm"
                role="listitem"
              >
                {recipe.recipeCategory}
              </span>
            )}
            {recipe.recipeCuisine && (
              <span
                className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm"
                role="listitem"
              >
                {recipe.recipeCuisine}
              </span>
            )}
            {recipe.keywords?.split(",").map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm"
                role="listitem"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>

          <dl className="flex flex-wrap gap-6 justify-start mb-8">
            {recipe.totalTime && (
              <div className="text-sm text-neutral800">
                <dt className="inline">Totaal </dt>
                <dd className="inline font-bold text-secondary-900">
                  <time dateTime={recipe.totalTime}>
                    {translateTime(recipe.totalTime)}
                  </time>
                </dd>
              </div>
            )}
            {recipe.prepTime && (
              <div className="text-sm text-neutral800">
                <dt className="inline">Voorbereiding </dt>
                <dd className="inline font-bold text-secondary-900">
                  <time dateTime={recipe.prepTime}>
                    {translateTime(recipe.prepTime)}
                  </time>
                </dd>
              </div>
            )}
            {recipe.cookTime && (
              <div className="text-sm text-neutral800">
                <dt className="inline">Koken </dt>
                <dd className="inline font-bold text-secondary-900">
                  <time dateTime={recipe.cookTime}>
                    {translateTime(recipe.cookTime)}
                  </time>
                </dd>
              </div>
            )}
          </dl>

          <p className="text-lg text-gray-600 mb-6 max-w-prose text-pretty">
            {recipe.description}
          </p>
        </header>
        <aside>
          {recipe.recipeIngredient.length ? (
            <section className="bg-white shadow-lg shadow-primary-600 rounded-lg sticky top-8 p-8">
              <h2 className="sr-only">Ingrediënten</h2>
              <div
                className="flex items-center justify-center mb-6"
                role="group"
                aria-label="Aantal personen aanpassen"
              >
                <button
                  onClick={() => adjustServings(-1)}
                  className="px-3 py-1 bg-neutral-100 rounded-full"
                  aria-label="Verlaag aantal personen"
                >
                  -
                </button>
                <output className="px-4 py-1 tabular-nums" aria-live="polite">
                  {servings} {servings > 1 ? "personen" : "persoon"}
                </output>
                <button
                  onClick={() => adjustServings(1)}
                  className="px-3 py-1 bg-neutral-100 rounded-full"
                  aria-label="Verhoog aantal personen"
                >
                  +
                </button>
              </div>
              <ul
                className="divide-y"
                role="list"
                aria-label="Ingrediënten lijst"
              >
                {recipe.recipeIngredient.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-1 gap-4"
                    role="listitem"
                  >
                    <span className="flex-1 break-all">{ingredient.name}</span>
                    {ingredient.amount !== undefined ? (
                      <data
                        className="text-end shrink-0"
                        value={ingredient.amount}
                      >
                        {(
                          (ingredient.amount / recipe.recipeYield) *
                          servings
                        ).toLocaleString("nl-BE")}{" "}
                        {ingredient.unit || ""}
                      </data>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>

        <section className="bg-white shadow-lg shadow-primary-600 rounded-lg px-8 py-4">
          <h2 className="sr-only">Bereidingswijze</h2>
          {recipe.recipeInstructions.length ? (
            <ol className="divide-y" role="list" aria-label="Bereidingsstappen">
              {recipe.recipeInstructions.map((step, index) => (
                <li key={index} role="listitem">
                  <button
                    onClick={() =>
                      setSelectedStep(selectedStep === index ? null : index)
                    }
                    className="flex py-8 px-4 gap-4 items-baseline text-start cursor-auto w-full"
                    aria-expanded={selectedStep === index}
                    aria-label={`Stap ${index + 1}: ${step.text.substring(
                      0,
                      50
                    )}...`}
                  >
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        selectedStep === index
                          ? "bg-primary-800 text-neutral-50"
                          : "bg-neutral-100"
                      }`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="text-left">{step.text}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : null}
        </section>
      </article>

      <footer className="text-center text-sm text-gray-600 mb-8 mt-16">
        {recipe.author?.name && (
          <p className="font-medium">
            Recept door <cite>{recipe.author.name}</cite>
          </p>
        )}
        {recipe.source && (
          <p>
            <a
              href={recipe.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:underline"
            >
              Bron: {recipe.source}
            </a>
          </p>
        )}
      </footer>
    </main>
  );
};

export default RecipeDetail;
