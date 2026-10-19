---
order: 1
hide_menu: false
metas:
  description: "Deploy Brainpod Apps with private TCP ports, pod-scoped DNS, startup command overrides, environment variables, and persistent mounts."
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

Expand **Advanced settings** in the app editor to configure startup commands, internal ports, lifecycle, runtime identity, readiness checks, and mounts. Opening one section closes the previous section without clearing its fields.

### Startup command

Use **Startup command** to override how your container starts:

- **Command (entrypoint)** replaces the image entrypoint. The first item must be a non-empty executable.
- **Arguments** supplies the arguments passed to the entrypoint. Arguments alone retain the image entrypoint. An overridden command without arguments runs without the image's default arguments.
- **Use image defaults** clears both overrides. Save and deploy the revision to apply the reset.

Each row is one token. Spaces and empty arguments are preserved; Brainpod does not split a command string or interpret shell syntax. To run a shell script, the image must contain a shell. Set the command items to `/bin/sh` and `-c`, then put the entire script in one argument.

In a resource document, the overrides are optional string arrays in `spec`. For example:

```json
{
  "command": ["/bin/sh", "-c"],
  "args": ["exec /app/server --config /etc/app/config.yaml"]
}
```

When both arrays are omitted or empty, the image's startup defaults apply. Editing other fields in the console preserves existing overrides. A REST resource replacement replaces the full document, so include any overrides you want to keep.

### Private networking

Expose TCP ports so other Apps in the same pod can reach your application without a public Route:

1. Ensure the application listens on the intended port on all container interfaces, rather than only `localhost`.
2. Open **Advanced settings → Internal ports** and add the port numbers.
3. Save the App and deploy the revision.
4. In another App's environment variables, reference the host and specify the port, for example `BACKEND_URL=http://${api.host}:8080` for an App named `api`.

Ports must be unique integers from `1` to `65535`. In resource JSON, use a flat array such as `"ports": [8080, 9000]` in `spec`; ports do not have user-defined names.

When you select an image with no ports configured, the console prefills its detected TCP ports. Review these values: they configure networking but do not change which ports the application listens on. Editing an existing App does not automatically add ports. Removing the last port removes its internal service on the next deployment.

An App with declared ports exports `${api.host}` as `api.default.pod.internal`. The same hostname appears as **Internal DNS** in resource details. Use the variable instead of hardcoding it. An App without declared ports has no host export.

Connections are balanced across ready App instances. Internal ports do not publish an internet endpoint; configure a [Route](routes.md) separately for public HTTP access. A Route can target an App port even when it is not declared in `spec.ports`.

The `default` part is the resource namespace, not the pod name. Private hostnames resolve only from workloads in their owning Brainpod pod. Identical resource names in different pods remain isolated. These names cannot be used directly from your computer or another pod.

Managed Postgres, MariaDB, Valkey, and SQL Server resources use the same private hostname format. Prefer their `${name.uri}` variables for complete connection strings. External DNS names continue to resolve normally. Redeploy existing workloads when adopting the new internal DNS configuration.

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

## Use the CLI

Inspect the App schema before creating resource JSON, then inspect the deployed App and follow its events:

```sh
brainpod describe resource app --json
brainpod --pod my-pod resource get app web
brainpod --pod my-pod events --watch --resource web --kind app
```

Use `brainpod resource create --file resources.json --dry-run` to validate an App document before changing the mutable head.

## Next Steps

- [Routes](routes.md): Make your app accessible on the internet
- [Disks](disks.md): Add persistent storage to your app
- [Config](config.md): Mount configuration files into your app
- [Container Registry](../registry.md): Push private images to Brainpod
- [Resources](../resources.md): Overview of Brainpod resources
