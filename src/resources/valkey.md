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

When you create a Valkey resource, Brainpod runs a Valkey instance inside your pod and exposes it at a stable hostname-the resource name you chose. The store is only accessible from within your pod; it is not reachable from the internet.

Valkey stores its data on a Disk resource that you attach at creation time. This means the data survives restarts using append-only file persistence. The Disk is managed separately and persists even if you delete the Valkey resource.

Connections to Valkey are always encrypted with TLS and require password authentication. Brainpod generates and manages the password automatically.

## Configuring a Valkey

Valkey has four fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `cache` or `sessions`.
- **Instance**: The compute size for your store. Since Valkey is in-memory, the instance size directly determines how much data you can hold: `.5x`, `1x`, `2x`, or `4x`.
- **Version**: The Valkey version. Currently, version 9 is supported.
- **Disk**: The Disk resource used for persistence. You must create a Disk first and reference it here. This field cannot be changed after creation.

The instance size can be changed later if you need more memory. The version and disk reference are immutable.

## Connecting to Valkey

Apps connect to Valkey using environment variables. When you reference a Valkey resource in an app's environment, Brainpod automatically makes the following variables available:

| Variable | Description |
|---|---|
| `${name.host}` | Hostname of the Valkey instance |
| `${name.port}` | Port (`6379`) |
| `${name.password}` | Generated password (injected securely) |
| `${name.uri}` | Full connection string |

Replace `name` with the name of your Valkey resource. The connection string uses the `rediss://` scheme (Redis over TLS):

```
rediss://:<password>@<name>:6379
```

In your app's environment variable configuration, you would set it up like this:

- **Name**: `REDIS_URL`
- **Value**: `${cache.uri}` (where `cache` is your Valkey resource name)

## Next Steps

- [Disks](disks.md): Create a disk for your Valkey instance to use
- [Apps](apps.md): Connect your app to a Valkey store
- [Resources](../resources.md): Overview of Brainpod resources
