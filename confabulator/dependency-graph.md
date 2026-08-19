# Dependency Graph

```mermaid
graph TD

  1[[#1: Ingredient Recognition]]
  2[#2: Integrate Image Recognition Service]
  3[#3: Manual Ingredient Adjustment UI]
  4[[#4: Meal Suggestion Engine]]
  5[#5: Develop Meal Suggestion Algorithm]
  6[#6: Display Meal Suggestions]
  7[[#7: Dietary and Serving Customization]]
  8[#8: Implement Dietary Filter]
  9[#9: Adjust Serving Sizes]

  9 -->|Database before API| 2
  2 -->|API before UI| 3
  2 -->|API before UI| 5
  2 -->|API before UI| 6
  9 -->|Models before services| 2

  classDef epicStyle fill:#e1f5ff,stroke:#01579b,stroke-width:2px
  classDef taskStyle fill:#fff3e0,stroke:#e65100,stroke-width:1px
  class 1,4,7 epicStyle
  class 2,3,5,6,8,9 taskStyle
```

## Legend
- **Double box**: Epic
- **Single box**: Task
- **Arrow direction**: Dependency flow (A → B means B depends on A)

## About This Diagram

This diagram shows the dependencies between epics and tasks in your project. Use it to understand the order in which work should be completed and merged.

- **Epics** (double boxes) represent major features or components
- **Tasks** (single boxes) are specific implementation work items
- **Arrows** show dependencies (A → B means B depends on A completing first)

For parallel development using git worktrees, run:
```bash
./confabulator/setup-worktrees.sh
```
