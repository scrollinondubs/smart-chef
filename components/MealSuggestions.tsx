"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DIETARY_TAGS } from "@/lib/recipes/dietaryTags";
import { scaleIngredients } from "@/lib/utils/servings";
import type { MealMatch } from "@/lib/mealSuggestions/matchRecipes";

export function MealSuggestions() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<MealMatch[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]
    );
  }

  async function fetchSuggestions() {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      selectedTags.forEach((tag) => params.append("dietary", tag));
      const response = await fetch(`/api/meals/suggestions?${params.toString()}`);
      if (!response.ok) throw new Error("Couldn't load meal suggestions.");
      const body = await response.json();
      setSuggestions(body.suggestions);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal suggestions</CardTitle>
        <CardDescription>Pick any dietary needs, then find meals from what&apos;s on hand.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <fieldset className="flex flex-wrap gap-3">
          <legend className="sr-only">Dietary restrictions</legend>
          {DIETARY_TAGS.map((tag) => (
            <label key={tag.value} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.value)}
                onChange={() => toggleTag(tag.value)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              {tag.label}
            </label>
          ))}
        </fieldset>

        <Button type="button" onClick={fetchSuggestions} disabled={isLoading} className="self-start">
          {isLoading ? "Finding meals..." : "Find meals"}
        </Button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {suggestions && suggestions.length === 0 && (
          <p className="text-sm text-slate-500">No recipes match those filters yet.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions?.map((suggestion) => (
            <SuggestionCard key={suggestion.recipe.id} suggestion={suggestion} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SuggestionCard({ suggestion }: { suggestion: MealMatch }) {
  const { recipe } = suggestion;
  const [servings, setServings] = useState(recipe.baseServings);
  const [showDetails, setShowDetails] = useState(false);

  const scaledIngredients = scaleIngredients(recipe.ingredients, recipe.baseServings, servings);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base">{recipe.name}</CardTitle>
          <Badge>{suggestion.matchPercentage}% match</Badge>
        </div>
        <CardDescription>{recipe.prepTimeMinutes} min prep</CardDescription>
        {!suggestion.requiresAdditionalIngredients && (
          <Badge className="w-fit bg-emerald-100 text-emerald-800">Ready to cook now</Badge>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {suggestion.missingIngredients.length > 0 && (
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Missing</p>
            <p className="text-sm text-slate-700">
              {suggestion.missingIngredients.map((ingredient) => ingredient.name).join(", ")}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <label htmlFor={`servings-${recipe.id}`} className="text-sm font-medium text-slate-700">
            Servings
          </label>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => setServings((current) => Math.max(1, current - 1))}
            aria-label="Decrease servings"
          >
            -
          </Button>
          <span id={`servings-${recipe.id}`} className="w-6 text-center text-sm">
            {servings}
          </span>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => setServings((current) => current + 1)}
            aria-label="Increase servings"
          >
            +
          </Button>
        </div>

        {showDetails && (
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500">Ingredients</p>
              <ul className="list-inside list-disc">
                {scaledIngredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-slate-500">Instructions</p>
              <p className="whitespace-pre-line">{recipe.instructions}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="button" variant="ghost" onClick={() => setShowDetails((current) => !current)}>
          {showDetails ? "Hide recipe" : "View recipe"}
        </Button>
      </CardFooter>
    </Card>
  );
}
