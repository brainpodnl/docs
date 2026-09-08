---
order: 8
hide_menu: false
metas:
  description: "Deploy a Django application blueprint with PostgreSQL, generated secrets, and an App ready for a build artifact."
  keywords: ["Django Brainpod", "deploy Django", "Django PostgreSQL", "Python application hosting"]
---
# Django

The Django blueprint creates the infrastructure for a Django application and waits for an application image from the connected build workflow.

## Resources

- One Disk for PostgreSQL data
- One PostgreSQL 16 database
- One App configured for port `8000`
- One Route targeting the App

The blueprint configures `DATABASE_URL` and the individual `DB_*` values from PostgreSQL resource variables. It also configures the assigned hostname for `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`.

## Deploy

1. Open **Blueprints** in the target pod.
2. Select **Django** and enter a deployment name.
3. Install the blueprint.
4. Open the generated App and connect the Django repository.
5. Merge the onboarding pull request and complete a successful build.
6. Deploy the resulting revision and monitor the App's events.

The initial App uses a placeholder image and cannot serve the Django application until a build artifact is available.

## Next steps

- [Builds](../builds.md): Configure repository builds
- [PostgresDB](../resources/postgres.md): Review database variables
- [Custom domains](../custom_domains.md): Attach a domain
