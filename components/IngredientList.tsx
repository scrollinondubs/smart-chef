"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Ingredient } from "@/lib/types";

interface IngredientListProps {
  pantry: Ingredient[];
  onPantryChange: (pantry: Ingredient[]) => void;
}

const emptyDraft = { name: "", quantity: "1", unit: "unit", category: "other" };

export function IngredientList({ pantry, onPantryChange }: IngredientListProps) {
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState(emptyDraft);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    if (!draft.name.trim()) return;

    setError(null);
    const response = await fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: draft.name,
        quantity: Number(draft.quantity) || 1,
        unit: draft.unit,
        category: draft.category,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Couldn't add that ingredient.");
      return;
    }

    const { ingredient } = await response.json();
    onPantryChange([ingredient, ...pantry]);
    setDraft(emptyDraft);
  }

  function startEdit(ingredient: Ingredient) {
    setEditingId(ingredient.id);
    setEditDraft({
      name: ingredient.name,
      quantity: String(ingredient.quantity),
      unit: ingredient.unit,
      category: ingredient.category,
    });
  }

  async function handleSaveEdit(id: number) {
    setError(null);
    const response = await fetch(`/api/ingredients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editDraft.name,
        quantity: Number(editDraft.quantity) || 1,
        unit: editDraft.unit,
        category: editDraft.category,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Couldn't save that change.");
      return;
    }

    const { ingredient } = await response.json();
    onPantryChange(pantry.map((item) => (item.id === id ? ingredient : item)));
    setEditingId(null);
  }

  async function handleDelete(id: number) {
    setError(null);
    const response = await fetch(`/api/ingredients/${id}`, { method: "DELETE" });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Couldn't remove that ingredient.");
      return;
    }

    onPantryChange(pantry.filter((item) => item.id !== id));
    setPendingDeleteId(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your ingredients ({pantry.length})</CardTitle>
        <CardDescription>Add, edit, or remove anything the scan missed.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="ingredient-name" className="text-xs font-medium text-slate-600">
              Name
            </label>
            <Input
              id="ingredient-name"
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="e.g. Broccoli"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="ingredient-quantity" className="text-xs font-medium text-slate-600">
              Quantity
            </label>
            <Input
              id="ingredient-quantity"
              type="number"
              min="0"
              step="0.1"
              className="w-24"
              value={draft.quantity}
              onChange={(event) => setDraft({ ...draft, quantity: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="ingredient-unit" className="text-xs font-medium text-slate-600">
              Unit
            </label>
            <Input
              id="ingredient-unit"
              className="w-24"
              value={draft.unit}
              onChange={(event) => setDraft({ ...draft, unit: event.target.value })}
            />
          </div>
          <Button type="submit">Add ingredient</Button>
        </form>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {pantry.length === 0 ? (
          <p className="text-sm text-slate-500">No ingredients yet - scan a photo or add one above.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-slate-100">
            {pantry.map((ingredient) => (
              <li key={ingredient.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                {editingId === ingredient.id ? (
                  <div className="flex flex-1 flex-wrap items-center gap-2">
                    <Input
                      aria-label="Ingredient name"
                      value={editDraft.name}
                      onChange={(event) => setEditDraft({ ...editDraft, name: event.target.value })}
                      className="w-40"
                    />
                    <Input
                      aria-label="Quantity"
                      type="number"
                      min="0"
                      step="0.1"
                      value={editDraft.quantity}
                      onChange={(event) => setEditDraft({ ...editDraft, quantity: event.target.value })}
                      className="w-20"
                    />
                    <Input
                      aria-label="Unit"
                      value={editDraft.unit}
                      onChange={(event) => setEditDraft({ ...editDraft, unit: event.target.value })}
                      className="w-24"
                    />
                    <Button size="sm" onClick={() => handleSaveEdit(ingredient.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-900">{ingredient.name}</span>
                      <span className="text-sm text-slate-500">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <Badge>{ingredient.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {pendingDeleteId === ingredient.id ? (
                        <>
                          <span className="text-sm text-slate-600">Remove this ingredient?</span>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(ingredient.id)}>
                            Confirm
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setPendingDeleteId(null)}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={() => startEdit(ingredient)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setPendingDeleteId(ingredient.id)}>
                            Remove
                          </Button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
