---
order: 6
hide_menu: false
metas:
  description: "Deploy Ghost with a dedicated MariaDB database and persistent storage for content, themes, and uploads."
  keywords: ["Ghost Brainpod", "deploy Ghost", "Ghost MariaDB", "publishing platform"]
---
# Ghost

The Ghost blueprint deploys the Ghost publishing platform with persistent application and database storage.

## Resources

- One Disk for MariaDB data
- One Disk for Ghost content, themes, and uploads
- One MariaDB 11 database
- One App running Ghost `5.130.6` on port `2368`
- One Route targeting the App

Database connection details are injected from the MariaDB resource. The Ghost content disk is mounted at the path expected by the container image.

## Deploy

1. Open **Blueprints** in the target pod.
2. Select **Ghost** and enter a deployment name.
3. Review and deploy the generated resources.
4. Wait for MariaDB and the App to become healthy.
5. Open the generated Route and complete Ghost's initial setup.

## Next steps

- [MariaDB](../resources/mariadb.md): Review database variables
- [Disks](../resources/disks.md): Understand persistent storage
- [Custom domains](../custom_domains.md): Attach a publishing domain
