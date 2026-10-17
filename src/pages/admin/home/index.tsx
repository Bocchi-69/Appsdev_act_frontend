import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import { getAllRecipesService } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { AdminRecipesTable, type AdminRecipe } from "@/components/features/admin/admin-recipes-table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/common/page-header";

export function AdminRecipes() {
  const { user, logout } = useAuth();
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

  async function handleLogout() {
    try {
      await logout();
      window.location.href = "/auth/login";
    } catch {
      // handled by auth provider
    }
  }

  const totalRecipes = recipes.length;
  const uniqueOwners = new Set(recipes.map((r) => r.userId)).size;
  const avgCookTime =
    recipes.length > 0
      ? Math.round(recipes.reduce((sum, r) => sum + r.cookTimeMinutes, 0) / recipes.length)
      : 0;

  return (
    <Section>
      <PageHeader
        eyebrow="Recipe Book · Administration"
        title="All recipes"
        description="Browse recipes across every account."
        className="mb-10 sm:mb-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <Badge variant="brown" className="px-3 py-1.5">
              ADMIN
            </Badge>
            <span className="text-sm font-medium text-cream-50/90">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing…" : "Refresh"}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatCard title="Total recipes" value={totalRecipes} icon="📖" variant="saffron" />
        <StatCard title="Unique owners" value={uniqueOwners} icon="👥" variant="olive" />
        <StatCard title="Avg cook time" value={`${avgCookTime} mins`} icon="⏱️" variant="rosybrown" />
      </div>

      {error ? (
        <Card variant="elevated" className="max-w-2xl mx-auto p-8 text-center">
          <p role="alert" className="text-sm text-rosybrown-700 font-medium">{error}</p>
          <Button variant="outline" mt-6 className="mx-auto" onClick={handleRefresh} disabled={loading}>
            Try again
          </Button>
        </Card>
      ) : (
        <AdminRecipesTable recipes={recipes} loading={loading} />
      )}
    </Section>
  );
}

function StatCard({
  title,
  value,
  icon,
  variant,
}: {
  title: string;
  value: number | string;
  icon: string;
  variant: "saffron" | "olive" | "rosybrown";
}) {
  const bg =
    variant === "saffron"
      ? "bg-saffron-50 border-saffron-200 text-saffron-700"
      : variant === "olive"
        ? "bg-olive-50 border-olive-200 text-olive-700"
        : "bg-rosybrown-50 border-rosybrown-200 text-rosybrown-700";

  return (
    <div className={cn("rounded-2xl border p-6 shadow-soft transition-fast hover:shadow-medium", bg)}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="ml-auto text-xs font-medium uppercase tracking-wider opacity-70">{title}</span>
      </div>
      <div className="text-3xl font-display font-bold text-brown-800">{value}</div>
    </div>
  );
}
