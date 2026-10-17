import { useEffect, useState } from "react";

import { getRecipeService, type Recipe } from "@/services/recipe-service";

import RecipeMeta from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import UpdateRecipeForm from "@/components/features/recipe/update-recipe-form";

export function RecipeDetails({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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
        <Card className="mt-8 p-8 text-center rounded-2xl border border-rosybrown-200 bg-rosybrown-50">
          <p role="alert" className="text-sm text-rosybrown-700 font-medium">{error}</p>
        </Card>
      ) : recipe && (
        <>
          <Card className="mt-8 overflow-hidden shadow-xl shadow-brown-900/10 rounded-2xl border border-biscuit-200">
            <div className="h-64 sm:h-[440px] overflow-hidden bg-biscuit-300 relative">
              <img className="h-full w-full object-cover" src={recipe.image} alt={recipe.name} />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brown-900/90 to-transparent">
                <h1 className="text-3xl font-display font-bold tracking-tight text-cream-50 shadow-md">{recipe.name}</h1>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-8">
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
                  <Button onClick={openForm} className="px-6 py-2.5">
                    Update
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Tag key={tag} variant="olive">{tag}</Tag>
                ))}
              </div>

              <div className="pt-6 border-t border-biscuit-200">
                <h2 className="mb-4 text-lg font-display font-semibold text-brown-800">Ingredients</h2>
                <ul className="list-disc space-y-2.5 pl-6 text-sm text-brown-700 leading-relaxed">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={`${ingredient}-${index}`}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-biscuit-200">
                <h2 className="mb-4 text-lg font-display font-semibold text-brown-800">Instructions</h2>
                <ol className="list-decimal space-y-3.5 pl-6 text-sm text-brown-700 leading-relaxed">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={`${instruction}-${index}`}>{instruction}</li>
                  ))}
                </ol>
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
