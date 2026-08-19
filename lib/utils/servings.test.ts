import { describe, expect, it } from "vitest";
import { scaleIngredients } from "./servings";

describe("scaleIngredients", () => {
  it("scales quantities proportionally to the desired servings", () => {
    const scaled = scaleIngredients(
      [
        { name: "Rice", quantity: 1, unit: "cup" },
        { name: "Water", quantity: 2, unit: "cup" },
      ],
      2,
      4
    );

    expect(scaled).toEqual([
      { name: "Rice", quantity: 2, unit: "cup" },
      { name: "Water", quantity: 4, unit: "cup" },
    ]);
  });

  it("rounds scaled quantities to two decimal places", () => {
    const scaled = scaleIngredients([{ name: "Salt", quantity: 1, unit: "tsp" }], 3, 1);

    expect(scaled[0].quantity).toBe(0.33);
  });

  it("leaves quantities unchanged when servings match the recipe base", () => {
    const scaled = scaleIngredients([{ name: "Flour", quantity: 2, unit: "cup" }], 2, 2);

    expect(scaled[0].quantity).toBe(2);
  });
});
