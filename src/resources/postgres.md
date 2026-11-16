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

When you create a PostgresDB, Brainpod runs a PostgreSQL instance inside your pod and exposes it at a private hostname such as `db.default.pod.internal`. The hostname resolves only inside the owning pod; it is not a public endpoint.

Your data is stored on a Disk resource that you attach at creation time. This means the data survives restarts, redeployments, and revision changes. The Disk is managed separately and persists even if you delete the PostgresDB resource.

By default, Brainpod creates a database named `brainpod` with a user named `brainpod`. The password is generated automatically and managed securely.

## Configuring a PostgresDB

PostgresDB has four fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `db` or `postgres`.
- **Instance**: The compute size for your database: `.5x`, `1x`, `2x`, `4x`, or `8x`.
- **Version**: PostgreSQL 16, 17, and 18 are supported. New databases default to version 16.
- **Disk**: The Disk resource that stores your data. The console proposes a new Disk when you create a database, or you can select an existing compatible Disk. This field cannot be changed after creation.

The instance size can be changed later if you need to scale up. The version and disk reference are immutable. Brainpod does not perform an in-place major-version upgrade: create a new PostgresDB and migrate the data when moving between major versions. Do not attach a Disk initialized by one PostgreSQL major version to another major version.

## Connecting to PostgresDB

Apps connect to PostgresDB using environment variables. When you reference a PostgresDB resource in an app's environment, Brainpod automatically makes the following variables available:

| Variable | Description |
|---|---|
| `${name.host}` | Pod-scoped hostname (`<name>.default.pod.internal`) |
| `${name.port}` | Port (`5432`) |
| `${name.user}` | Database user (`brainpod`) |
| `${name.database}` | Database name (`brainpod`) |
| `${name.password}` | Generated password (injected securely) |
| `${name.uri}` | Full connection string |

Replace `name` with the name of your PostgresDB resource. The connection string uses the `postgres://` scheme with TLS required:

```
postgres://brainpod:<password>@<name>.default.pod.internal:5432/brainpod?sslmode=require
```

In your app's environment variable configuration, you would set it up like this:

- **Name**: `DATABASE_URL`
- **Value**: `${db.uri}` (where `db` is your PostgresDB resource name)

Resource details show the hostname as **Internal DNS**. Prefer `${db.host}` or `${db.uri}` over hardcoding it. See [Private networking](apps.md#private-networking) for DNS scope and redeployment requirements; use a database tunnel for access from your computer.

## Work in the browser console

Open the PostgresDB resource and choose **Open console** to work with the deployed database in your browser. The workspace includes a schema tree for tables, views, materialized views, functions, and procedures; an SQL editor; and **Data**, **Structure**, and **Messages** result tabs.

Opening a table prepares and runs a quoted `SELECT` query. Use the row-limit selector to request 50 to 1,000 rows. Multi-statement queries show a result switcher. Queries use the database application user and can write data when that user has permission, so review statements before running them. The connection opens with the page and closes when you leave; use **Reconnect** if the session ends.

The browser console is available for PostgreSQL only. Use a [database tunnel](../database-tunnels.md) for PostgreSQL clients on your computer and for other database engines.

## Back up and restore

Use the resource's **Backups** tab to select or create Pod-scoped Bucket storage, deploy that storage choice, run an on-demand backup, and review restore history. See [Database backups](../database-backups.md) for the complete workflow and restore warnings.

## Use the CLI

Inspect the schema and exported variables before creating the resource:

```sh
brainpod describe resource postgres --json
brainpod --pod my-pod resource variables postgres db
```

Open a temporary tunnel for `psql`, DBeaver, or another local PostgreSQL client:

```sh
brainpod --pod my-pod tunnel db 127.0.0.1:15432
```

Keep the command running and use the client command or connection string it prints. The API key requires `database:connect`; name resolution and credential retrieval also require `resources:read`. See [Database tunnels](../database-tunnels.md) for session and security behavior.

## Next Steps

- [Apps](apps.md): Connect your app to a PostgresDB
- [Disks](disks.md): Create a disk for your database to use
- [MariaDB](mariadb.md): MySQL-compatible alternative
- [Database backups](../database-backups.md): Configure storage, back up, and restore
- [Database tunnels](../database-tunnels.md): Connect a local PostgreSQL client
- [Resources](../resources.md): Overview of Brainpod resources
