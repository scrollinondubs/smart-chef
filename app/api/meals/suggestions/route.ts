import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { ingredients, recipes } from "@/lib/db/schema";
import { matchRecipes } from "@/lib/mealSuggestions/matchRecipes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dietaryTags = searchParams.getAll("dietary").filter(Boolean);

  const [pantry, recipeRows] = await Promise.all([
    db.select().from(ingredients),
    db.select().from(recipes),
  ]);

  const suggestions = matchRecipes(pantry, recipeRows, { dietaryTags, limit: 3 });

  return NextResponse.json({ suggestions });
}
