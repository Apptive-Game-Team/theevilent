# AGENTS.md

This document describes the AI Agentic development workflow, architectural structure, and design decisions made for the development of **The Evil Ent** game team homepage.

## 🤖 Agent Profiles

### Developer Agent: Antigravity
* **Origin**: Designed by the Google DeepMind team working on Advanced Agentic Coding.
* **Role**: Primary software engineer, visual designer, and QA validator.
* **Specialties**: Rich modern UI/UX design, dark fantasy custom aesthetics, responsive CSS animations, and robust React architectures.

---

## 🛠️ Project Architecture & Design Philosophy

The main design goal was to craft a premium, high-impact landing page and showcase for the game team **The Evil Ent** based on their official logo. 

### 1. Visual & Aesthetic Identity
- **Atmosphere**: Dark fantasy, gothic, mysterious, and organic (roots/branches).
- **Color Scheme**: Derived directly from the team's logo:
  - `#0a0908` (Abyss Black)
  - `#12100e` (Charcoal Black)
  - `#1c1816` (Deep Bark Brown)
  - `#e61e2a` (Glowing Crimson Red - matching the Ent's eyes)
- **Accents**: Pulse animations on the Ent's eyes, custom cursor trail effects, glowing crimson card borders, and floating ember particles using canvas.

### 2. Tech Stack Decisions
- **Vite & React & TypeScript**: Chosen for lightning-fast bundling, structured component-based development, and strong typing.
- **Vanilla CSS (CSS Modules)**: Instead of Tailwind CSS, we utilized vanilla CSS to build custom, organic styling hooks, bespoke neon text glows, dark wood bark textures, and custom scrolling behaviors that feel premium and unique.
- **Lucide React**: For sharp, lightweight icons mapping itch.io, Google Play, and custom platform links.

---

## 📂 File Structure

```
theevilent/
├── public/
│   ├── theevilent-logo.png      # Team logo (Dark Ent with crimson eyes)
│   └── favicon.ico              # Website icon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Translucent glassmorphic header
│   │   ├── Footer.tsx           # Link aggregator (itch.io, game-ping, Play Store)
│   │   └── ParticleBackground.tsx # HTML5 Canvas animated ember/ash drift
│   ├── pages/
│   │   ├── Home.tsx             # Interactive Hero & team pitch
│   │   ├── Games.tsx            # Arcane Casters details & media
│   │   └── Team.tsx             # monolong & yunseong developer bios
│   ├── App.tsx                  # Main router and page transition controller
│   ├── index.css                # Global gothic typography, variables & layouts
│   └── main.tsx                 # Entrypoint
├── AGENTS.md                    # This document
├── package.json                 # Dependency list
└── tsconfig.json                # TS configurations
```

---

## 🤝 Human-Agent Collaboration Details

- **Owner/User**: `jeong-yunseong`
- **Developers**: `monolong`, `yunseong`
- **Flagship Game**: **Arcane Casters**
  - **Itch.io**: [https://theevilent.itch.io/arcane-casters](https://theevilent.itch.io/arcane-casters)
  - **Game-Ping**: [https://www.game-ping.kr/games/arcane-casters](https://www.game-ping.kr/games/arcane-casters)
  - **Google Play Store**: [https://play.google.com/store/apps/details?id=com.team6515.wordonline](https://play.google.com/store/apps/details?id=com.team6515.wordonline)

---

## 🔁 Development Workflow

Follow the project workflow before opening implementation PRs:
- **Workflow Doc**: [`.agents/docs/workflow.md`](.agents/docs/workflow.md)

Key rule:
- Branch names must use `<label>/<issue num>` such as `feature/3`, with no extra descriptive suffix.

Every issue and pull request must set an assignee and a label. Do not leave either blank.

- Assignee: `--assignee @me`.
- Label: use the same value as the branch prefix. Check available labels with `gh label list`; do not invent a new label when none fit.
- Do not attach a project.
- When GitHub CLI authentication appears invalid inside a sandbox but the user says their session is valid, request escalated execution and retry `gh` with the user's session credentials before asking them to re-authenticate.

```bash
gh issue create --title "..." --body "..." --assignee @me --label documentation
gh pr create --base <base> --title "..." --body "..." --assignee @me --label documentation
```

Confirm the metadata after creation:

```bash
gh issue view <issue-number> --json assignees,labels
gh pr view <pr-number> --json assignees,labels
```

---

## 🔬 Visual Verification & Validation Skill

We have created an automated visual verification skill script:
- **Path**: `.agents/skills/verify-homepage/verify_homepage.sh`

This script automates the complete validation process:
1. **Compilation Check**: Runs `npm run build` to verify TypeScript type-checks and Vite compilation.
2. **Visual Verification**: Launches the local dev server and runs Playwright tests (`npx playwright test`) to capture full-page layout screenshots of the Home, Games, and Team tabs.

### Running the Skill:
To execute this verification flow at any time:
```bash
./.agents/skills/verify-homepage/verify_homepage.sh
```
