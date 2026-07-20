---
order: 5
hide_menu: false
metas:
  description: "Automate container image builds on Brainpod by connecting a GitHub repository. Set up CI/CD, understand build states, and use policy-based API keys in workflows."
  keywords: ["Brainpod builds", "CI/CD", "GitHub Actions", "container build", "automated deployment", "API keys", "policy"]
---
# Builds

Builds give you an automated pipeline from GitHub push to container image.

Connect a repository to an app, merge the onboarding PR, and Brainpod tracks each build artifact.

## Prerequisites

Before setting up builds, make sure:

1. Account onboarding is complete (billing, payment, first pod)
2. You have access to the target pod
3. You have an API key with policy permissions required by your workflow

For first-time setup, see [Onboarding](onboarding.md).

## How Builds Work

When you connect a repository to an app, Brainpod opens a pull request in that repository.

That PR adds a GitHub Actions workflow that builds and pushes images to your pod registry namespace on pushes to the configured branch.

After merging the PR:

1. You push code to GitHub
2. GitHub Actions runs the workflow
3. The image is pushed to `registry.brainpod.io/<podname>/...`
4. The build appears in Brainpod with status and metadata

Brainpod tracks and stores build results; the build execution itself runs on GitHub Actions.

## Setting Up Builds

### Step 1: Connect GitHub

1. Open **Settings** in your pod
2. Under **GitHub**, click **Connect GitHub**
3. Authorize the Brainpod GitHub App and select repositories

You only do this once per GitHub account.

### Step 2: Connect a Repository to an App

1. Open the app you want to deploy from GitHub
2. Click **Connect Repository**
3. Select the repository

If the repository is not onboarded yet, Brainpod opens a PR with the workflow file.

### Step 3: Merge the Onboarding PR

The workflow will:
- build your container image,
- push it to your pod registry namespace,
- report status back to Brainpod.

After merge, the next push triggers a build.

## API Keys for Build Pipelines

Build workflows authenticate with API keys.

API keys are user-scoped and policy-based, so grant only the actions needed for the workflow and restrict access to specific pod resources.

For example, CI keys typically need registry actions (push/pull) and build-related actions for the target pod.

Use separate keys per repository or environment when possible.

## Build States

| State | Meaning |
|---|---|
| **Waiting** | Build triggered, waiting for a runner |
| **Pending** | Build is actively running |
| **Ready** | Build completed successfully, artifact available |
| **Failed** | Build encountered an error |
| **Cancelled** | Build was cancelled before completion |

## Build Details

Open a build row to inspect:

- Repository
- Workflow
- Commit SHA
- Branch
- State
- Created/finished timestamps and duration
- Artifacts with full registry URIs

## Artifacts

Successful builds produce image artifacts in your pod registry.

You can copy a full artifact URI and pin an app to that exact image digest.

## Filtering Builds

Use filters at the top of the page:

- **Repository**
- **Branch**

Select **Clear filters** to reset.

## Next Steps

- [API Keys](api-keys.md): Create least-privilege CI keys
- [Container Registry](registry.md): Registry namespaces and image push flow
- [Apps](resources/apps.md): Configure apps to use built images
- [Getting Started](getting-started.md): End-to-end first deployment
