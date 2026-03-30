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

```
src/
├── index.md                  # Homepage
├── getting-started.md        # Getting started guide
├── brainpod.md               # Core concepts
├── background-information.md # Cloud-native background
├── resources.md              # Resources overview
├── resources/
│   ├── apps.md               # Apps resource
│   ├── routes.md             # Routes resource
│   ├── disks.md              # Disks resource
│   ├── config.md             # Config resource
│   ├── postgres.md           # PostgresDB resource
│   ├── mariadb.md            # MariaDB resource
│   └── valkey.md             # Valkey resource
├── blueprints.md             # Blueprints overview
├── blueprints/
│   ├── wordpress.md          # WordPress blueprint
│   ├── pocketbase.md         # PocketBase blueprint
│   └── nextjs.md             # Next.js blueprint
├── custom_domains.md         # Custom domains
└── registry.md               # Container registry
```

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

Pages inside a subdirectory (e.g. `resources/`) automatically appear nested under their parent in the sidebar.
