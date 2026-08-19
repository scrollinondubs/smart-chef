# Wireframes: Smart Chef

## Overview & User Story Mapping

**Design Approach:** Focus on simplicity and user-friendliness, targeting web-based platforms with responsive design for mobile access.

**User Story → Screen Mapping:**
- US-1: Ingredient Recognition → [Home/Ingredient Capture Screen]
- US-2: Meal Suggestion Engine → [Meal Suggestions Screen]
- US-3: Dietary and Serving Customization → [Customizations Screen]

## Screen Flow Diagram

High-level navigation flow between screens:
```
[Home/Ingredient Capture] → [Ingredient Confirmation] → [Meal Suggestions]
       ↓                              ↓
[Login/Register]               [Customizations]
       ↓                              ↓
[Dashboard]                      [Settings]
```

## ASCII Wireframes

### 1. Home/Ingredient Capture Screen
**User Stories Enabled:** [US-1]

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]      <Home> <Dashboard> <Settings>   [Profile ▼]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Welcome to Smart Chef!                                     │
│  Take a photo of your fridge to start receiving meal ideas. │
│                                                             │
│                [Capture Fridge Photo →]                     │
│                                                             │
│  Or upload an image:                                        │
│  [Choose File]  <Upload>                                    │
│                                                             │
│  <Need an account? Sign up> | <Already have an account? Log in> │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer: <About> | <Contact> | <Privacy>                    │
└─────────────────────────────────────────────────────────────┘

        ↓ User clicks [Capture Fridge Photo]
```

### 2. Ingredient Confirmation Screen
**User Stories Enabled:** [US-1]

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] <Home> <Dashboard> <Settings> [Profile ▼]            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Confirm Detected Ingredients                               │
│                                                             │
│  Detected:                                                  │
│  ┌────────────┬──────────────┬──────────────┬──────────────┐ │
│  │ Tomato     │ Milk         │ Lettuce      │ Cheese       │ │
│  ├────────────┼──────────────┼──────────────┼──────────────┤ │
│  │ {Edit}     │ {Edit}       │ {Edit}       │ {Edit}       │ │
│  │ [Delete]   │ [Delete]     │ [Delete]     │ [Delete]     │ │
│  └────────────┴──────────────┴──────────────┴──────────────┘ │
│                                                             │
│  [Add Ingredient]                                           │
│                                                             │
│  [Confirm Ingredients →]                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

        ↓ After confirming ingredients
```

### 3. Meal Suggestions Screen
**User Stories Enabled:** [US-2, US-3]

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] <Home> <Dashboard> <Settings> [Profile ▼]            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Meal Suggestions                                           │
│                                                             │
│  Based on your ingredients, here are your meals:            │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Recipe 1   │    │  Recipe 2   │    │  Recipe 3   │     │
│  │  Match: 90% │    │  Match: 85% │    │  Match: 80% │     │
│  │  [View]     │    │  [View]     │    │  [View]     │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  (Filter Options ▼)                                         │
│  <Dietary Restrictions> | <Serving Size>                    │
│                                                             │
│  [Customize Meals →]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

        ↓ User selects [Customize Meals]
```

### 4. Customizations Screen
**User Stories Enabled:** [US-3]

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] <Home> <Dashboard> <Settings> [Profile ▼]            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Customize Your Meal Preferences                            │
│                                                             │
│  Dietary Restrictions:                                      │
│  (Select Dietary Restriction ▼)                             │
│                                                             │
│  Serving Size:                                              │
│  {Select Serving Size ▼}                                    │
│                                                             │
│  [Apply Customizations →]                                   │
│                                                             │
│  <Back to Suggestions>                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

        ↓ After applying customizations
```

## Mobile Responsive Variations

### Home/Ingredient Capture Screen (Mobile)

```
┌─────────────────────┐
│  [☰]  Logo  [User]  │
├─────────────────────┤
│                     │
│  Welcome to Smart   │
│  Chef!              │
│                     │
│  [Capture Photo]    │
│  <Upload Image>     │
│                     │
│  <Sign up> | <Log in> │
│                     │
└─────────────────────┘
```

## Interactive States

### Button States
```
[Normal Button]  [Hover: underline]  [Disabled: gray]  [Loading: spinner]
```

### Form Validation
```
{Valid Input✓}   {Invalid Input✗ Error message}
```

## Design System Quick Reference

- **Primary Action:** [Button] style
- **Secondary Action:** <Link> style
- **Input Fields:** {Field Name..........} style
- **Dropdowns:** (Select Option ▼) style
- **Navigation:** Top bar or sidebar with <Links>
- **Cards:** Boxes with ┌─┐└┘ characters

---

These wireframes visually represent the key user flows and interactions for the Smart Chef application, enabling the core user stories through a simplified and intuitive interface.