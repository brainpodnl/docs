---
order: 4
hide_menu: false
metas:
  description: "Compare Brainpod blueprints for WordPress, PocketBase, Bifrost, Ghost, Forgejo, ResourceSpace, Lightdash, Next.js, Laravel, and Django deployments."
  keywords: ["Brainpod blueprints", "WordPress", "PocketBase", "Bifrost", "Ghost", "Forgejo", "ResourceSpace", "Lightdash", "Next.js", "Laravel", "Django"]
---
# Blueprints

Blueprints install a predefined set of resources on a pod's mutable head. You can review the resulting draft before deploying it.

## Software

- **[WordPress](blueprints/wordpress.md)**: WordPress with MariaDB and persistent application storage
- **[PocketBase](blueprints/pocketbase.md)**: PocketBase with persistent SQLite and file storage
- **[Bifrost](blueprints/bifrost.md)**: AI gateway with PostgreSQL and mounted configuration
- **[Ghost](blueprints/ghost.md)**: Publishing platform with MariaDB and persistent content storage
- **[Forgejo](blueprints/forgejo.md)**: Git forge with PostgreSQL and repository storage
- **[ResourceSpace](blueprints/resourcespace.md)**: Digital asset management with MariaDB and persistent media storage
- **[Lightdash](blueprints/lightdash.md)**: Business intelligence with PostgreSQL and external S3-compatible storage

## Frameworks

Framework blueprints create an App that waits for a build artifact. Connect a repository and complete a successful build before the application can serve traffic.

- **[Next.js](blueprints/nextjs.md)**: Next.js App and Route on port 3000
- **[Laravel](blueprints/laravel.md)**: Laravel App with MariaDB and generated application configuration
- **[Django](blueprints/django.md)**: Django App with PostgreSQL and generated application configuration

## Install a blueprint

In the console:

1. Open the target pod.
2. Select **Blueprints**.
3. Select a blueprint and complete its required inputs.
4. Choose whether to keep the result as a draft or install and deploy it.
5. Review the generated resources and deployment status.

With the CLI:

```sh
brainpod blueprint list
brainpod blueprint get wordpress
brainpod --pod my-pod blueprint install wordpress
brainpod --pod my-pod deploy --wait
```

Installing through the API or CLI changes the mutable head without deploying it. Run `deploy` after reviewing the result.

Blueprint resource names are prefixed during installation so that references remain local to the installed stack.

## Next steps

- [Brainpod CLI](cli.md): Inspect blueprint metadata and input schemas
- [Builds](builds.md): Connect a framework blueprint to a repository
- [Resources](resources.md): Understand the generated resource graph
