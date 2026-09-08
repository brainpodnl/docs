---
order: 1
hide_menu: false
metas:
  description: "Learn about Brainpod Apps: deploy containerized applications, configure instance types, environment variables, replicas, and private registry images."
  keywords: ["Brainpod app", "container deployment", "environment variables", "instance type", "scaling", "Docker container"]
---
# Apps

An App resource runs a container image with the compute size, replica count, environment, runtime identity, health checks, and mounts you specify.

## How Apps Work

When you deploy an App, Brainpod schedules the requested instances, monitors their health, and restarts failed containers. Routes can direct HTTP traffic to a healthy App instance.

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

Lifecycle initialization runs before the App starts. Configure either a shell script or a dedicated initialization image and command for one-time preparation.

Initialization uses the App's non-root runtime identity and has access to the configured mounts. When lifecycle initialization is enabled, both UID and GID must be set to non-zero values. Brainpod prepares writable disk ownership before initialization, so initialization scripts should not use `root` or `chown`.

### Runtime

The runtime settings control what user and group your app process runs as:

- **UID**: The user ID the app process runs as. Setting this to a non-zero value runs your app as a non-root user.
- **GID**: The group ID the app process runs as.
- **FS Group**: A group ID applied to all mounted volumes. Files written to a disk or config mount will be owned by this group, which is useful when your app needs consistent file ownership on persistent storage.

All three fields are optional. Brainpod uses runtime metadata detected from the image when available and otherwise defaults UID and GID to `1000`. Explicit values must be between `1` and `65535`.

### Readiness Check

A readiness check tells Brainpod when your app is ready to receive traffic. Until the check passes, the app is not considered ready and traffic is not routed to it. Brainpod checks every 5 seconds starting 5 seconds after the app starts.

The check has the following fields:

- **Command**: A command that must complete successfully.
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
