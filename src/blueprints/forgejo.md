---
order: 7
hide_menu: false
metas:
  description: "Deploy Forgejo with PostgreSQL and persistent repository storage for a self-hosted Git forge."
  keywords: ["Forgejo Brainpod", "self-hosted Git", "deploy Forgejo", "Forgejo PostgreSQL"]
---
# Forgejo

The Forgejo blueprint deploys a self-hosted Git forge with PostgreSQL and persistent storage for repositories and attachments.

## Resources

- One Disk for PostgreSQL data
- One Disk for repositories and attachments
- One PostgreSQL 16 database
- One App running Forgejo `15.0.3` on port `3000`
- One Route targeting the App

The App receives its database configuration from PostgreSQL resource variables and includes an HTTP readiness check.

## Deploy

1. Open **Blueprints** in the target pod.
2. Select **Forgejo** and enter a deployment name.
3. Review and deploy the generated resources.
4. Wait for PostgreSQL and the App to become healthy.
5. Open the generated Route and register the first account.

The first registered Forgejo user becomes the administrator. Control access to the Route until that account has been created.

## Next steps

- [PostgresDB](../resources/postgres.md): Review database variables
- [Disks](../resources/disks.md): Understand repository storage
- [Custom domains](../custom_domains.md): Attach a Git domain
