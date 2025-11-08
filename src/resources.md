---
order: 3
hide_menu: false
---
# Resources

Resources are the building blocks of your infrastructure on Brainpod. Currently, we support two resource types: Apps and Routes. Together, they let you deploy containerized applications and make them accessible on the internet.

## Apps

An app is a containerized application running on Brainpod. It's the core resource—your actual code, packaged as a container and running with the configuration you specify.

### How Apps Work

When you create an app, you're telling us what to run and how to run it. We handle the orchestration—scheduling containers, monitoring health, restarting failures, and scaling based on your configuration.

Each app runs one or more instances of your container. If an instance fails, we automatically restart it. If you scale up, we add more instances and balance traffic across them. The container image you specify gets pulled and deployed according to your settings.

### Configuring an App

Apps need a few key pieces of information:

- **Name**;  A unique identifier within your pod. Use descriptive names like `web`, `api`, or `worker`.
- **Instance Type**; Determines CPU and memory for your containers. Choose based on your workload—small for lightweight services, larger for compute-intensive applications.
- **Image**; Your container image, either from a public registry (like `nginx:latest`) or our private registry at `registry.brainpod.io`. The private registry is pod-scoped, keeping your images secure.
- **Environment Variables**; Configuration passed to your container at runtime. Use these for database URLs, API keys, feature flags, or anything your application reads from the environment.

### What Happens When You Deploy

When you deploy an app revision, we pull your container image, inject environment variables, and start your instances. Health checks monitor your app, and if something fails, we automatically restart it. Traffic routing happens through routes (covered below).

Apps are designed to be stateless. For persistent data, you'll eventually be able to use storage resources. For now, connect to external databases or storage services via environment variables.

## Routes

A route makes your app accessible on the internet. Without a route, your app runs but has no external connectivity. With a route, you get a hostname, traffic routing, and automatic TLS.

### How Routes Work

Routes sit in front of your apps, handling incoming HTTP/HTTPS traffic. They terminate TLS, apply routing rules, and forward requests to the appropriate app. Think of a route as your load balancer and reverse proxy combined.

Every route needs at least one routing rule. The most common pattern is routing all traffic (`/` prefix) to a single app. You can also split traffic by path—send `/api` to your API app, `/admin` to your admin app, and everything else to your frontend.

### Hostnames and Domains

When you create a route, you get a unique hostname under `*.prod.brainpod.io`. This is immediately available (no DNS configuration, no waiting). The hostname is yours as long as the route exists.

Want to use your own domain? Add a custom domain to your route. Point your DNS records to us, and we handle the rest. Custom domains work exactly like the default hostnames, with the same automatic TLS and routing capabilities.

### Automatic TLS

Every route comes with automatic TLS certificates. We provision certificates when you create the route, renew them before expiry, and handle all the complexity. This works for both `*.prod.brainpod.io` hostnames and your custom domains.

Your traffic is always encrypted. No manual certificate management, no worrying about expiration. HTTPS just works.

### Multiple Routes

You can create multiple routes for different purposes. One route for your production domain, another for staging. A route for your main application, separate routes for different services. Each route can point to different apps or use different routing rules.

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

- [Getting Started](getting-started.md) – Deploy your first app and route
- [Working with the Dashboard](dashboard.md) – Manage resources in the UI
- [Container Registry](registry.md) – Push private images
- [Brainpod Concepts](brainpod.md) – Review core concepts
