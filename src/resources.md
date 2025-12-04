---
order: 2
hide_menu: false
---
# Brainpod Resources

Resources are the building blocks of your infrastructure on Brainpod. Currently, we support two resource types: Apps and Routes. Together, they let you deploy containerized applications and make them accessible on the internet.

## Overview

- **[Apps](resources/apps.md)** — Your containerized applications
- **[Routes](resources/routes.md)** — HTTP/HTTPS routing to your apps

**Apps** are containerized applications running on Brainpod. They're your actual code, packaged as containers and running with the configuration you specify. We handle orchestration—scheduling containers, monitoring health, restarting failures, and scaling based on your configuration.

**Routes** make your apps accessible on the internet. They handle incoming HTTP/HTTPS traffic, terminate TLS, apply routing rules, and forward requests to the appropriate app. Think of routes as your load balancer and reverse proxy combined.

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

- [Getting Started](getting-started.md) — Deploy your first app and route
- [Apps](apps.md) — Deploy containerized applications
- [Routes](routes.md) — Expose apps on the internet
- [Container Registry](registry.md) — Push private images