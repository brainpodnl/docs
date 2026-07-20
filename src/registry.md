---
order: 4
hide_menu: false
metas:
  description: "Push and manage private container images with Brainpod's built-in OCI registry. Authenticate with API keys, push images, and use them directly in your apps."
  keywords: ["Brainpod container registry", "Docker registry", "private images", "OCI registry", "API keys", "policy"]
---
# Container Registry

Every pod comes with its own private container registry. Push images, then reference them directly in your apps.

## How It Works

The registry is built into the platform.

Images are scoped to your pod namespace:

`registry.brainpod.io/<podname>/...`

When apps pull images from your pod namespace, Brainpod handles runtime authentication automatically.

## Pod Name and Namespace

Your registry namespace is based on your pod name (created during onboarding or later in the pod flow).

If your pod is called `production`, your namespace is:

`registry.brainpod.io/production/`

All images for that pod must use that prefix.

## Using Images in Apps

Reference images with the full registry path:

```
registry.brainpod.io/<podname>/web:latest
registry.brainpod.io/<podname>/api:v1.2.3
```

## Pushing Images Locally

To push from your machine, authenticate Docker with an API key.

### Create an API Key

Create an API key in **Settings → API Keys**.

API keys are user-scoped and policy-based:
- each key belongs to a user,
- each key has one or more policy statements,
- statements define allowed or denied actions on selected pod resources.

For registry pushes, include at least the registry actions you need for the target pod.

### Login with Docker

Authenticate Docker with your API key:

```bash
docker login registry.brainpod.io -u api -p <your-api-key>
```

### Tag and Push

Tag your image with your pod namespace:

```bash
docker tag myapp:latest registry.brainpod.io/<podname>/myapp:latest
```

Push it:

```bash
docker push registry.brainpod.io/<podname>/myapp:latest
```

## Organizing Image Names

You can organize image names and tags as you prefer inside your pod namespace:

```
registry.brainpod.io/production/web:latest
registry.brainpod.io/production/api:v2.0.0
registry.brainpod.io/production/worker:staging
```

## Security

- Registry images are private per pod.
- API keys are shown once on creation or roll; store them safely.
- Revoke or roll keys immediately if they are exposed.
- Prefer separate keys per environment and automation target.

## CI/CD Integration

Most CI systems work with the same Docker login flow:

1. Store the API key as a CI secret
2. Run `docker login registry.brainpod.io -u api -p $API_KEY`
3. Build and push images to `registry.brainpod.io/<podname>/...`

## Next Steps

- [API Keys](api-keys.md): User-scoped policy-based key management
- [Builds](builds.md): Automate image builds from GitHub
- [Apps](resources/apps.md): Use registry images in app resources
- [Onboarding](onboarding.md): First-time account and pod setup
