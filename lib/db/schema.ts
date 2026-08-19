import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  quantity: real("quantity").notNull().default(1),
  unit: text("unit").notNull().default("unit"),
  category: text("category").notNull().default("other"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  instructions: text("instructions").notNull(),
  prepTimeMinutes: integer("prep_time_minutes").notNull(),
  baseServings: integer("base_servings").notNull().default(2),
  dietaryTags: text("dietary_tags", { mode: "json" }).$type<string[]>().notNull(),
  ingredients: text("ingredients", { mode: "json" }).$type<RecipeIngredient[]>().notNull(),
});
