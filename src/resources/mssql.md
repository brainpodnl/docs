---
order: 8
hide_menu: false
metas:
  description: "Provision a managed Microsoft SQL Server Express database on Brainpod, attach persistent storage, and connect applications or local database clients."
  keywords: ["Brainpod SQL Server", "Microsoft SQL Server", "MSSQL", "SQL Server Express", "managed database"]
---
# SQL Server

An MSSQL resource provisions Microsoft SQL Server Express with persistent storage inside your pod. Applications connect through the pod network; local database clients can connect through a temporary Brainpod database tunnel.

## Configuration

| Field | Supported values | Notes |
|---|---|---|
| **Name** | 1–63 characters | Unique resource name in the `default` namespace |
| **Version** | `2022`, `2025` | Immutable after creation |
| **Edition** | `express` | Immutable after creation |
| **Instance** | `2x`, `4x`, `8x` | SQL Server requires at least the `2x` instance size |
| **Disk** | Disk resource reference | Stores the database data |

The console requires acceptance of the Microsoft SQL Server licence terms during creation. SQL Server Express does not include Brainpod-managed backups; establish a separate backup process for data that must be recoverable.

## Exported variables

Replace `name` with the MSSQL resource name:

| Variable | Description |
|---|---|
| `${name.host}` | Cluster-internal hostname |
| `${name.port}` | SQL Server port (`1433`) |
| `${name.user}` | Database user (`brainpod`) |
| `${name.database}` | Database name (`brainpod`) |
| `${name.password}` | Generated password, injected as a secret |
| `${name.uri}` | Full SQL Server connection string, including the password |

Configure an App environment variable with a reference rather than copying credentials:

```text
DATABASE_URL=${db.uri}
```

The connection string uses the `sqlserver://` scheme with encryption enabled.

## Connect from your computer

Open a temporary local tunnel to a deployed SQL Server resource:

```sh
brainpod --pod my-pod tunnel db 127.0.0.1:11433
```

Use the host, port, username, password, and database printed by the CLI in SQL Server Management Studio, DBeaver, or another compatible client. See [Database tunnels](../database-tunnels.md) for permissions and session behavior.

## Operational limits

SQL Server Express applies edition-specific database, compute, and memory limits. Brainpod restricts disk size according to the selected version:

- SQL Server 2022 Express: database size up to 10 GB and disk size up to 20 GB
- SQL Server 2025 Express: database size up to 50 GB and disk size up to 60 GB

Changing the instance size does not change the SQL Server Express edition limits.

## Next steps

- [Disks](disks.md): Configure persistent storage
- [Apps](apps.md): Reference database variables from an application
- [Database tunnels](../database-tunnels.md): Connect a local database client
- [API keys](../api-keys.md): Grant `database:connect`
