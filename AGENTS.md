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

The site is Arcane Casters' site and wears the Unity client's flat design
(ArcaneCastersClient #129). `:root` in `src/index.css` holds every token; there
is no second theme.

- **Color Scheme**: Sampled from the client's WebGL screens
  (`client/docs/pr-media/129`):
  - `#0d2238` navy ground (the Magic Book) · `#0a1a2c` header and footer strip
  - `#22425f` the tile a sprite sits in
  - `#14121a` ink: every outline and every drop shadow
  - `#ff9a1c` orange buttons · `#ff6b1b` outlined titles · `#fdd33d` selection
  - the lobby's grass texture (`public/brand/grass.jpg`) behind the hero and
    the team page
- **Type**: Lilita One for titles and buttons, Jua for body text — the two
  faces the client sets its UI in — loaded from Google Fonts.
- **Shape**: Every raised thing has a 3px ink outline and a solid ink drop
  below it (`.flat-card`, `.flat-btn`, `.tile`). White text on orange always
  carries an ink outline (`.text-outline`). No gradients, no glow, no blurred
  shadows.
- **Copy**: Short, and only where the picture cannot say it. Korean is 해요체.
- **Language**: Korean and English. `src/i18n/language.tsx` holds the choice;
  each component keeps its own `{ ko, en }` strings and reads them with
  `useCopy`.

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
│   ├── brand/                   # Client logo, grass, hero characters
│   ├── gameplay/                # Play Store match screens
│   └── theevilent-logo.png      # Team logo (Dark Ent with crimson eyes)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Menu and language switch
│   │   ├── Footer.tsx           # Studio, store links, legal links
│   │   └── LanguageToggle.tsx   # 한국어 / English switch
│   ├── i18n/language.tsx        # Language choice, useCopy
│   ├── pages/
│   │   ├── Home.tsx             # The game: hero, how to play, gameplay
│   │   ├── MagicCompendium.tsx  # /arcane-casters/magic[/<slug>]
│   │   └── Team.tsx             # monolong & yunseong
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
- `.agents/skills/verify-homepage/SKILL.md` — compiles the Vite React project and runs Playwright tests to visually verify the Home, Magic, and Team pages of the Evil Ent homepage.
- `.agents/skills/web-interface-guidelines/SKILL.md` — reviews UI code for compliance with the Vercel Web Interface Guidelines.

---

## 🔬 Visual Verification & Validation Skill

We have created an automated visual verification skill script:
- **Path**: `.agents/skills/verify-homepage/verify_homepage.sh`

This script automates the complete validation process:
1. **Compilation Check**: Runs `npm run build` to verify TypeScript type-checks and Vite compilation.
2. **Visual Verification**: Launches the local dev server and runs Playwright tests (`npx playwright test`) to capture full-page layout screenshots of the Home, Magic, and Team pages.

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
