import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import { deleteRecipeService, getRecipesService, type Recipe } from "@/services/recipe-service";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RecipeCard from "@/components/features/recipe/recipe-card";
import AddRecipeForm from "@/components/features/recipe/add-recipe-form";
import { Navigate } from "react-router";

export function RecipeCollection({ search = "" }: { search?: string }) {
  const { user, ready } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(function fetchRecipes() {
    if (!ready || !user) {
      return;
    }

    let active = true;

    async function loadRecipes() {
      try {
        const result = await getRecipesService();
        if (active) {
          setRecipes(result);
          setError("");
        }
      } catch {
        if (active) {
          setError("Unable to load recipes. Please try again.");
        }
      }
    }

    loadRecipes();

    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [ready, user]);

  async function handleDelete(id: string) {
    if (!confirm("Do you want to delete this recipe?")) return;
    try {
      await deleteRecipeService(id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    } catch {
      setError("Unable to delete this recipe. Please try again.");
    }
  }

  if (!ready) return null;

  if (!user) return <Navigate to="/auth/login" replace />;

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleCreated(newRecipe: Recipe) {
    setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
    closeForm();
  }

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    [recipe.name, recipe.cuisine, ...recipe.mealType, ...recipe.tags]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedSearch),
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-semibold tracking-tight text-brown-800">Your recipes</h2>
          <p className="mt-1 text-sm text-brown-500/70">
            {filteredRecipes.length} {normalizedSearch ? "matching " : "saved "}{filteredRecipes.length === 1 ? "recipe" : "recipes"} to inspire your next meal
          </p>
        </div>
        <Button onClick={openForm}>Add Recipe</Button>
      </div>
      {error && <p role="alert" className="mb-6 text-sm text-rosybrown-600 font-medium">{error}</p>}
      {recipes.length === 0 ? (
        <Card className="rounded-2xl border border-dashed border-biscuit-400 bg-cream-100 p-12 text-center sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 mb-4">
            <svg className="h-8 w-8 text-saffron-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v1m-6 0a1 1 0 001-1v1a1 1 0 011 1m6 0a1 1 0 011-1v1a1 1 0 011 1m20 0a1 1 0 001-1v1a1 1 0 011 1m-6.883-8.374a1 1 0 00-.587-1.011c-1.608-.715-4.789-.715-6.396 0a1 1 0 00-.587 1.011c.202.09.431.234.587.508.282.487.785 1.23.565 1.87l-1.172 3.292c-.152.428-.585.78-1.041.852-.917.144-1.726-.31-1.958-1.208L13.23 15.49c-.232-.9-.527-1.402-.85-1.847-.323-.445-.383-.81-.363-1.166z" />
            </svg>
          </div>
          <h3 className="text-xl font-display font-semibold text-brown-800">A fresh page for your favorites</h3>
          <p className="mt-2 text-sm text-brown-500/70">Save a family classic or something new you want to try.</p>
          <Button className="mt-6" onClick={openForm}>Add your first recipe</Button>
        </Card>
      ) : filteredRecipes.length === 0 ? (
        <Card className="rounded-3xl border border-biscuit-200 bg-white/60 p-10 text-center sm:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-700">No matches yet</p>
          <h3 className="mt-3 text-2xl font-display font-semibold text-brown-800">Try another ingredient or cuisine</h3>
          <p className="mt-2 text-sm text-brown-600">Search by recipe name, cuisine, meal type, or tag.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal open={open} onClose={closeForm} title="Add Recipe">
        <AddRecipeForm onSuccess={handleCreated} />
      </Modal>
    </>
  );
}
