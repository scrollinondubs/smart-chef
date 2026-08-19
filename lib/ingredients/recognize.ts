export interface RecognizedIngredient {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  confidence: number;
}

// Ordered so the first few entries always cover one full recipe in the seed
// catalog (see lib/recipes/seedData.ts) - keeps the local demo predictable.
const MOCK_CATALOG: RecognizedIngredient[] = [
  { name: "Eggs", quantity: 6, unit: "unit", category: "dairy", confidence: 0.92 },
  { name: "Tomatoes", quantity: 4, unit: "unit", category: "produce", confidence: 0.88 },
  { name: "Cheddar Cheese", quantity: 200, unit: "gram", category: "dairy", confidence: 0.85 },
  { name: "Onion", quantity: 2, unit: "unit", category: "produce", confidence: 0.9 },
  { name: "Milk", quantity: 1, unit: "liter", category: "dairy", confidence: 0.87 },
  { name: "Spinach", quantity: 150, unit: "gram", category: "produce", confidence: 0.77 },
  { name: "Chicken Breast", quantity: 500, unit: "gram", category: "meat", confidence: 0.83 },
];

/**
 * Stubbed ingredient recognition. There is no third-party vision API wired
 * up here (Google Cloud Vision, AWS Rekognition, etc.) so the app can run
 * fully offline with no external credentials. This is the only function
 * that would need to change to swap in a real provider - every caller only
 * depends on this signature.
 */
export async function recognizeIngredients(imageDataUrl: string): Promise<RecognizedIngredient[]> {
  const itemCount = 4 + (imageDataUrl.length % (MOCK_CATALOG.length - 3));
  return MOCK_CATALOG.slice(0, itemCount).map((item) => ({ ...item }));
}
