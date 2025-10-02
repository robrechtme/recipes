import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useWakeLock } from "react-screen-wake-lock";

import { getRecipe, getRecipes } from "@core/recipes";
import { Recipe } from "@core/types";
import { translateTime } from "@util/string";
import { RecipeImage } from "@components/RecipeImage/RecipeImage";

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
    onRequest: () => console.log('Screen wake lock activated'),
    onError: () => console.log('An error happened 💥'),
    onRelease: () => console.log('Screen wake lock released'),
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
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 lg:gap-8 ">
        {/* Image */}

        <RecipeImage
          slug={recipe.slug}
          className="aspect-video object-cover bg-neutral-200 mb-8 w-full rounded-lg"
        />

        {/* Intro */}
        <div className="md:mx-12">
          <h1 className="text-4xl font-extrabold mb-4 mt-2 text-pretty max-w-2xl">
            {recipe.name}
          </h1>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-start mb-6">
            {recipe.recipeCategory && (
              <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm">
                {recipe.recipeCategory}
              </span>
            )}
            {recipe.recipeCuisine && (
              <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm">
                {recipe.recipeCuisine}
              </span>
            )}
            {recipe.keywords?.split(",").map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm"
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
          {/* Time */}
          <div className="flex flex-wrap gap-6 justify-start mb-8">
            {recipe.totalTime && (
              <div className="text-sm text-neutral800">
                Totaal{" "}
                <span className="font-bold text-secondary-900">
                  {translateTime(recipe.totalTime)}
                </span>
              </div>
            )}
            {recipe.prepTime && (
              <div className="text-sm text-neutral800">
                Voorbereiding{" "}
                <span className="font-bold text-secondary-900">
                  {translateTime(recipe.prepTime)}
                </span>
              </div>
            )}
            {recipe.cookTime && (
              <div className="text-sm text-neutral800">
                Koken{" "}
                <span className="font-bold text-secondary-900">
                  {translateTime(recipe.cookTime)}
                </span>
              </div>
            )}
          </div>
          <p className=" text-lg text-gray-600 mb-6 max-w-prose text-pretty">
            {recipe.description}
          </p>
        </div>
        <aside className="">
          {/* Ingredients */}
          {recipe.recipeIngredient.length ? (
            <div className="bg-white shadow-lg shadow-primary-600 rounded-lg sticky top-8 p-8">
              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={() => adjustServings(-1)}
                  className="px-3 py-1 bg-neutral-100 rounded-full"
                >
                  -
                </button>
                <span className="px-4 py-1 tabular-nums">
                  {servings} {servings > 1 ? "personen" : "persoon"}
                </span>
                <button
                  onClick={() => adjustServings(1)}
                  className="px-3 py-1 bg-neutral-100 rounded-full"
                >
                  +
                </button>
              </div>
              <ul className="divide-y">
                {recipe.recipeIngredient.map((ingredient, index) => (
                  <li key={index} className="flex justify-between py-1 gap-4">
                    <span className="flex-1 break-all">{ingredient.name}</span>
                    {ingredient.amount !== undefined ? (
                      <span className="text-end shrink-0">
                        {(
                          (ingredient.amount / recipe.recipeYield) *
                          servings
                        ).toLocaleString("nl-BE")}{" "}
                        {ingredient.unit || ""}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        {/* Instructions */}
        {recipe.recipeInstructions.length ? (
          <div className="bg-white shadow-lg shadow-primary-600 rounded-lg px-8 py-4">
            <ol className="divide-y">
              {recipe.recipeInstructions.map((step, index) => (
                <li key={index}>
                  <button
                    onClick={() =>
                      setSelectedStep(selectedStep === index ? null : index)
                    }
                    className="flex py-8 px-4 gap-4 items-baseline text-start cursor-auto"
                  >
                    <span
                      className={`shrink-0 w-8 h-8  rounded-full flex items-center justify-center transition-colors ${
                        selectedStep === index
                          ? "bg-primary-800 text-neutral-50"
                          : "bg-neutral-100"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {step.text}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 mb-8 mt-16">
        {recipe.author?.name && (
          <p className="font-medium">Recept door {recipe.author.name}</p>
        )}
        {recipe.source && (
          <a
            href={recipe.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:underline"
          >
            {recipe.source}
          </a>
        )}
      </div>
    </main>
  );
};

export default RecipeDetail;
