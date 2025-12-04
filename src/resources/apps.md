---
order: 1
hide_menu: false
---
# Apps

It's the core resource in Brainpod. It's your actual code, packaged as a container and running with the configuration you specify.

## How Apps Work

When you create an app, you're telling us what to run and how to run it. We handle the orchestration—scheduling containers, monitoring health, restarting failures, and scaling based on your configuration.

Each app runs one or more instances of your container. If an instance fails, we automatically restart it. If you scale up, we add more instances and balance traffic across them. The container image you specify gets pulled and deployed according to your settings.

## Configuring an App

Apps need a few key pieces of information:

- **Name**: A unique identifier within your pod. Use descriptive names like `web`, `api`, or `worker`.
- **Instance Type**: Determines CPU and memory for your containers. Choose based on your workload: small for lightweight services, larger for compute-intensive applications.
- **Image**: Your container image, either from a public registry (like `nginx:latest`) or our private registry at `registry.brainpod.io`. The private registry is pod-scoped, keeping your images secure.
- **Environment Variables**: Configuration passed to your container at runtime. Use these for database URLs, API keys, feature flags, or anything your application reads from the environment.

## What Happens When You Deploy

When you deploy an app revision, we start your instances with the container image you specified and automatically restart them if they fail.

Apps are designed to be stateless. For persistent data, you'll eventually be able to use storage resources. For now, connect to external databases or storage services via environment variables.

## Next Steps

- [Routes](routes.md) — Make your app accessible on the internet
- [Getting Started](../getting-started.md) — Deploy your first app
- [Container Registry](../registry.md) — Push private images to Brainpod
- [Resources](../resources.md) — Overview of Brainpod resources
