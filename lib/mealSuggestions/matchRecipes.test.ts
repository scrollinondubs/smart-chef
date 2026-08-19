import { describe, expect, it } from "vitest";
import { matchRecipes, type Recipe } from "./matchRecipes";

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Tomato Omelette",
    instructions: "Whisk eggs, add tomatoes, cook.",
    prepTimeMinutes: 10,
    baseServings: 2,
    dietaryTags: ["vegetarian", "gluten-free"],
    ingredients: [
      { name: "Eggs", quantity: 3, unit: "unit" },
      { name: "Tomatoes", quantity: 2, unit: "unit" },
    ],
  },
  {
    id: 2,
    name: "Vegan Buddha Bowl",
    instructions: "Combine grains and vegetables.",
    prepTimeMinutes: 20,
    baseServings: 1,
    dietaryTags: ["vegan", "vegetarian", "dairy-free"],
    ingredients: [
      { name: "Rice", quantity: 1, unit: "cup" },
      { name: "Chickpeas", quantity: 1, unit: "cup" },
      { name: "Spinach", quantity: 1, unit: "cup" },
    ],
  },
  {
    id: 3,
    name: "Chicken Stir Fry",
    instructions: "Stir fry chicken with vegetables.",
    prepTimeMinutes: 25,
    baseServings: 2,
    dietaryTags: ["gluten-free"],
    ingredients: [
      { name: "Chicken Breast", quantity: 300, unit: "gram" },
      { name: "Onion", quantity: 1, unit: "unit" },
      { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
    ],
  },
];

describe("matchRecipes", () => {
  it("ranks recipes by descending match percentage", () => {
    const pantry = [{ name: "Eggs" }, { name: "Tomatoes" }, { name: "Onion" }];
    const results = matchRecipes(pantry, recipes);

    expect(results[0].recipe.id).toBe(1);
    expect(results[0].matchPercentage).toBe(100);
    expect(
      results.every(
        (match, index) => index === 0 || match.matchPercentage <= results[index - 1].matchPercentage
      )
    ).toBe(true);
  });

  it("always surfaces a recipe requiring no additional ingredients when one exists", () => {
    const pantry = [{ name: "Eggs" }, { name: "Tomatoes" }];
    const results = matchRecipes(pantry, recipes);

    expect(results.some((match) => !match.requiresAdditionalIngredients)).toBe(true);
  });

  it("filters recipes by dietary tags", () => {
    const pantry = [{ name: "Eggs" }, { name: "Tomatoes" }, { name: "Rice" }];
    const results = matchRecipes(pantry, recipes, { dietaryTags: ["vegan"] });

    expect(results).toHaveLength(1);
    expect(results[0].recipe.id).toBe(2);
  });

  it("respects the limit option", () => {
    const results = matchRecipes([], recipes, { limit: 2 });

    expect(results).toHaveLength(2);
  });

  it("lists missing ingredients for partial matches", () => {
    const pantry = [{ name: "Chicken Breast" }];
    const results = matchRecipes(pantry, recipes);
    const stirFry = results.find((match) => match.recipe.id === 3);

    expect(stirFry?.missingIngredients.map((ingredient) => ingredient.name)).toEqual([
      "Onion",
      "Soy Sauce",
    ]);
  });
});
