import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ingredients } from "@/lib/db/schema";
import { IngredientPanel } from "@/components/IngredientPanel";
import { MealSuggestions } from "@/components/MealSuggestions";
import type { Ingredient } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const pantry = await db.select().from(ingredients).orderBy(desc(ingredients.createdAt));

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Smart Chef</h1>
        <p className="mt-1 text-slate-500">
          Snap your fridge, confirm what&apos;s inside, and get meal ideas from what you already have.
        </p>
      </header>
      <IngredientPanel initialIngredients={serialize(pantry)} />
      <MealSuggestions />
    </main>
  );
}

function serialize(pantry: (typeof ingredients.$inferSelect)[]): Ingredient[] {
  return pantry.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}
