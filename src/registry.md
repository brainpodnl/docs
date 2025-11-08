---
order: 4
hide_menu: false
---
# Container Registry

Every pod comes with its own private container registry. Push your images, and they're immediately available to your apps—no external registries or credentials needed.

## How It Works

The registry is built into the platform. When your apps pull images, they authenticate automatically using machine keys. You don't configure credentials or manage registry access, it just works.

Images are scoped to your pod. Your registry namespace is `registry.brainpod.io/<podname>/`, and all your images live under that namespace. This keeps your images private and isolated from other pods.

## Using Images in Apps

When you configure an app, reference images from your pod's registry using the full path:

```
registry.brainpod.io/<podname>/web:latest
registry.brainpod.io/<podname>/api:v1.2.3
```

The platform handles authentication automatically. Your apps can pull these images without any additional configuration.

## Pushing Images Locally

To push images from your local machine, you need to authenticate with the registry. This is where API keys come in.

### Create an API Key

Generate an API key in the Brainpod dashboard. This key acts as your authentication token for the registry.

API keys are scoped to your pod and can be revoked at any time. Create separate keys for different environments or team members if needed.

### Login with Docker

Use your API key to authenticate Docker with the registry:

```bash
docker login registry.brainpod.io -u api -p <your-api-key>
```

The username is always `api`. The password is your API key.

### Tag and Push

Tag your local image with the full registry path:

```bash
docker tag myapp:latest registry.brainpod.io/<podname>/myapp:latest
```

Then push it:

```bash
docker push registry.brainpod.io/<podname>/myapp:latest
```

The image is now available in your pod's registry and can be used by your apps.

## Registry Namespace

Your registry namespace is based on your pod name. If your pod is called `production`, your namespace is `registry.brainpod.io/production/`. All images must use this prefix.

You can organize images however you like within your namespace:

```
registry.brainpod.io/production/web:latest
registry.brainpod.io/production/api:v2.0.0
registry.brainpod.io/production/worker:staging
```

The registry doesn't enforce any structure beyond the pod namespace. Use whatever naming and tagging scheme makes sense for your workflow.

## Security

Images in your registry are private to your pod. Other pods can't access your images, and you can't access theirs. The platform enforces this isolation automatically.

API keys provide secure access for pushing images. They're scoped to your pod and can be revoked instantly if compromised. Never commit API keys to version control, treat them like passwords.

When apps pull images, they use machine keys that are managed automatically by the platform. These keys are rotated regularly and never exposed to users.

## CI/CD Integration

Most CI/CD pipelines can integrate with the registry using the same Docker login approach:

1. Store your API key as a secret in your CI environment
2. Login using `docker login registry.brainpod.io -u api -p $API_KEY`
3. Build and push your images as part of your pipeline

The registry works with any tool that supports Docker registries—GitHub Actions, GitLab CI, Jenkins, CircleCI, and others.

## Next Steps

Ready to push your first image?

- [API Keys](/api-keys.md) – Generate and manage API keys
- [Getting Started](/getting-started.md) – Deploy an app using a registry image
- [Resources](/resources.md) – Learn about Apps and Routes
