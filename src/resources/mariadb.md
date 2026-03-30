---
order: 6
hide_menu: false
metas:
  description: "Managed MariaDB databases on Brainpod. Provision a MariaDB resource and connect your apps to a fully managed MariaDB instance."
  keywords: ["Brainpod MariaDB", "managed database", "cloud MariaDB", "MySQL compatible", "managed SQL"]
---
# MariaDB

A MariaDB resource provisions a managed MariaDB database inside your pod. MariaDB is MySQL-compatible, so any app or framework that supports MySQL can connect to it. Brainpod handles deployment, configuration, TLS, and health monitoring.

## How MariaDB Works

When you create a MariaDB resource, Brainpod runs a MariaDB instance inside your pod and exposes it at a stable hostname-the resource name you chose. The database is only accessible from within your pod; it is not reachable from the internet.

Your data is stored on a Disk resource that you attach at creation time. This means the data survives restarts, redeployments, and revision changes. The Disk is managed separately and persists even if you delete the MariaDB resource.

By default, Brainpod creates a database named `brainpod` with a user named `brainpod`. The password is generated automatically and managed securely.

## Configuring a MariaDB

MariaDB has four fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `db` or `mysql`.
- **Instance**: The compute size for your database. Choose based on your expected load: `.5x`, `1x`, `2x`, or `4x`.
- **Version**: The MariaDB version. Currently, version 11 is supported.
- **Disk**: The Disk resource that stores your data. You must create a Disk first and reference it here. This field cannot be changed after creation.

The instance size can be changed later if you need to scale up. The version and disk reference are immutable.

## Connecting to MariaDB

Apps connect to MariaDB using environment variables. When you reference a MariaDB resource in an app's environment, Brainpod automatically makes the following variables available:

| Variable | Description |
|---|---|
| `${name.host}` | Hostname of the database |
| `${name.port}` | Port (`3306`) |
| `${name.user}` | Database user (`brainpod`) |
| `${name.database}` | Database name (`brainpod`) |
| `${name.password}` | Generated password (injected securely) |
| `${name.uri}` | Full connection string |

Replace `name` with the name of your MariaDB resource. The connection string uses the `mysql://` scheme:

```
mysql://brainpod:<password>@<name>:3306/brainpod
```

In your app's environment variable configuration, you would set it up like this:

- **Name**: `DATABASE_URL`
- **Value**: `${db.uri}` (where `db` is your MariaDB resource name)

## Next Steps

- [Disks](disks.md): Create a disk for your database to use
- [Apps](apps.md): Connect your app to a MariaDB
- [PostgresDB](postgres.md): PostgreSQL alternative
- [Resources](../resources.md): Overview of Brainpod resources
