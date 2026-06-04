# Project Workflow

## Issue First

Create or identify a GitHub issue before starting non-trivial implementation.

- New work starts from an issue.
- The issue defines scope, acceptance criteria, and validation.
- Pull requests must link the issue with `Closes #<issue num>` or `Refs #<issue num>`.

## Branch Naming

Branches must use:

```text
<label>/<issue num>
```

Examples:

```text
feature/3
fix/7
chore/12
docs/15
```

Rules:

- `label` is the issue/work type.
- `issue num` is the GitHub issue number.
- Do not add extra descriptive suffixes after the issue number.
- If the wrong branch name was created, rename before opening the PR.

## Pull Request Flow

1. Create or confirm the issue.
2. Create branch `<label>/<issue num>`.
3. Implement only the issue scope.
4. Run validation before commit.
5. Commit with a terse message.
6. Push the branch.
7. Open a draft PR linked to the issue.

## Validation

For homepage/UI work, run:

```bash
npm run build
npm run lint
./.agents/skills/verify-homepage/verify_homepage.sh
```
