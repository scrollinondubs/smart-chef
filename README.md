# Smart Chef

---

Smart Chef is more than an app; it's a movement towards smarter, more sustainable cooking. Join us in reshaping the way the world prepares and enjoys food.

## Features

- Description: Automatically identify and categorize ingredients from a photo of the fridge.
- User Story: As a user, I want to take a picture of my fridge contents so that I can receive meal suggestions without manually inputting ingredients.
- Acceptance Criteria:
- Priority: P0

## Tech Stack

- **Framework**: Next.js

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- [Claude Code CLI](https://claude.ai/claude-code) (for Ralph autonomous development)
- [GitHub CLI](https://cli.github.com/) (for Ralph issue integration)

### Installation

```bash
git clone <your-repo-url>
cd smart-chef
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Getting Started with Ralph 🤖

This project includes **Ralph**, an autonomous AI development loop that implements features from GitHub issues.

### Workflow

1. **Choose an issue** from the [project board](../../projects)
2. **Generate Ralph files**: `/ralphify <issue-number>`
3. **Run the loop**: `.ralph/ralph.sh 20`
4. **Clean up when done**: `/ralph-cleanup`

### Commands

| Command | Description |
|---------|-------------|
| `/ralphify #123` | Generate `.ralph/` files for issue #123 |
| `.ralph/ralph.sh 20` | Run Ralph loop (max 20 iterations) |
| `/ralph-cleanup` | Archive files and close the GitHub issue |
| `/ralph-cleanup --force` | Archive even if tasks incomplete |
| `/ralph-cleanup --no-close` | Archive but don't close issue |

### Example Session

```bash
# 1. Pick an issue and generate Ralph files
claude
> /ralphify 42

# 2. Run the autonomous loop
.ralph/ralph.sh 20

# 3. Archive and close the issue
claude
> /ralph-cleanup
```

### How Ralph Works

Ralph reads the generated `.ralph/plan.md` file which contains a JSON task list derived from the GitHub issue. Each iteration:

1. Reads the plan to find an incomplete task
2. Implements the task completely
3. Updates `plan.md` (marks task as passed)
4. Logs progress to `activity.md`
5. Verifies with build/tests
6. Continues until all tasks pass or max iterations reached

When complete, `/ralph-cleanup` archives the session to `.ralph/archive/issue-<number>/` and closes the GitHub issue.

See `.claude/commands/` for full command documentation.

## Documentation

- [Product Requirements](./confabulator/PRD.md)
- [Project Vision](./confabulator/project-vision.md)
- [Implementation Plan](./confabulator/implementation-plan.md)
- [Business Model Canvas](./confabulator/business-model-canvas.md)
- [PR-FAQ](./confabulator/PR-FAQ.md)

---

*Generated with [Confabulator](https://vibecodelisboa.com/confabulator)*
