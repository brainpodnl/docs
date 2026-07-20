---
order: 6
hide_menu: false
metas:
  description: "Manage Brainpod API keys with user-scoped, policy-based permissions. Learn statements, actions, pod resources, key rolling, and revocation."
  keywords: ["Brainpod API keys", "policy", "user scoped", "registry push", "CI", "permissions"]
---
# API Keys

API keys are used for authenticated access from local tools and CI/CD workflows.

Brainpod API keys are:
- **user-scoped** (owned by a user account),
- **policy-based** (permissions are defined with policy statements),
- and **pod-resource scoped** (statements target specific pod URNs).

## Where to Manage Keys

Open **Settings → API Keys** in the dashboard.

You can:
- create a key,
- edit policy statements,
- roll a key (rotate secret),
- revoke a key.

## Policy Model

Each key has a policy document with one or more statements.

A statement contains:
- **Effect**: `allow` or `deny`
- **Actions**: operations like registry or build actions
- **Resources**: pod URNs, such as `urn:brain:pod:<podname>`

This lets you grant least-privilege access for each key.

## Common Action Examples

Typical actions used in API key policies include:

- `registry:push`
- `registry:pull`
- `builds:create`
- `pods:read`
- `revisions:read`
- `resources:read`

Choose only what the integration needs.

## Pod Resource Scoping

Policies are evaluated against pod resources. Restrict statements to the pod(s) a workflow should access.

Example resource:

`urn:brain:pod:production`

If a user does not have access to a referenced pod, policy creation or updates are rejected.

## Key Lifecycle

### Create

When you create a key, the secret is shown once. Store it immediately in a secure secret manager.

### Roll (Rotate)

Rolling replaces the key secret immediately. The old secret stops working at once.

### Revoke

Revoking disables the key permanently.

## Best Practices

- Use separate keys per environment (dev/staging/prod)
- Use separate keys per automation pipeline
- Grant only required actions and pods
- Rotate keys regularly
- Revoke unused keys immediately

## Usage Examples

### Docker registry login

```bash
docker login registry.brainpod.io -u api -p <your-api-key>
```

### CI secret usage

Store key in your CI secret store and inject it only into jobs that need it.

## Related Docs

- [Container Registry](registry.md)
- [Builds](builds.md)
- [Onboarding](onboarding.md)
