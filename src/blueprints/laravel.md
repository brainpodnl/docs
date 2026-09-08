---
order: 4
hide_menu: false
metas:
  description: "Deploy a Laravel application blueprint with MariaDB, generated application configuration, and an App ready for a build artifact."
  keywords: ["Laravel Brainpod", "deploy Laravel", "Laravel MariaDB", "PHP application hosting"]
---
# Laravel

The Laravel blueprint creates the infrastructure for a Laravel application and waits for an application image from the connected build workflow.

## Resources

- One Disk for MariaDB data
- One MariaDB 11 database
- One App configured for port `8000`
- One Route targeting the App

The blueprint configures `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` from the MariaDB resource. It also generates `APP_KEY` and sets `APP_ENV=production`.

## Deploy

1. Open **Blueprints** in the target pod.
2. Select **Laravel** and enter a deployment name.
3. Install the blueprint.
4. Open the generated App and connect the Laravel repository.
5. Merge the onboarding pull request and complete a successful build.
6. Deploy the resulting revision and monitor the App's events.

The initial App uses a placeholder image and cannot serve the Laravel application until a build artifact is available.

## Next steps

- [Builds](../builds.md): Configure repository builds
- [MariaDB](../resources/mariadb.md): Review database variables
- [Custom domains](../custom_domains.md): Attach a domain
