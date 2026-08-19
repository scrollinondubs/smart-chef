# Smart Chef

Alright, we're building a smart chef app that can take a picture. So you take a photo of what's in your fridge, and this app will make suggestions about meals that you can prepare with the ingredients that are in your fridge.                     But also, if you're missing maybe one or two ingredients, it'll give you options that you could make if you just bought a few things.                           So, the idea is to just give you suggestions for stuff that you're able to make and stuff that you're close to being able to make based on what's in your fridge right now.

## Quick Reference

### Bash Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run test         # Run tests

# Database (if applicable)
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run migrations
npm run db:push      # Push schema changes
```

### Project Structure
```
confabulator/        # Project documentation (IMPORTANT - read these first)
├── PRD.md           # Product requirements and features
├── project-vision.md # Vision and problem statement
├── implementation-plan.md # Technical architecture and roadmap
├── wireframes.md    # UI/UX wireframes and screen flows
├── business-model-canvas.md # Business model
└── PR-FAQ.md        # Press release and FAQ
src/                 # Source code
├── app/             # Next.js app router (if applicable)
├── components/      # UI components
├── lib/             # Utility functions and services
└── types/           # TypeScript types
```

## Project Context

### Target Customer
Ideal customer is someone with a fridge who has food in it and maybe some disposable income to pay for our app.                         We'll probably have like a freemium model on it, and we'll show regular recipes for free, but then maybe offer some premium versions or something.

### Value Proposition
Customer members will choose our product because it's the quickest way to figure out what to cook tonight.

### Platform
web

## Tech Stack

TypeScript, JavaScript, Next.js, React, Shadcn, Tailwind, shadcn/ui, Radix UI, React Hook Form, Zod, Drizzle, Stripe, Nextauth, Clerk, Aws, Vercel, DrizzleORM, NextAuth.js, Postgresql

## Key Documentation

**CRITICAL**: Before starting any work, familiarize yourself with the Confabulator documentation in `confabulator/`:

| Document | Purpose | When to Reference |
|----------|---------|-------------------|
| `PRD.md` | Feature specs, user stories, acceptance criteria | Before implementing any feature |
| `project-vision.md` | Problem statement, target users, goals | For strategic decisions |
| `implementation-plan.md` | Architecture, tech stack, data model, API routes | Technical implementation |
| `wireframes.md` | UI layouts, screen flows, component placement | Building UI components |
| `business-model-canvas.md` | Revenue, costs, partnerships | Business logic decisions |

## Development Guidelines

### Code Style
- Use TypeScript for all code; prefer interfaces over types
- Use functional and declarative programming patterns
- Use descriptive variable names with auxiliary verbs (isLoading, hasAccess, canSubmit)
- Use lowercase-with-dashes for directories (components/user-profile)
- Favor named exports for components and utilities

### Before Implementing Features
1. Read the relevant user story in `confabulator/implementation-plan.md`
2. Check acceptance criteria in `confabulator/PRD.md`
3. Reference wireframes in `confabulator/wireframes.md` for UI guidance
4. Follow the data model and API routes in the implementation plan

### Error Handling
- Implement comprehensive error handling at all levels
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors appropriately for debugging

## Ralph Wiggum Build System

This project uses the Ralph Wiggum autonomous build loop for processing GitHub issues.

### Commands

| Command | Purpose |
|---------|---------|
| `/ralphify <issue>` | Generate Ralph files for a single issue |
| `/ralph-cleanup` | Archive completed session and close issue |
| `/ralph-orchestrate` | Process multiple issues automatically |

### Issue Convention for Orchestration

For issues to work with `/ralph-orchestrate`:

1. **Label**: Add `ralph:ready` label to issues ready for processing
2. **Dependencies**: Declare explicitly in issue body:
   ```
   depends-on: #42
   ```
3. **Content**: Include clear acceptance criteria or checklist items

### Orchestration Labels

| Label | Purpose |
|-------|---------|
| `ralph:ready` | Ready for orchestration |
| `ralph:queued` | In the orchestration queue |
| `ralph:in-progress` | Currently being processed |
| `ralph:complete` | Successfully processed (PR created) |
| `ralph:failed` | Processing failed, needs intervention |

### Workflow

1. Label issues with `ralph:ready`
2. Run `/ralph-orchestrate` (or `--dry-run` to preview)
3. Run the generated script: `./.ralph/ralph-orchestrate.sh`
4. Script creates feature branches and PRs for each issue (with fresh Claude sessions)
5. Review and merge PRs

**Note:** The orchestrator uses a two-phase approach to avoid context degradation:
- Phase 1: `/ralph-orchestrate` triages issues and generates an execution script
- Phase 2: The bash script invokes fresh Claude sessions per issue

## Current Focus

The MVP focuses on these core capabilities:

- Alright, the MVP needs to have the ability to take the photo of what's in the fridge and have that categorize the food that's there.                    give us some kind of estimation of like quantity and breakdown of you know what the ingredients are in the fridge such that they can be used in a recipe.                        It needs to have the ability to look up publicly available recipes and come up with ideas and then match our ingredients against that.                                       Needs to have the ability to how many servings, maybe? Yeah, maybe how, yeah, enter like the number of people that are going to be eating that night, and so how many servings you need to make.                                 and maybe add like dietary restrictions if certain people can't eat certain ingredients. You need or maybe like to declare things like celiac and You know, gluten and lactose intolerant and things like that.

See `confabulator/implementation-plan.md` for the complete development roadmap.

## Repository

https://github.com/scrollinondubs/smart-chef

---

*Generated by [Confabulator](https://vibecodelisboa.com/confabulator)*
