---
name: verify-homepage
description: Compiles the Vite React project and runs Playwright tests to visually verify all pages (Home, Games, Team) of the Evil Ent homepage.
---

# Visual Verification Skill

This skill automates the compilation check and Playwright visual verification of The Evil Ent game team homepage.

## When to Use
Use this skill when you want to verify that the frontend codebase is compiling properly and that all web pages render without layout or visual bugs.

## How to Execute

To invoke this skill, run the visual verification shell script located inside the repository:

```bash
./.agents/skills/verify-homepage/verify_homepage.sh
```

## Expected Output
- Complete build compilation logs with no errors.
- Screenshots of the three views saved as artifacts:
  - `screenshot_home.png`
  - `screenshot_games.png`
  - `screenshot_team.png`
