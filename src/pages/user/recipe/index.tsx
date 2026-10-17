import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getRecipeService, type Recipe } from "@/services/recipe-service";

import RecipeMeta from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UpdateRecipeForm from "@/components/features/recipe/update-recipe-form";

export function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;

    async function loadRecipe(recipeId: string) {
      try {
        const result = await getRecipeService(recipeId);
        if (active) {
          setRecipe(result);
        }
      } catch {
        if (active) {
          setError("Recipe not found, or you do not have access to it.");
        }
      }
    }

    loadRecipe(id);

    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [id]);

  if (!id) return null;

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleUpdated(updatedRecipe: Recipe) {
    setRecipe(updatedRecipe);
    closeForm();
  }

  return (
    <>
      {error ? (
        <Card variant="elevated" className="mt-8 p-8 sm:p-12 text-center max-w-md mx-auto">
          <p role="alert" className="text-sm text-rosybrown-700 font-medium">{error}</p>
          <div className="mt-6 flex justify-center">
            <Button variant="outline">
              <Link to="/user">Back to recipes</Link>
            </Button>
          </div>
        </Card>
      ) : recipe && (
        <>
          <Card variant="elevated" className="mt-8 overflow-hidden shadow-large">
            <div className="relative h-[420px] sm:h-[520px] overflow-hidden bg-biscuit-300">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-full w-full object-cover transition-fast group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/85 via-brown-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 pb-12 sm:pb-16">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="cream" className="px-3 py-1 text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-cream-50 shadow-md">
                  {recipe.name}
                </h1>
                <p className="mt-2 text-sm text-cream-50/90 max-w-xl">
                  {recipe.cuisine} cuisine • {recipe.mealType.join(", ")} • {recipe.difficulty}
                </p>
              </div>
              <div className="absolute top-4 right-4">
                <Button
                  onClick={openForm}
                  className="recipe-edit-button rounded-full border border-white/30 bg-saffron-700 px-5 py-2.5 text-sm font-semibold text-white shadow-large hover:-translate-y-0.5 hover:bg-saffron-800 focus-visible:outline-white"
                >
                  <svg className="mr-2 inline-block h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="m15.5 5.5 3 3M4 20l4.2-.8L19 8.4a2.1 2.1 0 0 0-3-3L5.2 16.2 4 20Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Update recipe
                </Button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1">
                  <RecipeMeta
                    cuisine={recipe.cuisine}
                    mealType={recipe.mealType}
                    difficulty={recipe.difficulty}
                    cookTimeMinutes={recipe.cookTimeMinutes}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Link to="/user" className="inline-flex items-center gap-2 text-sm font-medium text-brown-600 hover:text-brown-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to recipes
                  </Link>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Card variant="default" className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-display font-semibold text-brown-800">
                    <span className="text-saffron-700">🛒</span> Ingredients
                  </h2>
                  <ul className="space-y-3 text-sm text-brown-700 leading-relaxed">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={`${ingredient}-${index}`} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold">
                          {index + 1}
                        </span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="default" className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-display font-semibold text-brown-800">
                    <span className="text-olive-700">👨‍🍳</span> Instructions
                  </h2>
                  <ol className="space-y-4 text-sm text-brown-700 leading-relaxed">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={`${instruction}-${index}`} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-olive-100 text-olive-800 text-xs font-bold">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            </div>
          </Card>

          <Modal open={open} onClose={closeForm} title="Update Recipe">
            <UpdateRecipeForm recipe={recipe} onSuccess={handleUpdated} />
          </Modal>
        </>
      )}
    </>
  );
}
