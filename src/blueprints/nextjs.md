---
order: 3
hide_menu: false
metas:
  description: "Deploy a Next.js application on Brainpod. Connect your GitHub repository and Brainpod automatically builds and deploys your app using Railpack."
  keywords: ["Next.js Brainpod", "deploy Next.js", "Next.js hosting", "React framework", "GitHub Actions"]
---
# Next.js

The Next.js blueprint sets up the infrastructure to run your Next.js application on Brainpod and wires it to your GitHub repository. Every push to your main branch automatically builds and deploys your app. No Dockerfile required: Brainpod uses [Railpack](https://github.com/railwayapp/railpack) to detect your framework and build the image for you.

## What Gets Deployed

The blueprint creates the following resources in your pod:

- **1 App**: configured for Next.js on port 3000, with `NODE_ENV` set to `production`
- **1 Route**: a public hostname under `*.route.brainpod.io` with automatic TLS

Next.js is stateless by default, so no disk is needed. If your app writes files to disk (e.g. for uploads), add a Disk resource and mount it to your app after deploying the blueprint.

## Deploying the Blueprint

1. Go to your pod in the Brainpod dashboard
2. Navigate to **Blueprints**
3. Select **Next.js**
4. Give your deployment a name (e.g. `web`): this prefixes all created resources
5. Click **Deploy**

The blueprint deploys with a placeholder image. Your app will not serve real content until you connect your GitHub repository.

## Connecting Your GitHub Repository

Brainpod uses GitHub Actions and Railpack to build your app automatically on every push.

1. Open the **App** resource created by the blueprint
2. Go to the **Image Source** tab and select **GitHub Auto-Deploy**
3. Select your GitHub repository and branch
4. Click **Connect**: Brainpod opens a pull request in your repository that adds:
   - `steiger.yml`: the Railpack build configuration
   - `.github/workflows/deploy-to-brainpod.yml`: the GitHub Actions workflow
5. Merge the pull request

From this point on, every push to your configured branch triggers a build. Railpack detects your Next.js project automatically, builds a container image, pushes it to the Brainpod registry, and your app is redeployed with the new image.

## Monitoring Builds

You can follow the progress of each build in the **Builds** section of your pod. Each build shows its status, logs, and the artifact it produced. When a build completes successfully, the app switches to the new image automatically.

## Next Steps

- [Custom domains](../custom_domains.md): Point your own domain to your app
- [Apps](../resources/apps.md): Configure environment variables, scaling, and more
- [Container Registry](../registry.md): Learn about how images are stored
- [Blueprints](../blueprints.md): Browse other available blueprints
