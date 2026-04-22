---
order: 1
hide_menu: false
metas:
  description: "Learn about Brainpod Apps: deploy containerized applications, configure instance types, environment variables, replicas, and private registry images."
  keywords: ["Brainpod app", "container deployment", "environment variables", "instance type", "scaling", "Docker container"]
---
# Apps

It's the core resource in Brainpod. It's your actual code, packaged as a container and running with the configuration you specify.

## How Apps Work

When you create an app, you're telling us what to run and how to run it. We handle the orchestration-scheduling containers, monitoring health, restarting failures, and scaling based on your configuration.

Each app runs one or more instances of your container. If an instance fails, we automatically restart it. If you scale up, we add more instances and balance traffic across them. The container image you specify gets pulled and deployed according to your settings.

## Configuring an App

Apps need a few key pieces of information:

- **Name**: A unique identifier within your pod. Use descriptive names like `web`, `api`, or `worker`.
- **Instance Type**: Determines CPU and memory for your containers. Choose based on your workload: small for lightweight services, larger for compute-intensive applications.
- **Image**: Your container image, either from a public registry (like `nginx:latest`) or our private registry at `registry.brainpod.io`. The private registry is pod-scoped, keeping your images secure.
- **Environment Variables**: Configuration passed to your container at runtime. Use these for database URLs, API keys, feature flags, or anything your application reads from the environment.

## What Happens When You Deploy

When you deploy an app revision, we start your instances with the container image you specified and automatically restart them if they fail.

## Advanced Configuration

The **Advanced** tab in the app editor exposes additional settings for lifecycle, runtime identity, readiness checks, and mounts.

### Init Script

An init script runs before your app starts. Use it to set up file permissions, seed data, or do any one-time preparation the app needs before it can run.

The script runs as root in a minimal shell environment. It has access to the same mounted volumes as your app, making it useful for fixing ownership on disk mounts before your app process takes over (e.g. `chown -R 1000:1000 /data`).

### Runtime

The runtime settings control what user and group your app process runs as:

- **UID**: The user ID the app process runs as. Setting this to a non-zero value runs your app as a non-root user.
- **GID**: The group ID the app process runs as.
- **FS Group**: A group ID applied to all mounted volumes. Files written to a disk or config mount will be owned by this group, which is useful when your app needs consistent file ownership on persistent storage.

All three fields are optional. If left empty, the defaults from your container image are used.

### Readiness Check

A readiness check tells Brainpod when your app is ready to receive traffic. Until the check passes, the app is not considered ready and traffic is not routed to it. Brainpod checks every 5 seconds starting 5 seconds after the app starts.

The check has the following fields:

- **Port**: The port to probe on your app.
- **Host**: The hostname to connect to. Defaults to localhost if left empty.
- **Path**: An HTTP path to check (e.g. `/health`). When combined with a port, Brainpod makes an HTTP GET request and considers the app ready on a 2xx or 3xx response. Without a path, it falls back to a TCP connection check.

### Mounts

Mounts attach external storage or configuration files into your app at a specified path. Two types are supported:

- **Disk mount**: attach a [Disk](disks.md) resource to a path (e.g. `/data`). The data persists across restarts. Apps with a disk mount can only run a single instance.
- **Config mount**: attach a specific file from a [Config](config.md) resource to a path (e.g. `/etc/app/config.yaml`). The file is read-only.

You can add multiple mounts to a single app.

## Next Steps

- [Routes](routes.md): Make your app accessible on the internet
- [Disks](disks.md): Add persistent storage to your app
- [Config](config.md): Mount configuration files into your app
- [Container Registry](../registry.md): Push private images to Brainpod
- [Resources](../resources.md): Overview of Brainpod resources
