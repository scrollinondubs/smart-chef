export interface PantryItem {
  name: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: number;
  name: string;
  instructions: string;
  prepTimeMinutes: number;
  baseServings: number;
  dietaryTags: string[];
  ingredients: RecipeIngredient[];
}

export interface MealMatch {
  recipe: Recipe;
  matchPercentage: number;
  missingIngredients: RecipeIngredient[];
  requiresAdditionalIngredients: boolean;
}

export interface MatchOptions {
  dietaryTags?: string[];
  limit?: number;
}

export function matchRecipes(
  pantry: PantryItem[],
  recipes: Recipe[],
  options: MatchOptions = {}
): MealMatch[] {
  const { dietaryTags = [], limit = 3 } = options;
  const pantryNames = new Set(pantry.map((item) => normalize(item.name)));

  const eligibleRecipes = dietaryTags.length
    ? recipes.filter((recipe) => dietaryTags.every((tag) => recipe.dietaryTags.includes(tag)))
    : recipes;

  const matches = eligibleRecipes.map((recipe) => {
    const missingIngredients = recipe.ingredients.filter(
      (ingredient) => !pantryNames.has(normalize(ingredient.name))
    );
    const matchedCount = recipe.ingredients.length - missingIngredients.length;
    const matchPercentage =
      recipe.ingredients.length === 0
        ? 100
        : Math.round((matchedCount / recipe.ingredients.length) * 100);

    return {
      recipe,
      matchPercentage,
      missingIngredients,
      requiresAdditionalIngredients: missingIngredients.length > 0,
    };
  });

  // A 100%-match recipe always sorts first, so "at least one suggestion
  // requires no additional ingredients" is satisfied automatically whenever
  // the eligible set contains one - no special-casing needed.
  matches.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) return b.matchPercentage - a.matchPercentage;
    return a.recipe.prepTimeMinutes - b.recipe.prepTimeMinutes;
  });

  return matches.slice(0, limit);
}

function normalize(name: string) {
  return name.trim().toLowerCase();
}
