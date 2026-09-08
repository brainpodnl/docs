---
order: 3
hide_menu: false
metas:
  description: "Compare Brainpod application, networking, storage, configuration, and managed database resources before building a deployment."
  keywords: ["Brainpod resources", "apps", "routes", "PostgreSQL", "MariaDB", "Valkey", "SQL Server", "disk", "config"]
---
# Brainpod Resources

Resources are the building blocks of your infrastructure on Brainpod. They let you deploy containerized applications, expose them on the internet, connect to managed databases, and persist data.

## Overview

- **[Apps](resources/apps.md)**: Your containerized applications
- **[Routes](resources/routes.md)**: HTTP/HTTPS routing to your apps
- **[Disks](resources/disks.md)**: Persistent block storage
- **[Config](resources/config.md)**: Text-based configuration files
- **[PostgresDB](resources/postgres.md)**: Managed PostgreSQL databases
- **[MariaDB](resources/mariadb.md)**: Managed MariaDB databases
- **[Valkey](resources/valkey.md)**: Managed Valkey key-value store
- **[SQL Server](resources/mssql.md)**: Managed Microsoft SQL Server Express databases

**Apps** run container images with the environment, compute size, replicas, readiness checks, runtime identity, and mounts you specify. Brainpod schedules instances, reports health, and restarts failed containers.

**Routes** expose apps over HTTP and HTTPS. They terminate TLS, evaluate path rules, and forward requests to the selected app and port.

**Disks** give your apps persistent storage. Without a disk, data written inside an app is lost when it restarts. Mount a disk into an app and the data survives restarts, redeployments, and revisions. Databases like PostgresDB, MariaDB, and Valkey all require a disk to store their data.

## Inspect resources with the CLI

Use the CLI's version-matched schema catalog to discover supported fields and exported variables:

```sh
brainpod describe resource --json
brainpod describe resource app --json
brainpod --pod my-pod resource list
```

See [Brainpod CLI](cli.md) for creation, replacement, revision, and deployment commands.

## Working with Resources

Resources are managed through revisions. When you create a new resource or modify an existing one, you're working in a draft revision. Make your changes, test your configuration, then deploy when ready.

The draft state lets you prepare changes without affecting production. Once deployed, the new configuration goes live, and the previous state is saved in history. If something goes wrong, roll back to any previous revision.

This workflow applies to every resource type. Resource mutations update the mutable head; they do not change the running environment until deployment.

## Connecting Apps and Routes

Here's how apps and routes work together: you create an app with your container configuration, then create a route that points to that app. The route gives your app a public hostname and handles incoming traffic.

For a simple web application, you might have one app and one route. For a more complex setup, you might have multiple apps (frontend, API, background workers) with routes directing traffic appropriately.

Routes can point to multiple apps using different path prefixes. Apps can be targeted by multiple routes. The resource model is flexible enough to handle simple deployments and complex multi-service architectures.

## Next Steps

- [Apps](resources/apps.md): Deploy containerized applications
- [Routes](resources/routes.md): Expose apps on the internet
- [Container Registry](registry.md): Push private images
- [Getting Started](getting-started.md): Deploy your first app and route
- [Brainpod Concepts](brainpod.md): Review core concepts