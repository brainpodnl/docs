---
order: 4
hide_menu: false
metas:
  description: "Brainpod Config resource for managing shared configuration files. Mount text-based config files into your apps without rebuilding your image."
  keywords: ["Brainpod config", "configuration files", "ConfigMap", "app configuration", "shared config"]
---
# Config

A Config stores text-based configuration files that you can mount into your apps. Instead of baking configuration into your container image, you define it as a resource and inject it at runtime.

## How Config Works

A Config is a collection of named files. Each file has a name-like `config.yaml` or `nginx.conf`-and its full text content. When you mount a Config file into an app, it appears at the specified path inside the app as a regular file. Your app reads it just like any file on disk.

Config files are read-only when mounted. Apps cannot modify them. If you need to update a file, edit the Config resource and deploy a new revision.

## Configuring a Config

A Config has two fields:

- **Name**: A unique identifier within your pod. Use descriptive names like `api-config` or `nginx-settings`.
- **Files**: A collection of files, each with a filename and its full text content. You can add as many files as you need. Common formats like YAML, JSON, TOML, and shell scripts are supported.

The total size of all files combined cannot exceed 1 MB.

## Mounting a Config into an App

To use a Config file in an app, add a mount to your app configuration. A mount has three parts:

- **Config**: The Config resource to use, selected from the configs in your current revision.
- **File**: The specific file from that Config to mount (e.g. `config.yaml`).
- **Path**: The full path where the file will appear inside the app (e.g. `/etc/app/config.yaml`).

You can add multiple mounts to a single app, pulling different files from the same Config or from different Configs entirely.

Config is designed for non-sensitive configuration. For passwords, API keys, and other secrets, use environment variables on the app instead.

## Next Steps

- [Apps](apps.md): Mount a Config into your app
- [Disks](disks.md): Persistent storage for your apps
- [Resources](../resources.md): Overview of Brainpod resources
