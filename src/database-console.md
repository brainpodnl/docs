---
order: 7
hide_menu: false
metas:
  description: "Use Brainpod's browser PostgreSQL console to explore schemas, inspect data, and run SQL without installing a local client."
  keywords: ["Brainpod database console", "PostgreSQL browser", "SQL editor", "database explorer"]
---
# Browser database console

The browser database console lets you inspect and query a deployed PostgresDB from the Brainpod dashboard. The connection stays inside the workload cluster; database passwords and raw database traffic are not sent through the Brainpod control plane.

## Open a PostgreSQL console

1. Open the deployed PostgresDB resource.
2. Select **Open console**.
3. Wait for the connection status to become ready.
4. Select an object in the schema tree or enter SQL in the editor.
5. Run the query and inspect **Data**, **Structure**, or **Messages**.

The console connects as the database's application user. It is not read-only: statements can change or delete data when that user has permission.

## Explore database objects

The schema tree lists tables, views, materialized views, functions, and procedures.

- Opening a table prepares and immediately runs a quoted `SELECT` statement ordered by its primary key when available.
- **Structure** shows columns, indexes, constraints, and view definitions.
- Opening a function places its definition in the editor and shows its arguments and return type.
- Multi-statement queries provide a result switcher.

Choose a row limit from 50 to 1,000. Brainpod also applies request-wide row, result, notice, and response-size limits. A limit message means the database query may have produced more data than the console returned.

## Connection behavior

The connection opens with the page and closes when you leave. There is no separate disconnect action. If the session expires or the connection is interrupted, select **Reconnect**.

Only PostgreSQL is supported in the browser console. Use a [database tunnel](database-tunnels.md) for local tools such as `psql` and DBeaver, and for MariaDB, Valkey, or SQL Server.

## Next steps

- [PostgresDB](resources/postgres.md): Configure PostgreSQL and exported variables
- [Database backups](database-backups.md): Protect PostgreSQL data
- [Database tunnels](database-tunnels.md): Connect a local database client
