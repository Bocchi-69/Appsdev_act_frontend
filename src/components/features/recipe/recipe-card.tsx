import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import RecipeMeta from "@/components/common/recipe-meta";

type RecipeCardProps = {
  id: string;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  tags: string[];
  onDelete: (id: string) => void;
};

export default function RecipeCard({ id, image, name, cuisine, mealType, difficulty, cookTimeMinutes, tags, onDelete }: RecipeCardProps) {
  return (
    <Card className="recipe-card group flex h-full flex-col border-biscuit-200 hover:border-saffron-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brown-900/10" padding={false}>
      <div className="h-60 overflow-hidden relative bg-biscuit-300">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brown-900/45 to-transparent" />
        <div className="absolute top-4 right-4"><Tag variant="olive">{difficulty}</Tag></div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-xl font-display font-semibold tracking-tight text-brown-800">{name}</h3>
        </div>

        <RecipeMeta cuisine={cuisine} mealType={mealType} difficulty={difficulty} cookTimeMinutes={cookTimeMinutes} />

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Tag key={tag} variant="brown">{tag}</Tag>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-biscuit-200 grid grid-cols-2 gap-2">
          <Link to={`/recipe/${id}`}>
            <Button variant="outline" className="w-full text-sm py-2">
              View Recipe
            </Button>
          </Link>
          <Button variant="danger" className="w-full text-sm py-2" onClick={() => onDelete(id)}>Delete</Button>
        </div>
      </div>
    </Card>
  );
}
