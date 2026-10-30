# Arcane Casters Story Authoring

This directory owns the comic's working lore, character references, scripts and
source artwork within the theevilent repository. Keep the material here until
the user requests a separate repository.

## Required reading

For comic planning, dialogue, panel layouts or artwork, use the
[comic-authoring skill](../../../.agents/skills/comic-authoring/SKILL.md).
The skill provides the workflow; the local story documents below remain the
source of truth for changing canon, character profiles and rendering.

Before drafting an episode, writing story copy or generating story artwork:

1. Read [WORLD.md](WORLD.md) for current lore, rejected premises and spoilers.
2. Follow [COMIC-STYLE.md](COMIC-STYLE.md) for rendering, panel composition and lettering.
3. Read [CHARACTERS.md](CHARACTERS.md) and inspect the relevant reference images.
4. Follow [DIALOGUE.md](DIALOGUE.md) for names, voice, restrained rivalry and nonverbal creatures.

Use its stable character IDs and current profile version when writing dialogue
or acting notes. Preserve voice, habits and relationship dynamics across episodes.
Update the central profile before changing a recurring trait, and record each
episode's ending state in its author notes instead of silently resetting it.
Keep undecided names, ages, identities and future outcomes undecided.

These are local files and must work in a standalone checkout of theevilent.
Do not depend on absolute workstation paths, another checkout or Codex's
generated-image directory.

## Canon and scope

- Apply the user's latest explicit decisions first. Then use these story
  documents. Older game-art catalogs and generated drafts do not override them.
- Distinguish confirmed decisions, working proposals and rejected premises.
  Generating an image or requesting a comparison does not approve its entire lore.
- Treat game code, localization and shipped sprites as sources for existing
  mechanics, identifiers and subject identity, not proof of new story canon.
- Do not change game mechanics, rename existing game identifiers or settle
  unresolved endings while updating comic material.
- The mastermind's true identity belongs in author-facing notes. Respect the
  reveal boundary in WORLD.md for reader-facing scripts and artwork.

## Assets and publication

- Keep reference originals in references/. Save new explorations, exact prompts
  and scripts under this story directory in clearly named subdirectories.
- Preserve approved references. Add versioned alternatives instead of overwriting.
- Do not infer episode approval from a style-reference approval.
- Keep author-only lore and draft images outside public/ and src/ imports.
  Copy only publication-ready episode assets into the website's served paths.
- If building the comic reader, follow the website's workflow and use the
  /arcane-casters URL hierarchy. The planned comic path is
  /arcane-casters/comic; these documents do not implement that route.
- Before handoff, validate changed relative links, required reference files,
  canon consistency and the scoped diff. Website build/UI checks apply when
  application code changes.
