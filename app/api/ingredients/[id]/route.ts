import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { ingredients } from "@/lib/db/schema";

function parseId(param: string) {
  const id = Number(param);
  return Number.isInteger(id) ? id : null;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ingredient id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Request body is required." }, { status: 400 });
  }

  const updates: Partial<typeof ingredients.$inferInsert> = { updatedAt: new Date() };
  if (typeof body.name === "string" && body.name.trim()) updates.name = body.name.trim();
  if (typeof body.quantity === "number") updates.quantity = body.quantity;
  if (typeof body.unit === "string" && body.unit.trim()) updates.unit = body.unit.trim();
  if (typeof body.category === "string" && body.category.trim()) updates.category = body.category.trim();

  const [updated] = await db.update(ingredients).set(updates).where(eq(ingredients.id, id)).returning();
  if (!updated) {
    return NextResponse.json({ error: "Ingredient not found." }, { status: 404 });
  }

  return NextResponse.json({ ingredient: updated });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (id === null) {
    return NextResponse.json({ error: "Invalid ingredient id." }, { status: 400 });
  }

  const [deleted] = await db.delete(ingredients).where(eq(ingredients.id, id)).returning();
  if (!deleted) {
    return NextResponse.json({ error: "Ingredient not found." }, { status: 404 });
  }

  return NextResponse.json({ ingredient: deleted });
}
