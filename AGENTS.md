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

The site is Arcane Casters' site. `:root` in `src/index.css` carries the game,
and `[data-theme='the-evil-ent']` carries the studio; only the Team page opts
in, through `useDocumentTheme()`.

- **Atmosphere**: The clearing the match is played in — daylight, grass, warm
  wood, white cards floating on a soft shadow.
- **Color Scheme**: Sampled out of `public/gameplay/match.png` and
  `public/gameplay/battle.png`, the two Play Store match screens:
  - `#98b852` (arena grass) · `#83ac51` (its shade) · `#5c942d` (deeper field)
  - `#aed347` / `#d8f156` (canopy leaves)
  - `#d0a178` (the hud plank the six spell cards lie on)
  - `#91be5a` (the mana gauge and the badge on each card)
  - `#477320` (that mana green taken down until white text on it clears AA)
- **Studio theme**: `#0d0b0a` ground with `#ff5a64`, the Ent's eyes lifted off
  the logo's `#e61e2a` so body text clears AA on black.
- **Type**: Pretendard alone, loaded from jsDelivr's dynamic subset. It is the
  family the Unity client ships, so the site and the game set Korean the same
  way. Weight and size carry the hierarchy — no second display family, no
  letter-spaced small caps, no text shadow.
- **Shape**: Cards are lifted by a shadow, never boxed by a 1px border. Buttons
  are filled with one darker step along the bottom edge.
- **Accents**: Leaves drifting down the canvas behind the page, and the Ent's
  eyes pulsing on the studio's own page.

Every colour outside a CSS variable declaration is a bug. Components read
`var(--color-*)` and nothing else.

### 2. Tech Stack Decisions
- **Vite & React & TypeScript**: Chosen for lightning-fast bundling, structured component-based development, and strong typing.
- **Vanilla CSS**: Instead of Tailwind CSS, a hand-written token layer in `src/index.css` holds the palette, the type scale, the band backgrounds and the panel/button shapes. Components style themselves with `const styles: Record<string, React.CSSProperties>` reading those tokens.
- **Lucide React**: For sharp, lightweight icons mapping itch.io, Google Play, and custom platform links.

---

## 📂 File Structure

```
theevilent/
├── public/
│   ├── arcane-casters-logo.png  # Hero logotype (two lines)
│   ├── arcane-casters-wordmark.png # Navbar logotype (one line)
│   ├── hero-canopy.webp         # Treetops cropped from the match screen
│   ├── gameplay/                # Play Store match screens
│   └── theevilent-logo.png      # Team logo (Dark Ent with crimson eyes)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Translucent glassmorphic header
│   │   ├── Footer.tsx           # Link aggregator (itch.io, Play Store)
│   │   └── ParticleBackground.tsx # HTML5 Canvas drifting leaves
│   ├── pages/
│   │   ├── Home.tsx             # Interactive Hero & team pitch
│   │   ├── Games.tsx            # Arcane Casters details & media
│   │   └── Team.tsx             # monolong & yunseong developer bios
│   ├── App.tsx                  # Main router and page transition controller
│   ├── index.css                # Theme tokens, global type, bands & panels
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

## Project Skills

This repository keeps its own skills under `.agents/skills/`. Read the one that covers the task before starting. An agent that only auto-loads skills from its own home directory does not see these, so open the file by path.

- `.agents/skills/frontend-design/SKILL.md` — builds distinctive, production-grade frontend web components, pages, and applications with high design quality, avoiding generic AI aesthetics.
- `.agents/skills/verify-homepage/SKILL.md` — compiles the Vite React project and runs Playwright tests to visually verify the Home, Games, and Team pages of the Evil Ent homepage.
- `.agents/skills/web-interface-guidelines/SKILL.md` — reviews UI code for compliance with the Vercel Web Interface Guidelines.

---

## 🔬 Visual Verification & Validation Skill

We have created an automated visual verification skill script:
- **Path**: `.agents/skills/verify-homepage/verify_homepage.sh`

This script automates the complete validation process:
1. **Compilation Check**: Runs `npm run build` to verify TypeScript type-checks and Vite compilation.
2. **Visual Verification**: Launches the local dev server and runs Playwright tests (`npx playwright test`) to capture full-page layout screenshots of the Home, Games, and Team tabs.

## Arcane Casters Content Sources

- Treat `WordOnlineClient/Assets/Localization` as the source of truth for Korean
  magic and summon names. Resolve the key in `Magic Shared Data.asset`, then use
  the row with the same `m_Id` in `Magic_ko-KR.asset`.
- Do not replace a localized Korean name with a newly invented concept name. A
  concept subtitle may be added separately when needed.
- If the client has no Korean display-name row, record the gap explicitly. Use
  wording already present in the client's Korean description or art catalog only
  as a temporary exception; do not silently establish a new canonical name.
- Runtime artwork comes from `WordOnlineClient/Assets/Resources/Game/sprites/`.
  Website WebP files are display copies, not the production source.
- Keep Arcane Casters content under the `/arcane-casters` URL hierarchy:
  `/arcane-casters/magic[/<slug>]` and
  `/arcane-casters/summons[/<slug>]`. Do not add new `#magic` or `#summons`
  routes; those hashes exist only as legacy redirects.

### Running the Skill:
To execute this verification flow at any time:
```bash
./.agents/skills/verify-homepage/verify_homepage.sh
```
