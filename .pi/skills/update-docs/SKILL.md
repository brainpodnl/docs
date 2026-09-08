---
name: update-docs
description: Audit and update the Brainpod documentation from the adjacent brainpod platform repository, Brainpod CLI repository, and public OpenAPI contract. Use when product behavior, resources, CLI commands, API behavior, blueprints, onboarding, or operational workflows may have changed.
compatibility: Requires the docs, brainpod, and cli repositories to be sibling directories. Live API comparison requires network access.
---

# Update Brainpod Documentation

Keep the documentation accurate, task-oriented, and traceable to an authoritative implementation source. Do not infer product behavior from existing documentation when source code or a machine-readable contract is available.

## Repository layout

Resolve paths from the documentation repository root rather than using absolute paths:

- Documentation: `.`
- Platform and console: `../brainpod`
- CLI: `../cli`
- Public API contract: derive the OpenAPI URL from `../cli/src/openapi.rs`; use the embedded `../cli/src/openapi.json` as the offline fallback

Stop and report the missing source if either sibling repository is unavailable. Never silently continue from stale documentation alone.

## Safety and preparation

1. Read `AGENTS.md` in the documentation repository and every source repository before inspecting their implementation.
2. Run `jj status` in repositories that support Jujutsu. Otherwise use read-only `git status`.
3. Preserve all pre-existing changes. Do not edit either source repository.
4. Do not run project-defined scripts, builds, tests, generators, installers, or commands that can alter external data unless the user explicitly requests them.
5. Never send credentials when retrieving the public OpenAPI document. Never copy tokens, secret values, internal hostnames, private endpoints, or customer data into documentation.

## Source authority

Use the narrowest authoritative source for each claim:

| Documentation subject | Primary source | Supporting source |
|---|---|---|
| CLI commands, flags, defaults, and output | `brainpod describe [<command>...] --json` from the current `../cli` revision, when a matching binary is available | `../cli/src/cmd/`, `../cli/src/output.rs`, and `../cli/README.md` |
| Resource fields, constraints, and exported variables | `brainpod describe resource <kind> --json` and the live OpenAPI contract | `../cli/src/openapi.json`, `../brainpod/web/lib/schemas.ts`, and revision engine code |
| Public REST endpoints and schemas | Live OpenAPI document at the URL defined in `../cli/src/openapi.rs` | `../cli/src/openapi.json` and `../brainpod/web/api/` |
| Console workflows and labels | `../brainpod/web/routes/`, `../brainpod/web/islands/`, and `../brainpod/web/components/` | tRPC routers and repository code |
| Deployment and runtime behavior | `../brainpod/control-plane/` and `../brainpod/pod-controller/` | shared types and platform tests |
| Blueprints | `../brainpod/web/lib/blueprints/` | blueprint schemas, readmes, and integration tests |
| Existing wording and navigation | `src/` in this repository | generated site output only as a rendering aid |

If sources disagree, prefer executable contracts and implementation over README prose. Record the conflict in the final report instead of concealing it. Do not present an unstable implementation detail as a public guarantee.

## Workflow

### 1. Define the change set

- Read the user request and identify the affected user journeys.
- Inspect recent source changes since the last relevant documentation update using read-only `jj log`, `jj diff`, or `git log` and `git show`.
- Search existing documentation for claims affected by those changes.
- Build a short source-to-page map before editing.

For a broad synchronization request, audit at least:

- onboarding and account setup;
- pods, revisions, and deployment states;
- every supported resource kind;
- builds, registry, domains, API keys, and events;
- CLI installation, configuration, commands, and output contracts;
- blueprints and their current topology;
- public API base URLs, authentication, schemas, errors, and pagination where exposed.

### 2. Compare contracts

When network access is allowed, retrieve the live OpenAPI document from the URL defined by `../cli/src/openapi.rs` and compare it with `../cli/src/openapi.json`. Treat a failed live request as an explicit offline condition, not evidence that the embedded contract is current.

When a matching CLI binary is available, use its JSON describe commands. Confirm that the binary revision matches `../cli` before treating runtime output as authoritative. Otherwise inspect the CLI source and state that runtime verification was unavailable.

For every changed claim, retain a private working note with:

- documentation page;
- source path or contract location;
- behavior before and after;
- whether the behavior is public, internal, or uncertain.

Do not add these notes to published pages.

### 3. Write professional documentation

- Lead with the user's objective and expected outcome.
- State prerequisites before procedures.
- Use numbered steps for ordered actions and bullets for choices or reference data.
- Use exact UI labels, command names, field names, states, defaults, and limits from source.
- Explain operational consequences, especially whether a change affects a draft or deployed revision.
- Include copyable examples with realistic placeholders and no secrets.
- Use sentence case for headings and direct, neutral language.
- Avoid contractions, hype, jokes, vague assurances, and unsourced compliance or reliability claims.
- Define a term once, then use it consistently.
- Add troubleshooting only for failure modes verified in source.
- End task guides with focused next steps rather than a generic list of every page.

Match existing frontmatter. Every published page needs a unique description that states its practical purpose. Keep navigation order intentional.

### 4. Keep machine-readable documentation current

`src/llms.page.ts` generates `/llms.txt` and `/llms-full.txt` from published Markdown. Do not hand-edit generated output in `_site/`.

After adding or renaming a page:

- ensure it has one H1 and a concise `metas.description`;
- ensure its source-relative links resolve correctly;
- confirm that `sectionFor()` classifies any new top-level content appropriately;
- exclude pages that should not enter the public LLM corpus.

### 5. Review

Review the final diff against the source-to-page map:

- Every new factual claim has a source.
- Removed behavior is no longer described elsewhere.
- CLI examples match the current command contract.
- Resource examples satisfy current schemas.
- Public URLs match current endpoint configuration.
- Links and page titles are consistent.
- The landing page and navigation expose important new content.
- No generated `_site/` files, credentials, or unrelated changes are included.

Run only non-destructive static checks allowed by the repository instructions, such as `deno check` and `deno fmt --check`. Do not run the Lume build or project tasks unless the user explicitly asks.

## Final report

State:

- pages added, updated, renamed, or removed;
- source contracts used, including whether live API and CLI runtime checks succeeded;
- meaningful source conflicts or unresolved uncertainty;
- static checks run and their results;
- builds, tests, or live checks skipped.
