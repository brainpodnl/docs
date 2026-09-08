# Brainpod Docs

The documentation site for [Brainpod](https://brainpod.io), published at [docs.brainpod.io](https://docs.brainpod.io).

Built with [Lume](https://lume.land) and the [simple-wiki](https://github.com/lumeland/theme-simple-wiki) theme.

## Development

Requires [Deno](https://deno.land).

```bash
deno task serve
```

The site will be available at `http://localhost:3000` with hot reload.

## Build

```bash
deno task build
```

Output is written to `./_site`.

## Structure

- `src/`: Published documentation and site assets
- `src/resources/`: Resource reference
- `src/blueprints/`: Blueprint guides
- `src/_includes/`: Theme template overrides and categorized sidebar navigation
- `src/llms.page.ts`: Generated `llms.txt` and `llms-full.txt` endpoints
- `.pi/skills/update-docs/`: Documentation synchronization skill

## Adding a Page

Create a new `.md` file in the appropriate directory and add frontmatter:

```yaml
---
order: 5           # Controls position in the sidebar
hide_menu: false
metas:
  description: "Page description for search engines."
  keywords: ["keyword one", "keyword two"]
---
# Page Title
```

Add every published page to the appropriate group in `src/_includes/templates/menu.vto`. Resource and blueprint pages use collapsible groups in the sidebar.

## LLM-readable documentation

The build publishes two text endpoints:

- `/llms.txt`: A concise, categorized index of the documentation
- `/llms-full.txt`: The complete documentation corpus in one text file

Both files are generated from published Markdown by `src/llms.page.ts`. Do not edit files in `_site/`.

## Updating from product sources

Use the project skill when synchronizing documentation with the platform, CLI, or public API:

```text
/skill:update-docs
```

The skill treats `../brainpod`, `../cli`, and the public OpenAPI contract as authoritative sources and documents its verification requirements.
