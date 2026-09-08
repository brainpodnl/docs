---
order: 6
hide_menu: false
metas:
  description: "Open a temporary Brainpod database tunnel and connect local PostgreSQL, MariaDB, Valkey, or SQL Server clients securely."
  keywords: ["Brainpod database tunnel", "PostgreSQL tunnel", "MariaDB tunnel", "Valkey tunnel", "SQL Server tunnel"]
---
# Database tunnels

Use `brainpod tunnel` to connect a local database client to a deployed database without exposing the database to the public internet. The CLI creates a temporary session and forwards local TCP connections until you stop it.

## Prerequisites

You need:

- the Brainpod CLI with the `tunnel` command;
- a selected pod;
- a deployed PostgreSQL, MariaDB, Valkey, or Microsoft SQL Server resource;
- an API key that allows `database:connect` for the database or its pod;
- `resources:read` when identifying the database by name or retrieving connection details.

Check whether your installed CLI supports the command:

```sh
brainpod describe tunnel
```

## Open a tunnel

Identify the database by name, URN, or stable UUID:

```sh
brainpod --pod my-pod tunnel db
```

The local listener defaults to `127.0.0.1` and the database engine's standard port. Pass an address to use another local port:

```sh
brainpod --pod my-pod tunnel db 127.0.0.1:15432
```

The command displays:

- the local and remote addresses;
- the database username and database name, when applicable;
- the generated password;
- an engine-specific client command;
- a connection string.

The tunnel starts accepting connections after the **Ready** message. Keep the process running while your database client is connected, and press `Ctrl-C` to close the session.

## Connect to PostgreSQL

For a PostgreSQL tunnel on local port `15432`, the CLI prints a command equivalent to:

```sh
psql "host=127.0.0.1 port=15432 user=brainpod dbname=brainpod sslmode=require"
```

Copy the values printed by your tunnel session rather than reusing this example. Graphical clients such as DBeaver can use the displayed host, port, username, password, and database.

## Omit credential retrieval

Use `--skip-preflight` when the client already has credentials or when credentials must not be printed:

```sh
brainpod --pod my-pod tunnel db --skip-preflight
```

This skips credential retrieval and omits the password and connection string. The TCP tunnel still opens.

## Session and security behavior

- Sessions expire after two hours.
- A session permits up to ten concurrent database connections.
- The Brainpod API key is used to create the session and is not sent through the tunnel data plane.
- Database traffic and passwords do not pass through the control plane.
- Closing the CLI rejects new connections; existing connections also close at the session deadline.
- Passwords printed by the CLI are sensitive. Do not store them in shell history, logs, screenshots, or source control.

## Troubleshooting

### The command is unavailable

Install a CLI release that includes `brainpod tunnel`. Use `brainpod describe` to inspect the commands provided by the installed version.

### The database cannot be resolved

Confirm the selected pod and database identifier:

```sh
brainpod config show
brainpod resource list
```

Name and UUID resolution requires `resources:read`. A canonical resource URN can be used directly when the key has only the permissions needed for the tunnel.

### The session is denied

Update the API key policy to allow `database:connect` for the target database or pod. Add `resources:read` if the CLI also needs to resolve a name or retrieve credentials.

## Next steps

- [API keys](api-keys.md): Configure tunnel permissions
- [PostgresDB](resources/postgres.md): Configure PostgreSQL
- [MariaDB](resources/mariadb.md): Configure MariaDB
- [Valkey](resources/valkey.md): Configure Valkey
- [SQL Server](resources/mssql.md): Configure Microsoft SQL Server
