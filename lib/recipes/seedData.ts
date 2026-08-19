interface SeedRecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

interface SeedRecipe {
  name: string;
  instructions: string;
  prepTimeMinutes: number;
  baseServings: number;
  dietaryTags: string[];
  ingredients: SeedRecipeIngredient[];
}

export const seedRecipes: SeedRecipe[] = [
  {
    name: "Cheesy Tomato Omelette",
    instructions:
      "1. Whisk the eggs with a pinch of salt.\n2. Dice the tomatoes and stir into the eggs.\n3. Melt butter in a pan over medium heat and pour in the mixture.\n4. Sprinkle cheddar on top and fold once the edges set.\n5. Serve warm.",
    prepTimeMinutes: 10,
    baseServings: 2,
    dietaryTags: ["vegetarian", "gluten-free", "nut-free"],
    ingredients: [
      { name: "Eggs", quantity: 3, unit: "unit" },
      { name: "Tomatoes", quantity: 2, unit: "unit" },
      { name: "Cheddar Cheese", quantity: 50, unit: "gram" },
    ],
  },
  {
    name: "Spinach & Cheese Scramble",
    instructions:
      "1. Wilt the spinach in a hot pan for 1-2 minutes.\n2. Whisk the eggs and pour over the spinach.\n3. Scramble gently over low heat.\n4. Fold in the cheddar just before it fully sets.\n5. Season and serve.",
    prepTimeMinutes: 8,
    baseServings: 2,
    dietaryTags: ["vegetarian", "gluten-free", "nut-free"],
    ingredients: [
      { name: "Eggs", quantity: 4, unit: "unit" },
      { name: "Spinach", quantity: 100, unit: "gram" },
      { name: "Cheddar Cheese", quantity: 50, unit: "gram" },
    ],
  },
  {
    name: "Grilled Chicken with Onions",
    instructions:
      "1. Slice the onion into thick rings.\n2. Season the chicken breast and coat lightly in olive oil.\n3. Grill the chicken 6-7 minutes per side.\n4. Grill the onion rings alongside until charred.\n5. Rest the chicken for 5 minutes before slicing.",
    prepTimeMinutes: 25,
    baseServings: 2,
    dietaryTags: ["gluten-free", "dairy-free", "nut-free"],
    ingredients: [
      { name: "Chicken Breast", quantity: 400, unit: "gram" },
      { name: "Onion", quantity: 1, unit: "unit" },
      { name: "Olive Oil", quantity: 1, unit: "tbsp" },
    ],
  },
  {
    name: "Creamy Tomato Soup",
    instructions:
      "1. Saute the diced onion in butter until soft.\n2. Add the chopped tomatoes and simmer 15 minutes.\n3. Blend until smooth.\n4. Stir in the milk and warm through without boiling.\n5. Season to taste and serve.",
    prepTimeMinutes: 30,
    baseServings: 4,
    dietaryTags: ["vegetarian", "gluten-free", "nut-free"],
    ingredients: [
      { name: "Tomatoes", quantity: 6, unit: "unit" },
      { name: "Onion", quantity: 1, unit: "unit" },
      { name: "Milk", quantity: 200, unit: "ml" },
      { name: "Butter", quantity: 1, unit: "tbsp" },
    ],
  },
  {
    name: "Vegan Chickpea Buddha Bowl",
    instructions:
      "1. Cook the rice according to package instructions.\n2. Warm the chickpeas in a pan with a splash of water.\n3. Wilt the spinach briefly.\n4. Thinly slice the onion.\n5. Assemble everything in a bowl and season.",
    prepTimeMinutes: 20,
    baseServings: 2,
    dietaryTags: ["vegan", "vegetarian", "dairy-free", "gluten-free", "nut-free"],
    ingredients: [
      { name: "Rice", quantity: 1, unit: "cup" },
      { name: "Chickpeas", quantity: 1, unit: "cup" },
      { name: "Spinach", quantity: 100, unit: "gram" },
      { name: "Onion", quantity: 0.5, unit: "unit" },
    ],
  },
  {
    name: "Classic Chicken Stir Fry",
    instructions:
      "1. Slice the chicken breast into strips and sear until browned.\n2. Add the sliced onion and bell pepper.\n3. Stir fry for 3-4 minutes.\n4. Add the soy sauce and toss to coat.\n5. Serve immediately.",
    prepTimeMinutes: 20,
    baseServings: 3,
    dietaryTags: ["dairy-free", "nut-free"],
    ingredients: [
      { name: "Chicken Breast", quantity: 350, unit: "gram" },
      { name: "Onion", quantity: 1, unit: "unit" },
      { name: "Soy Sauce", quantity: 2, unit: "tbsp" },
      { name: "Bell Pepper", quantity: 1, unit: "unit" },
    ],
  },
  {
    name: "Overnight Oats with Milk",
    instructions:
      "1. Combine the oats and milk in a jar.\n2. Stir in the honey.\n3. Cover and refrigerate overnight.\n4. Stir again before serving, adding a splash more milk if needed.",
    prepTimeMinutes: 5,
    baseServings: 1,
    dietaryTags: ["vegetarian", "nut-free"],
    ingredients: [
      { name: "Oats", quantity: 1, unit: "cup" },
      { name: "Milk", quantity: 1, unit: "cup" },
      { name: "Honey", quantity: 1, unit: "tbsp" },
    ],
  },
  {
    name: "Egg & Cheese Breakfast Sandwich",
    instructions:
      "1. Toast the bread slices.\n2. Fry the eggs to your liking.\n3. Layer the cheddar over the hot eggs so it melts.\n4. Assemble the sandwich and serve immediately.",
    prepTimeMinutes: 10,
    baseServings: 1,
    dietaryTags: ["vegetarian", "nut-free"],
    ingredients: [
      { name: "Eggs", quantity: 2, unit: "unit" },
      { name: "Cheddar Cheese", quantity: 30, unit: "gram" },
      { name: "Bread", quantity: 2, unit: "slice" },
    ],
  },
];
