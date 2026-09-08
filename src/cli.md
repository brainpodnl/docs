---
order: 5
hide_menu: false
metas:
  description: "Install and use the Brainpod CLI to manage pods, build images, configure resources, deploy revisions, and inspect runtime events."
  keywords: ["Brainpod CLI", "brainpod command", "deploy CLI", "Railpack", "resource management"]
---
# Brainpod CLI

The Brainpod CLI provides non-interactive commands for managing pods, images, blueprints, revisions, resources, deployments, database tunnels, and events. Its default output is designed for terminals and automation; add `--json` for machine-readable output.

## Install the CLI

Published releases provide binaries for Linux and macOS on AMD64 and ARM64. Download the archive and `SHA256SUMS` file for your platform from the [Brainpod CLI releases](https://github.com/brainpodnl/cli/releases/latest), verify the checksum, and place the `brainpod` binary on your `PATH`.

Confirm the installation without authenticating:

```sh
brainpod describe
```

The macOS binaries are not notarized. If Gatekeeper blocks the binary, remove its quarantine attribute:

```sh
xattr -d com.apple.quarantine brainpod
```

## Authenticate and select a pod

```sh
brainpod login
brainpod pod list
brainpod config set pod <pod-name>
brainpod whoami
```

`brainpod login` opens the Brainpod console and stores the resulting API token in the CLI configuration. The default configuration file is `~/.config/brainpod/config.toml`; `XDG_CONFIG_HOME` and `BRAINPOD_CONFIG` are supported.

Pod-scoped commands resolve the pod in this order:

1. The `--pod` global option
2. `BRAINPOD_POD`
3. The configured default pod

## Discover commands and schemas

Use `describe` instead of relying on a separately versioned command reference:

```sh
brainpod describe
brainpod describe resource create
brainpod describe resource create --json
brainpod describe resource app --json
```

Descriptions include arguments, defaults, allowed values, authentication requirements, side effects, examples, and related guidance. Resource descriptions include the current resource schema and exported variables.

## Build an application image

The CLI uses a `Dockerfile` when one exists and otherwise uses Railpack. Both methods push the result directly to the selected pod's registry namespace.

```sh
brainpod image build api . --tag v1
brainpod image build worker ./services/worker --builder railpack
```

Requirements and behavior:

- Docker with Buildx must be available.
- The API key must allow `registry:push` for the selected pod.
- The build context defaults to the current directory.
- The image tag defaults to `latest`.
- The CLI selects a supported cluster architecture; use `--platform` to override it.
- `--output <path>` retains an OCI image layout in addition to pushing the image.

The result contains an immutable digest reference suitable for an App resource's `spec.image`.

## Create and deploy resources

Resource mutations change the pod's mutable draft. They do not affect the deployed revision until you run `deploy`.

```sh
brainpod resource create --file resources.json --dry-run
brainpod resource create --file resources.json
brainpod deploy --summary "Deploy API" --wait
```

Use `--dry-run` before creation to validate the document and review warnings. The API currently supports App, Config, Route, Postgres, MariaDB, Valkey, Disk, and MSSQL resource documents. Some CLI subcommands expose a narrower set of resource-kind arguments; use `brainpod describe resource --json` for the contract supported by the installed CLI.

`deploy --wait` waits until every resource reports healthy. The default timeout is 90 seconds; override it with `--timeout <seconds>`.

## Inspect revisions

```sh
brainpod revision list
brainpod revision get <revision-id>
brainpod revision diff <revision-id>
brainpod revision wait <revision-id> --timeout 180
```

A wait stops immediately when a revision fails or is cancelled. On timeout, the CLI reports resources that remain unhealthy.

## Use exported resource variables

Database and route resources export values that can be referenced by App environment variables. Discover the available schema before creating a resource:

```sh
brainpod describe resource postgres --json
```

After resources exist, inspect resolved references for the current or a historical revision:

```sh
brainpod resource variables
brainpod resource variables postgres db --json
```

Secret values are not included in variable output and appear as `<secret>`. Values that are not assigned yet appear as `<unresolved>`.

## Inspect events

```sh
brainpod events --resource api --range 30m
brainpod events --watch --resource api --kind app --level error
```

A resource can be identified by name, URN, or stable UUID. Resolving a name or UUID requires `resources:read`; supplying a URN directly avoids the resolution request. Event streams reconnect automatically until interrupted.

## Output and errors

- Default collection output uses plain tables without terminal control sequences when redirected.
- `--json` emits complete API responses for non-streaming commands.
- Login and event watches use newline-delimited JSON when streaming.
- Errors are written to standard error and return a non-zero exit code.
- JSON API errors retain the stable API error code, request ID, and details.
- `brainpod config show` never displays the stored API token.

## Next steps

- [Database tunnels](database-tunnels.md): Connect a local database client to a deployed database
- [Resources](resources.md): Review supported resource types
- [Container Registry](registry.md): Authenticate directly with the OCI registry
- [API keys](api-keys.md): Configure least-privilege policies
