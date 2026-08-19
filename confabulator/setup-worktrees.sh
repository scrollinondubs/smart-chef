#!/bin/bash
#
# Git Worktree Setup Script
# Project: Smart Chef
# Repository: https://github.com/scrollinondubs/smart-chef
# Generated: 2026-08-19T18:36:42.075Z
#
# This script creates separate git worktrees for each task and epic,
# enabling parallel development without branch conflicts.
#

set -e  # Exit on error

echo "🌳 Setting up git worktrees for parallel development..."
echo ""

# ================================================
# EPICS
# ================================================

# Epic #1: Ingredient Recognition
# ✅ No dependencies - can start immediately
echo "Creating worktree for Epic #1..."
git worktree add ../epic-1-worktree -b epic/1-ingredient-recognition 2>/dev/null || echo "  Worktree already exists"

# Epic #4: Meal Suggestion Engine
# ✅ No dependencies - can start immediately
echo "Creating worktree for Epic #4..."
git worktree add ../epic-4-worktree -b epic/4-meal-suggestion-engine 2>/dev/null || echo "  Worktree already exists"

# Epic #7: Dietary and Serving Customization
# ✅ No dependencies - can start immediately
echo "Creating worktree for Epic #7..."
git worktree add ../epic-7-worktree -b epic/7-dietary-and-serving-customization 2>/dev/null || echo "  Worktree already exists"

# ================================================
# TASKS
# ================================================

# Task #2: Integrate Image Recognition Service
# ⚠️  Dependencies: #9, #9
echo "Creating worktree for Task #2..."
git worktree add ../task-2-worktree -b task/2-integrate-image-recognition-service 2>/dev/null || echo "  Worktree already exists"

# Task #3: Manual Ingredient Adjustment UI
# ⚠️  Dependencies: #2
echo "Creating worktree for Task #3..."
git worktree add ../task-3-worktree -b task/3-manual-ingredient-adjustment-ui 2>/dev/null || echo "  Worktree already exists"

# Task #5: Develop Meal Suggestion Algorithm
# ⚠️  Dependencies: #2
echo "Creating worktree for Task #5..."
git worktree add ../task-5-worktree -b task/5-develop-meal-suggestion-algorithm 2>/dev/null || echo "  Worktree already exists"

# Task #6: Display Meal Suggestions
# ⚠️  Dependencies: #2
echo "Creating worktree for Task #6..."
git worktree add ../task-6-worktree -b task/6-display-meal-suggestions 2>/dev/null || echo "  Worktree already exists"

# Task #8: Implement Dietary Filter
echo "Creating worktree for Task #8..."
git worktree add ../task-8-worktree -b task/8-implement-dietary-filter 2>/dev/null || echo "  Worktree already exists"

# Task #9: Adjust Serving Sizes
echo "Creating worktree for Task #9..."
git worktree add ../task-9-worktree -b task/9-adjust-serving-sizes 2>/dev/null || echo "  Worktree already exists"

echo ""
echo "✅ Worktree setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. View all worktrees: git worktree list"
echo "2. Check dependencies: ./confabulator/worktree-status.sh"
echo "3. Start working: cd <worktree-directory>"
echo ""
echo "🔀 Recommended merge order (dependencies first):"
echo "  1. #1 - Ingredient Recognition"
echo "  2. #3 - Manual Ingredient Adjustment UI"
echo "  3. #4 - Meal Suggestion Engine"
echo "  4. #5 - Develop Meal Suggestion Algorithm"
echo "  5. #6 - Display Meal Suggestions"
echo "  6. #7 - Dietary and Serving Customization"
echo "  7. #8 - Implement Dietary Filter"
echo ""
echo "To cleanup all worktrees: ./confabulator/cleanup-worktrees.sh"
