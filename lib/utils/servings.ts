export interface ScalableIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export function scaleIngredients<T extends ScalableIngredient>(
  ingredients: T[],
  baseServings: number,
  desiredServings: number
): T[] {
  const ratio = baseServings > 0 ? desiredServings / baseServings : 1;
  return ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: roundToTwoDecimals(ingredient.quantity * ratio),
  }));
}

function roundToTwoDecimals(value: number) {
  return Math.round(value * 100) / 100;
}
