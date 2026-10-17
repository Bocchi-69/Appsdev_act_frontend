import { Table } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdminRecipe } from "@/services/recipe-service";

export type { AdminRecipe } from "@/services/recipe-service";

type AdminRecipesTableProps = {
  recipes: AdminRecipe[];
  loading: boolean;
};

export function AdminRecipesTable({ recipes, loading }: AdminRecipesTableProps) {
  if (loading) {
    return (
      <Table>
        <caption className="sr-only">Recipes from all users</caption>
        <thead>
          <tr className="text-brown-600">
            <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Recipe</th>
            <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Cuisine</th>
            <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Meal type</th>
            <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Difficulty</th>
            <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Cook time</th>
            <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Owner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-biscuit-200">
          {[1, 2, 3, 4].map((i) => (
            <tr key={i} className="hover:bg-saffron-50/50 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </div>
              </td>
              <td className="px-5 py-4"><Skeleton className="h-4 w-20 rounded" /></td>
              <td className="px-5 py-4"><Skeleton className="h-4 w-24 rounded" /></td>
              <td className="px-5 py-4"><Skeleton className="h-4 w-16 rounded" /></td>
              <td className="px-5 py-4"><Skeleton className="h-4 w-16 rounded" /></td>
              <td className="px-5 py-4"><Skeleton className="h-4 w-20 rounded" /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return (
    <Table>
      <caption className="sr-only">Recipes from all users</caption>
      <thead>
        <tr className="text-brown-600">
          <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Recipe</th>
          <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Cuisine</th>
          <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Meal type</th>
          <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Difficulty</th>
          <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Cook time</th>
          <th scope="col" className="px-5 py-4 font-semibold text-brown-800 uppercase text-xs tracking-wider">Owner</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-biscuit-200">
        {!loading && recipes.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center py-8 text-brown-400">
              No recipes have been created yet.
            </td>
          </tr>
        )}
        {recipes.map(function renderRecipe(recipe) {
          return (
            <tr key={recipe.id} className="hover:bg-saffron-50/50 transition-fast group">
              <td className="px-5 py-4">
                <div className="flex min-w-48 items-center gap-3">
                  <img
                    src={recipe.image}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover border border-biscuit-300 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium text-brown-800">{recipe.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-brown-700">{recipe.cuisine}</td>
              <td className="px-5 py-4 text-brown-700">{recipe.mealType.join(", ")}</td>
              <td className="px-5 py-4">
                <Tag variant="brown">{recipe.difficulty}</Tag>
              </td>
              <td className="px-5 py-4 text-brown-700">{recipe.cookTimeMinutes} mins</td>
              <td className="px-5 py-4 text-brown-700">{recipe.ownerName || "Unnamed user"}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
