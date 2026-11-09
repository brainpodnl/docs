---
order: 8
hide_menu: false
metas:
  description: "Configure Brainpod Bucket storage for PostgreSQL and MariaDB backups, create backups on demand, and restore from backup history."
  keywords: ["Brainpod database backups", "PostgreSQL backup", "MariaDB backup", "restore database", "Bucket storage"]
---
# Database backups

Brainpod can back up deployed PostgreSQL and MariaDB resources to a Bucket in the same pod. Backup and restore jobs use the pod's storage gateway, so provider credentials are not placed in the database workload job.

## Configure backup storage

1. Open a PostgresDB or MariaDB resource.
2. Select the **Backups** tab.
3. Under **Backup storage**, select an existing Bucket in the pod or create a new Bucket.
4. Save the storage choice. This changes the pod's draft and does not queue a backup.
5. Review and deploy the draft.
6. Wait until the Backups tab reports that storage is ready.

The selected Bucket must be part of the deployed revision. When the tab reports **Deployment required**, deploy the pod before starting a backup. When it reports **Preparing**, wait for the deployed Bucket to become ready.

## Create a backup

When backup storage and the deployed database are ready, select **Back up now**. Only one database backup or restore operation can run at a time for that resource. Follow the operation in **Backup history**.

If the console asks you to redeploy the database to enable backups and restores, deploy a fresh revision before retrying.

## Restore a backup

1. Open **Backup history**.
2. Select the completed backup to restore.
3. Review the confirmation and select **Restore backup**.

A restore replaces the database's current data, disconnects active sessions, and temporarily makes the database read-only. The action cannot be undone. Create and verify a current backup before restoring when you may need the present state later.

## Existing backup storage

The gateway-backed storage flow does not automatically adopt or copy objects from the retired legacy S3 operator. A historical backup record without a durable Bucket identifier cannot be restored through the console. Configure a current Bucket and create a fresh backup before relying on the new restore workflow.

## Next steps

- [PostgresDB](resources/postgres.md): Configure PostgreSQL
- [MariaDB](resources/mariadb.md): Configure MariaDB
- [Brainpod resources](resources.md): Review draft and deployment behavior
