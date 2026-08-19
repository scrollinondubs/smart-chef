import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { ingredients } from "@/lib/db/schema";
import { recognizeIngredients } from "@/lib/ingredients/recognize";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body.image !== "string") {
    return NextResponse.json(
      { error: "Expected a base64 image in the 'image' field." },
      { status: 400 }
    );
  }

  const recognized = await recognizeIngredients(body.image).catch(() => null);
  if (!recognized) {
    return NextResponse.json(
      { error: "Ingredient recognition failed. Add ingredients manually instead." },
      { status: 502 }
    );
  }

  const inserted = await Promise.all(
    recognized.map((item) =>
      db
        .insert(ingredients)
        .values({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: item.category,
        })
        .returning()
    )
  );

  return NextResponse.json({ ingredients: inserted.flat() });
}
