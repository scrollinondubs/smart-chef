import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ingredients } from "@/lib/db/schema";

export async function GET() {
  const rows = await db.select().from(ingredients).orderBy(desc(ingredients.createdAt));
  return NextResponse.json({ ingredients: rows });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Ingredient name is required." }, { status: 400 });
  }

  const [created] = await db
    .insert(ingredients)
    .values({
      name: body.name.trim(),
      quantity: typeof body.quantity === "number" ? body.quantity : 1,
      unit: typeof body.unit === "string" && body.unit.trim() ? body.unit.trim() : "unit",
      category: typeof body.category === "string" && body.category.trim() ? body.category.trim() : "other",
    })
    .returning();

  return NextResponse.json({ ingredient: created }, { status: 201 });
}
