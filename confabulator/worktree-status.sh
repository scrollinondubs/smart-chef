#!/bin/bash
#
# Git Worktree Status Script
# Project: Smart Chef
# Generated: 2026-08-19T18:36:42.075Z
#
# Shows the status of all worktrees and their dependencies.
#

echo "📊 Worktree Status - Smart Chef"
echo "="
echo ""

echo "📂 Active Worktrees:"
git worktree list
echo ""

echo "🔗 Dependency Summary:"
echo ""
echo "Epics:"
echo "  ✅ #1 - Ingredient Recognition (no dependencies)"
echo "  ✅ #4 - Meal Suggestion Engine (no dependencies)"
echo "  ✅ #7 - Dietary and Serving Customization (no dependencies)"
echo ""
echo "Tasks:"
echo "  ⚠️  #2 - Integrate Image Recognition Service (depends on: #9, #9)"
echo "  ⚠️  #3 - Manual Ingredient Adjustment UI (depends on: #2)"
echo "  ⚠️  #5 - Develop Meal Suggestion Algorithm (depends on: #2)"
echo "  ⚠️  #6 - Display Meal Suggestions (depends on: #2)"
echo "  ✅ #8 - Implement Dietary Filter (no dependencies)"
echo "  ✅ #9 - Adjust Serving Sizes (no dependencies)"
echo ""
echo "🔀 Recommended Merge Order:"
echo "  1. 📦 #1 - Ingredient Recognition"
echo "  2. 📝 #3 - Manual Ingredient Adjustment UI"
echo "  3. 📦 #4 - Meal Suggestion Engine"
echo "  4. 📝 #5 - Develop Meal Suggestion Algorithm"
echo "  5. 📝 #6 - Display Meal Suggestions"
echo "  6. 📦 #7 - Dietary and Serving Customization"
echo "  7. 📝 #8 - Implement Dietary Filter"
echo ""
echo "💡 Tips:"
echo "  - Work on tasks with no dependencies first"
echo "  - Merge branches in the order shown above"
echo "  - Check GitHub issues for detailed requirements"
echo ""