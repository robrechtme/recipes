import { RecipeImage } from "@components/RecipeImage";
import { getRecipe, getRecipes } from "@core/recipes";
import type { Recipe } from "@core/types";
import { translateTime } from "@util/string";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useWakeLock } from "react-screen-wake-lock";

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getRecipes();
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ recipe: Recipe }> = async ({ params }) => {
  const recipe = await getRecipe(params?.slug as string);

  if (!recipe) {
    return { notFound: true };
  }

  return { props: { recipe } };
};

const ArrowLeftIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 12H5m0 0l6 6m-6-6l6-6"
    />
  </svg>
);

const RecipeDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ recipe }) => {
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

  const tags = [recipe.recipeCategory, recipe.recipeCuisine, ...(recipe.keywords?.split(",") ?? [])]
    .map((tag) => tag?.trim())
    .filter((tag): tag is string => Boolean(tag));

  const times = [
    { label: "Totaal", time: recipe.totalTime },
    { label: "Voorbereiding", time: recipe.prepTime },
    { label: "Koken", time: recipe.cookTime },
  ].filter((entry): entry is { label: string; time: string } => Boolean(entry.time));

  return (
    <main className="mx-auto max-w-[1080px] px-7 pt-8 pb-24 text-ink">
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
            content={`${recipe.recipeCuisine}, recept, koken, ${recipe.keywords || ""}`}
          />
        )}
      </Head>

      <a
        href="/"
        className="mb-7 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Alle recepten
      </a>

      {/* Hero */}
      <div className="mb-12 grid grid-cols-1 items-start gap-10 md:grid-cols-[0.92fr_1.08fr]">
        <figure className="relative m-0">
          <RecipeImage
            slug={recipe.slug}
            className="aspect-[4/3] w-full rounded-2xl bg-photo object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </figure>

        <div>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-pretty md:text-4xl">
            {recipe.name}
          </h1>

          {recipe.author?.name && (
            <p className="mt-5 text-[15px] text-muted">
              via{" "}
              {recipe.source ? (
                <a
                  href={recipe.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  {recipe.author.name}
                </a>
              ) : (
                <span className="font-semibold text-accent">{recipe.author.name}</span>
              )}
            </p>
          )}

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Categorieën en tags">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-accent-tint px-3 py-1 text-[13px] font-medium text-accent-dark"
                  role="listitem"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {times.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-4">
              {times.map((entry) => (
                <div key={entry.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {entry.label}
                  </dt>
                  <dd className="mt-0.5 text-xl font-bold">
                    <time dateTime={entry.time}>{translateTime(entry.time)}</time>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {recipe.description && (
            <p className="mt-5 max-w-prose text-sm italic text-[#5f574c] text-pretty">
              {recipe.description}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.82fr_1.18fr]">
        {recipe.recipeIngredient.length ? (
          <aside className="md:sticky md:top-6">
            <section className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="text-xl font-bold">Ingrediënten</h2>
              <div
                className="my-4 flex items-center justify-between rounded-full bg-bg p-1.5"
                role="group"
                aria-label="Aantal personen aanpassen"
              >
                <button
                  onClick={() => adjustServings(-1)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Verlaag aantal personen"
                  disabled={servings <= 1}
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <output className="px-4 font-medium tabular-nums" aria-live="polite">
                  {servings} {servings > 1 ? "personen" : "persoon"}
                </output>
                <button
                  onClick={() => adjustServings(1)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label="Verhoog aantal personen"
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d="M9 3v12M3 9h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <ul aria-label="Ingrediënten lijst">
                {recipe.recipeIngredient.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-3 border-b border-line py-2.5 text-[15px] last:border-b-0"
                  >
                    <span className="flex-1">
                      {ingredient.name}
                      {ingredient.note && (
                        <span className="block text-[13px] text-muted">{ingredient.note}</span>
                      )}
                    </span>
                    {ingredient.amount !== undefined ? (
                      <data
                        className="shrink-0 text-end font-semibold text-accent-dark"
                        value={ingredient.amount}
                      >
                        {((ingredient.amount / recipe.recipeYield) * servings).toLocaleString(
                          "nl-BE",
                        )}{" "}
                        {ingredient.unit || ""}
                      </data>
                    ) : null}
                  </li>
                ))}
              </ul>

              {recipe.notes ? (
                <p className="mt-5 -rotate-2 font-handwritten text-[21px] leading-tight text-accent">
                  {recipe.notes}
                </p>
              ) : null}
            </section>
          </aside>
        ) : null}

        <section>
          <h2 className="mb-2 text-xl font-bold">Bereiding</h2>
          {recipe.recipeInstructions.length ? (
            <ol aria-label="Bereidingsstappen">
              {recipe.recipeInstructions.map((step, index) => (
                <li key={index} className="border-b border-line last:border-b-0">
                  <button
                    onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                    className="flex w-full cursor-pointer items-start gap-4 py-5 text-start"
                    aria-expanded={selectedStep === index}
                    aria-label={`Stap ${index + 1}: ${step.text.substring(0, 50)}...`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold transition-colors ${
                        selectedStep === index
                          ? "bg-accent text-white"
                          : "bg-accent-tint text-accent"
                      }`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="mt-1 text-base">{step.text}</span>
                  </button>
                </li>
              ))}
            </ol>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default RecipeDetail;
