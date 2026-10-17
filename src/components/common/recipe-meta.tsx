type RecipeMetaProps = {
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
};

export default function RecipeMeta({ cuisine, mealType, difficulty, cookTimeMinutes }: RecipeMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-brown-700">
      <div>
        <dt className="text-xs text-brown-500 uppercase tracking-wider font-medium">Cuisine</dt>
        <dd className="mt-1 font-medium text-brown-800">{cuisine}</dd>
      </div>
      <div>
        <dt className="text-xs text-brown-500 uppercase tracking-wider font-medium">Meal type</dt>
        <dd className="mt-1 font-medium text-brown-800">{mealType.join(", ")}</dd>
      </div>
      <div>
        <dt className="text-xs text-brown-500 uppercase tracking-wider font-medium">Difficulty</dt>
        <dd className="mt-1 font-medium text-brown-800">{difficulty}</dd>
      </div>
      <div>
        <dt className="text-xs text-brown-500 uppercase tracking-wider font-medium">Cook time</dt>
        <dd className="mt-1 font-medium text-brown-800">{cookTimeMinutes} mins</dd>
      </div>
    </dl>
  );
}
