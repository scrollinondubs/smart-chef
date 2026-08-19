import { db } from "../lib/db/client";
import { recipes } from "../lib/db/schema";
import { seedRecipes } from "../lib/recipes/seedData";

async function main() {
  await db.delete(recipes);
  for (const recipe of seedRecipes) {
    await db.insert(recipes).values(recipe);
  }
  console.log(`Seeded ${seedRecipes.length} recipes.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
