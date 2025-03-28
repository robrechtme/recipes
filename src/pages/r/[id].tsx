import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useState } from "react";

import { getRecipes } from "@lib/recipes";
import { Recipe } from "@lib/types";

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getRecipes();
  const paths = recipes.map((_, index) => ({
    params: { id: index.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ recipe: Recipe }> = async ({
  params,
}) => {
  const recipes = await getRecipes();
  const recipe = recipes[Number(params?.id)];

  if (!recipe) {
    return { notFound: true };
  }

  return { props: { recipe } };
};

const RecipeDetail: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ recipe }) => {
  const [servings, setServings] = useState(recipe.recipeYield);

  const adjustServings = (change: number) => {
    setServings((prev) => Math.max(1, prev + change)); // Prevent servings < 1
  };

  return (
    <main className="container mx-auto my-16 px-4 text-secondary-900">
      <Head>
        <title>{recipe.name} - Tweede kookboek van Robrecht</title>
      </Head>
      <h1 className="text-center text-4xl font-extrabold mb-4">
        {recipe.name}
      </h1>
      <p className="text-center text-lg text-gray-600 mb-6">
        {recipe.description}
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Ingredients */}
        <aside className="md:w-1/3 bg-white shadow-lg shadow-primary-600 rounded-lg">
          {/* Servings Controls */}
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => adjustServings(-1)}
              className="px-3 py-1 bg-gray-200 rounded-l"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100">{servings} personen</span>
            <button
              onClick={() => adjustServings(1)}
              className="px-3 py-1 bg-gray-200 rounded-r"
            >
              +
            </button>
          </div>
          <ul className="list-disc list-inside">
            {recipe.recipeIngredient.map((ingredient, index) => (
              <li key={index}>
                {(
                  (ingredient.amount / recipe.recipeYield) *
                  servings
                ).toLocaleString("nl-BE")}{" "}
                {ingredient.unit || ""} {ingredient.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Instructions */}
        <div className="md:w-2/3 bg-white shadow-lg shadow-primary-600 rounded-lg">
          <ol className="list-decimal list-inside space-y-2">
            {recipe.recipeInstructions.map((step, index) => (
              <li key={index}>{step.text}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetail;
