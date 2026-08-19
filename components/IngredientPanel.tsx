"use client";

import { useCallback, useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { IngredientList } from "@/components/IngredientList";
import type { Ingredient } from "@/lib/types";

interface IngredientPanelProps {
  initialIngredients: Ingredient[];
}

export function IngredientPanel({ initialIngredients }: IngredientPanelProps) {
  const [pantry, setPantry] = useState<Ingredient[]>(initialIngredients);

  const handleRecognized = useCallback((recognized: Ingredient[]) => {
    setPantry((current) => [...recognized, ...current]);
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <ImageUpload onRecognized={handleRecognized} />
      <IngredientList pantry={pantry} onPantryChange={setPantry} />
    </section>
  );
}
