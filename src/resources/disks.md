---
order: 3
hide_menu: false
metas:
  description: "Persistent block storage for Brainpod apps. Mount a Disks resource to store data that survives container restarts and redeployments."
  keywords: ["Brainpod disk", "persistent storage", "block storage", "volume", "container storage", "stateful apps"]
---
# Disks

A disk gives your app persistent storage. Without a disk, any data written inside an app is lost when it restarts. With a disk, that data survives restarts, redeployments, and revisions.

## How Disks Work

Disks are persistent volumes attached to your pod. When you mount a disk into an app, it appears as a regular directory inside that app. Your app reads and writes files there just like any local path-Brainpod handles the underlying storage.

Data on a disk is independent of your app's image and configuration. You can deploy a new revision of your app, and the files on the disk remain exactly as they were.

Databases like PostgresDB, MariaDB, and Valkey all require a disk. The database resource stores its data there, so your data persists across restarts and updates.

## Configuring a Disk

Disks have two fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `uploads`, `data`, or `postgres-data`.
- **Size**: Storage capacity in gigabytes. Minimum 5 GB, maximum 500 GB.

Disk names can only contain lowercase letters, numbers, and hyphens.

## Mounting a Disk to an App

To use a disk in an app, add a mount to your app configuration. A mount has two parts:

- **Disk**: The disk to attach, selected from the disks in your current revision.
- **Path**: The directory inside the app where the disk will be available (e.g. `/data` or `/var/uploads`).

You can add multiple mounts to a single app, each pointing to a different disk at a different path.

One important constraint: **apps with disk mounts can only run a single instance**. Because the disk can only be attached to one app at a time, horizontal scaling is not supported when a disk is mounted. If you need to scale an app, keep stateful data in a managed database resource instead.

## Resizing a Disk

You can increase a disk's size at any time by editing the resource and entering a larger value. Disks can only grow-shrinking is not supported. The new size takes effect when you deploy the revision.

## Next Steps

- [Apps](apps.md): Mount a disk to your app
- [Config](config.md): Manage shared configuration and secrets
- [PostgresDB](postgres.md): Managed PostgreSQL using a disk for storage
- [Resources](../resources.md): Overview of Brainpod resources
