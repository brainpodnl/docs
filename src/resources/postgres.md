---
order: 5
hide_menu: false
metas:
  description: "Managed PostgreSQL databases on Brainpod. Provision a PostgresDB resource and connect your apps to a fully managed PostgreSQL instance."
  keywords: ["Brainpod PostgreSQL", "managed database", "PostgresDB", "cloud PostgreSQL", "managed Postgres"]
---
# PostgresDB

A PostgresDB resource provisions a managed PostgreSQL database inside your pod. Brainpod handles deployment, configuration, TLS, and health monitoring. You just create the resource and connect your apps to it.

## How PostgresDB Works

When you create a PostgresDB, Brainpod runs a PostgreSQL instance inside your pod and exposes it at a stable hostname-the resource name you chose. The database is only accessible from within your pod; it is not reachable from the internet.

Your data is stored on a Disk resource that you attach at creation time. This means the data survives restarts, redeployments, and revision changes. The Disk is managed separately and persists even if you delete the PostgresDB resource.

By default, Brainpod creates a database named `brainpod` with a user named `brainpod`. The password is generated automatically and managed securely.

## Configuring a PostgresDB

PostgresDB has four fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `db` or `postgres`.
- **Instance**: The compute size for your database. Choose based on your expected load: `.5x`, `1x`, `2x`, or `4x`.
- **Version**: The PostgreSQL version. Currently, version 16 is supported.
- **Disk**: The Disk resource that stores your data. You must create a Disk first and reference it here. This field cannot be changed after creation.

The instance size can be changed later if you need to scale up. The version and disk reference are immutable.

## Connecting to PostgresDB

Apps connect to PostgresDB using environment variables. When you reference a PostgresDB resource in an app's environment, Brainpod automatically makes the following variables available:

| Variable | Description |
|---|---|
| `${name.host}` | Hostname of the database |
| `${name.port}` | Port (`5432`) |
| `${name.user}` | Database user (`brainpod`) |
| `${name.database}` | Database name (`brainpod`) |
| `${name.password}` | Generated password (injected securely) |
| `${name.uri}` | Full connection string |

Replace `name` with the name of your PostgresDB resource. The connection string uses the `postgres://` scheme with TLS required:

```
postgres://brainpod:<password>@<name>:5432/brainpod?sslmode=require
```

In your app's environment variable configuration, you would set it up like this:

- **Name**: `DATABASE_URL`
- **Value**: `${db.uri}` (where `db` is your PostgresDB resource name)

## Next Steps

- [Disks](disks.md): Create a disk for your database to use
- [Apps](apps.md): Connect your app to a PostgresDB
- [MariaDB](mariadb.md): MySQL-compatible alternative
- [Resources](../resources.md): Overview of Brainpod resources
