---
order: 5
hide_menu: false
metas:
  description: "Deploy the Bifrost AI gateway with PostgreSQL, persistent storage, mounted configuration, and required administrator credentials."
  keywords: ["Bifrost Brainpod", "AI gateway", "LLM gateway", "Bifrost PostgreSQL"]
---
# Bifrost

The Bifrost blueprint deploys a self-hosted AI gateway with a PostgreSQL store for configuration and request data.

## Prerequisites

Choose an administrator username and a password of at least eight characters. Store the password in a secret manager before installing the blueprint.

## Resources

- One Disk for PostgreSQL data
- One PostgreSQL 16 database
- One Config containing Bifrost configuration
- One App running Bifrost `1.6.5` on port `8080`
- One Route with a 300-second request timeout

The Config is mounted into the App. Database references and administrator credentials are injected through environment variables.

## Deploy

1. Open **Blueprints** in the target pod.
2. Select **Bifrost**.
3. Enter a deployment name, administrator username, and administrator password.
4. Review the generated resource set.
5. Deploy and wait for all resources to become healthy.
6. Open the generated Route and authenticate with the configured administrator account.

## Next steps

- [PostgresDB](../resources/postgres.md): Review the database configuration
- [Config](../resources/config.md): Understand mounted configuration files
- [Custom domains](../custom_domains.md): Attach a domain
