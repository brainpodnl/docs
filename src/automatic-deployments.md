---
order: 5
hide_menu: false
---
# Automatic Deployments

Brainpod can automatically deploy your app whenever you push new code to GitHub. Set it up once, and every successful build automatically updates your running application.

## How It Works

When you configure your app to track a GitHub repository, Brainpod watches for new container images pushed to the registry from that repository. As soon as a new image arrives, Brainpod creates a new revision of your app with that image and deploys it.

This eliminates the need to manually update image tags or create new deployments. Your application stays in sync with your repository automatically.

## Configuration

When creating or editing an app, select the option to track a GitHub repository instead of specifying a static image tag. Choose your repository from the list, and your app will automatically receive updates whenever a new container image is pushed from that repository.

## What Happens During Automatic Deployments

When an automatic deployment is triggered:

- A new revision appears in your deployment history with a summary indicating it was an automatic upgrade
- Any in-progress draft revisions are cancelled to avoid conflicts
- The revision goes through the normal deployment stages: `waiting` -> `pending` -> `ready` -> `deployed`
- You can view the deployment status and logs just like any manual deployment

If an automatic deployment fails, your previous revision continues running. You can investigate the issue and push a fix, which will trigger another automatic deployment once the build succeeds.

## Next Steps

- [Apps](resources/apps.md) — Learn more about configuring apps
- [Container Registry](registry.md) — Push images to Brainpod's registry
- [Getting Started](getting-started.md) — Deploy your first app