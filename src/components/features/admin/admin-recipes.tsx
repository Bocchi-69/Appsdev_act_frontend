import { useEffect, useState } from "react";
import { getAllRecipesService } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { AdminRecipesTable, type AdminRecipe } from "./admin-recipes-table";
import { Card } from "@/components/ui/card";

export function AdminRecipes() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(function fetchRecipes() {
    let active = true;

    async function loadAllRecipes() {
      setLoading(true);
      setError("");

      try {
        const rows = await getAllRecipesService();
        if (active) {
          setRecipes(rows);
        }
      } catch {
        if (active) {
          setError("Unable to load recipes. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAllRecipes();

    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [reload]);

  function handleRefresh() {
    setReload((currentReload) => currentReload + 1);
  }

  return (
    <section aria-label="All recipes">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-brown-700">
            {loading ? "Loading recipes…" : `${recipes.length} recipes across all users`}
          </p>
        </div>
        <Button variant="secondary" disabled={loading} onClick={handleRefresh}>
          {loading ? "Refreshing…" : "Refresh"}
        </Button>
      </div>

      {error ? (
        <Card className="p-6 rounded-xl border border-rosybrown-200 bg-rosybrown-50">
          <p role="alert" className="text-sm text-rosybrown-700 font-medium">{error}</p>
        </Card>
      ) : (
        <AdminRecipesTable recipes={recipes} loading={loading} />
      )}
    </section>
  );
}
