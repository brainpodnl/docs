---
order: 0
hide_menu: false
metas:
  description: "Understand Brainpod pods, resources, mutable drafts, deployment revisions, health states, history, and rollback behavior."
  keywords: ["Brainpod concepts", "pods", "resources", "revisions", "deployment workflow", "rollback"]
---
# Brainpod concepts

Brainpod organizes application infrastructure around three concepts: pods, resources, and revisions. Understanding their relationship is important before operating production workloads.

## Pods

A pod is an isolated workspace for an application environment. Resources, revisions, container images, events, and settings are scoped to a pod.

Use separate pods when workloads require independent ownership, access policies, image namespaces, or deployment histories. API key policies can grant access to individual pods or to all pods available to the key owner.

## Resources

A resource is a declarative definition of infrastructure managed by Brainpod. The current public API supports:

- [Apps](resources/apps.md) for containerized workloads
- [Routes](resources/routes.md) for HTTP routing and TLS termination
- [Disks](resources/disks.md) for persistent storage
- [Config](resources/config.md) for text-based configuration files
- [PostgresDB](resources/postgres.md) for PostgreSQL
- [MariaDB](resources/mariadb.md) for MariaDB
- [Valkey](resources/valkey.md) for key-value storage
- [SQL Server](resources/mssql.md) for Microsoft SQL Server Express

Resources can reference one another. A Route targets an App, an App can mount a Disk or Config, and an App can reference variables exported by a database or another App with internal ports. See [Private networking](resources/apps.md#private-networking) for pod-scoped hostnames and App-to-App connections.

## Mutable head and revisions

Each pod has a mutable head where resource changes are prepared. Creating, replacing, deleting, or installing resources changes this draft configuration without immediately changing the running environment.

Deploying promotes the mutable head into an immutable revision. Previous revisions remain available for inspection and comparison.

The deployment lifecycle uses these states:

| State | Meaning |
|---|---|
| **Draft** | Resource changes are being prepared on the mutable head |
| **Waiting** | A deployment has been requested and is waiting to start |
| **Pending** | The platform is applying the revision |
| **Ready** | Every resource in the revision reports healthy |
| **Deployed** | The revision is the pod's deployed revision |
| **Failed** | The revision could not be applied successfully |

A failed or cancelled revision stops CLI wait operations immediately. A wait timeout does not create another deployment; it reports which resources remain unhealthy.

## Deployment workflow

Use the same workflow for small and multi-service deployments:

1. Create or update resources on the mutable head.
2. Validate the complete resource graph and review the diff.
3. Deploy the mutable head.
4. Wait for resource health and inspect events when a resource remains unhealthy.
5. Prepare the next change on the new mutable head.

With the CLI:

```sh
brainpod resource create --file resources.json --dry-run
brainpod resource create --file resources.json
brainpod deploy --summary "Deploy application" --wait
```

See [Brainpod CLI](cli.md) for revision inspection and machine-readable output.

## Restore an earlier configuration

Revision history provides the resource configuration for earlier deployments. Restoring an earlier revision creates a deployment from that known configuration; it does not require manually reversing every individual field change.

Before restoring production infrastructure, inspect the revision diff and consider the effect on persistent data. Restoring resource definitions does not necessarily reverse changes already written to a Disk or database.

## Next steps

- [Getting started](getting-started.md): Deploy an App and Route
- [Resources](resources.md): Review resource configuration
- [API keys](api-keys.md): Define pod-scoped access
- [API reference](api-reference.md): Automate the deployment workflow
