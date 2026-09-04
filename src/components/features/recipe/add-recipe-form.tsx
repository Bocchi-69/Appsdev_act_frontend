import { useState, type SubmitEvent } from "react";
import api from "@/lib/axios";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

type Recipe = {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
  tags: string[];
};

type AddRecipeFormProps = {
  onSuccess: (newRecipe: Recipe) => void;
};

type FormErrors = {
  name?: string;
  image?: string;
  cuisine?: string;
  difficulty?: string;
  cookTimeMinutes?: string;
  mealType?: string;
  tags?: string;
  ingredients?: string;
  instructions?: string;
};

const messages: FormErrors = {
  name: "Name is required",
  image: "Image URL is required",
  cuisine: "Cuisine is required",
  difficulty: "Difficulty is required",
  cookTimeMinutes: "Cook time is required",
  mealType: "Meal type is required",
  tags: "Tags are required",
  ingredients: "Ingredients are required",
  instructions: "Instructions are required",
};

export default function AddRecipeForm({ onSuccess }: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cookTimeMinutes, setCookTimeMinutes] = useState("");
  const [mealType, setMealType] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // show error if empty, remove error if has value
  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? messages[field] : undefined,
    });
  };

  const handleAddRecipe = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = { name, image, cuisine, difficulty, cookTimeMinutes, mealType, tags, ingredients, instructions };

    const newErrors: FormErrors = {};
    let hasError = false;

    // check each required field
    for (const field in values) {
      const key = field as keyof FormErrors;

      if (values[key].trim() === "") {
        newErrors[key] = messages[key];
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError === true) {
      return;
    }

    try {
      const response = await api.post("/recipes/add", {
        name,
        image,
        cuisine,
        difficulty,
        cookTimeMinutes: Number(cookTimeMinutes),
        mealType: mealType.split("\n").filter((item) => item.trim() !== ""),
        tags: tags.split("\n").filter((item) => item.trim() !== ""),
        ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
        instructions: instructions.split("\n").filter((item) => item.trim() !== ""),
      });

      onSuccess(response.data);
      alert("Recipe added!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAddRecipe} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <Label error={errors.name}>Name</Label>
        <Input type="text" value={name} onChange={(e) => { setName(e.target.value); checkField("name", e.target.value); }} onBlur={() => checkField("name", name)} error={errors.name} />
      </div>

      <div>
        <Label error={errors.image}>Image URL</Label>
        <Input type="url" value={image} onChange={(e) => { setImage(e.target.value); checkField("image", e.target.value); }} onBlur={() => checkField("image", image)} placeholder="https://example.com/image.jpg" error={errors.image} />
      </div>

      <div>
        <Label error={errors.cuisine}>Cuisine</Label>
        <Input type="text" value={cuisine} onChange={(e) => { setCuisine(e.target.value); checkField("cuisine", e.target.value); }} onBlur={() => checkField("cuisine", cuisine)} error={errors.cuisine} />
      </div>

      <div>
        <Label error={errors.difficulty}>Difficulty</Label>
        <Input type="text" value={difficulty} onChange={(e) => { setDifficulty(e.target.value); checkField("difficulty", e.target.value); }} onBlur={() => checkField("difficulty", difficulty)} error={errors.difficulty} />
      </div>

      <div>
        <Label error={errors.cookTimeMinutes}>Cook Time (minutes)</Label>
        <Input type="number" value={cookTimeMinutes} onChange={(e) => { setCookTimeMinutes(e.target.value); checkField("cookTimeMinutes", e.target.value); }} onBlur={() => checkField("cookTimeMinutes", cookTimeMinutes)} error={errors.cookTimeMinutes} />
      </div>

      <div className="sm:col-span-2">
        <Label error={errors.mealType}>Meal Type (one per line)</Label>
        <Textarea
          value={mealType} onChange={(e) => { setMealType(e.target.value); checkField("mealType", e.target.value); }} onBlur={() => checkField("mealType", mealType)} rows={3} placeholder={"Breakfast\nLunch\nDinner"} error={errors.mealType} />
      </div>

      <div className="sm:col-span-2">
        <Label error={errors.tags}>Tags (one per line)</Label>
        <Textarea
          value={tags} onChange={(e) => { setTags(e.target.value); checkField("tags", e.target.value); }} onBlur={() => checkField("tags", tags)} rows={3} placeholder={"Italian\nPizza"} error={errors.tags} />
      </div>

      <div className="sm:col-span-2">
        <Label error={errors.ingredients}>Ingredients (one per line)</Label>
        <Textarea
          value={ingredients} onChange={(e) => { setIngredients(e.target.value); checkField("ingredients", e.target.value); }} onBlur={() => checkField("ingredients", ingredients)} rows={3} error={errors.ingredients} />
      </div>

      <div className="sm:col-span-2">
        <Label error={errors.instructions}>Instructions (one per line)</Label>
        <Textarea
          value={instructions} onChange={(e) => { setInstructions(e.target.value); checkField("instructions", e.target.value); }} onBlur={() => checkField("instructions", instructions)} rows={3} error={errors.instructions} />
      </div>

      <Button type="submit" className="w-full sm:col-span-2">
        Add Recipe
      </Button>
    </form>
  );
}
