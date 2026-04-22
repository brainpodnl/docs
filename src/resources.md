---
order: 3
hide_menu: false
metas:
  description: "Overview of Brainpod resources: Apps, Routes, PostgresDB, MariaDB, Valkey, Config, and Disk. Build your cloud infrastructure with high-level abstractions."
  keywords: ["Brainpod resources", "apps", "routes", "PostgreSQL", "MariaDB", "Valkey", "disk", "config", "infrastructure"]
---
# Brainpod Resources

Resources are the building blocks of your infrastructure on Brainpod. They let you deploy containerized applications, expose them on the internet, connect to managed databases, and persist data.

## Overview

- **[Apps](resources/apps.md)**: Your containerized applications
- **[Routes](resources/routes.md)**: HTTP/HTTPS routing to your apps
- **[Disks](resources/disks.md)**: Persistent block storage
- **[Config](resources/config.md)**: Shared configuration and secrets
- **[PostgresDB](resources/postgres.md)**: Managed PostgreSQL databases
- **[MariaDB](resources/mariadb.md)**: Managed MariaDB databases
- **[Valkey](resources/valkey.md)**: Managed Valkey key-value store

**Apps** are containerized applications running on Brainpod. They're your actual code, packaged as containers and running with the configuration you specify. We handle orchestration-scheduling containers, monitoring health, restarting failures, and scaling based on your configuration.

**Routes** make your apps accessible on the internet. They handle incoming HTTP/HTTPS traffic, terminate TLS, apply routing rules, and forward requests to the appropriate app. Think of routes as your load balancer and reverse proxy combined.

**Disks** give your apps persistent storage. Without a disk, data written inside an app is lost when it restarts. Mount a disk into an app and the data survives restarts, redeployments, and revisions. Databases like PostgresDB, MariaDB, and Valkey all require a disk to store their data.

## Working with Resources

Resources are managed through revisions. When you create a new resource or modify an existing one, you're working in a draft revision. Make your changes, test your configuration, then deploy when ready.

The draft state lets you prepare changes without affecting production. Once deployed, the new configuration goes live, and the previous state is saved in history. If something goes wrong, roll back to any previous revision.

This workflow applies to both apps and routes. Create drafts, make changes, deploy when ready, roll back if needed.

## Connecting Apps and Routes

Here's how apps and routes work together: you create an app with your container configuration, then create a route that points to that app. The route gives your app a public hostname and handles incoming traffic.

For a simple web application, you might have one app and one route. For a more complex setup, you might have multiple apps (frontend, API, background workers) with routes directing traffic appropriately.

Routes can point to multiple apps using different path prefixes. Apps can be targeted by multiple routes. The resource model is flexible enough to handle simple deployments and complex multi-service architectures.

## Next Steps

Ready to deploy your first application?

- [Apps](resources/apps.md): Deploy containerized applications
- [Routes](resources/routes.md): Expose apps on the internet
- [Container Registry](registry.md): Push private images
- [Getting Started](getting-started.md): Deploy your first app and route
- [Brainpod Concepts](brainpod.md): Review core concepts