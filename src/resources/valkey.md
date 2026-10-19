---
order: 7
hide_menu: false
metas:
  description: "Managed Valkey key-value store on Brainpod. Use Valkey for caching, session storage, and real-time data in your applications."
  keywords: ["Brainpod Valkey", "key-value store", "caching", "Redis alternative", "managed cache", "session storage"]
---
# Valkey

A Valkey resource provisions a managed Valkey key-value store inside your pod. Valkey is Redis-compatible, so any app or library that supports Redis can connect to it. Use it for caching, session storage, queues, or any workload that benefits from fast in-memory data access.

## How Valkey Works

When you create a Valkey resource, Brainpod runs a Valkey instance inside your pod and exposes it at a private hostname such as `cache.default.pod.internal`. The hostname resolves only inside the owning pod; it is not a public endpoint.

Valkey stores its data on a Disk resource that you attach at creation time. This means the data survives restarts using append-only file persistence. The Disk is managed separately and persists even if you delete the Valkey resource.

Connections to Valkey are always encrypted with TLS and require password authentication. Brainpod generates and manages the password automatically.

## Configuring a Valkey

Valkey has four fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `cache` or `sessions`.
- **Instance**: The compute size for your store. Since Valkey is in-memory, the instance size directly affects available memory: `.5x`, `1x`, `2x`, `4x`, or `8x`.
- **Version**: The Valkey version. Currently, version 9 is supported.
- **Disk**: The Disk resource used for persistence. You must create a Disk first and reference it here. This field cannot be changed after creation.

The instance size can be changed later if you need more memory. The version and disk reference are immutable.

## Connecting to Valkey

Apps connect to Valkey using environment variables. When you reference a Valkey resource in an app's environment, Brainpod automatically makes the following variables available:

| Variable | Description |
|---|---|
| `${name.host}` | Pod-scoped hostname (`<name>.default.pod.internal`) |
| `${name.port}` | Port (`6379`) |
| `${name.password}` | Generated password (injected securely) |
| `${name.uri}` | Full connection string |

Replace `name` with the name of your Valkey resource. The connection string uses the `rediss://` scheme (Redis over TLS):

```
rediss://:<password>@<name>.default.pod.internal:6379
```

In your app's environment variable configuration, you would set it up like this:

- **Name**: `REDIS_URL`
- **Value**: `${cache.uri}` (where `cache` is your Valkey resource name)

Resource details show the hostname as **Internal DNS**. Prefer `${cache.host}` or `${cache.uri}` over hardcoding it. See [Private networking](apps.md#private-networking) for DNS scope and redeployment requirements; use a database tunnel for access from your computer.

## Use the CLI

Inspect the schema and exported variables before creating the resource:

```sh
brainpod describe resource valkey --json
brainpod --pod my-pod resource variables valkey cache
```

Open a temporary tunnel for `valkey-cli`, `redis-cli`, or another local client:

```sh
brainpod --pod my-pod tunnel cache 127.0.0.1:16379
```

Keep the command running and use the credentials and connection details it prints. The API key requires `database:connect`; name resolution and credential retrieval also require `resources:read`. See [Database tunnels](../database-tunnels.md) for session and security behavior.

## Next Steps

- [Apps](apps.md): Connect your app to a Valkey store
- [Disks](disks.md): Create a disk for your Valkey instance to use
- [Database tunnels](../database-tunnels.md): Connect a local Valkey client
- [Resources](../resources.md): Overview of Brainpod resources
