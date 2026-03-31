---
order: 5
hide_menu: false
metas:
  description: "Automate container image builds on Brainpod by connecting a GitHub repository. Learn how to set up CI/CD, understand build states, and use build artifacts in your apps."
  keywords: ["Brainpod builds", "CI/CD", "GitHub Actions", "container build", "automated deployment", "build pipeline", "artifacts"]
---
# Builds

Builds give you an automated pipeline from GitHub push to running container. Connect a repository to an app, merge the onboarding PR, and Brainpod automatically builds a new container image every time you push.

## How Builds Work

When you connect a repository to an app, Brainpod opens a pull request in that repository. The PR adds a GitHub Actions workflow that handles building and pushing your container image to your pod's private registry on every push to the configured branch.

Once you merge that PR, the pipeline is active. From that point on:

1. You push code to GitHub
2. The GitHub Actions workflow builds your container image
3. The image is pushed to `registry.brainpod.io/<podname>/`
4. The build appears in the Builds page with status and metadata

Brainpod does not run the build itself — GitHub Actions does. Brainpod tracks the result and stores the artifact so you can reference it in your app.

## Setting Up Builds

### Step 1: Connect GitHub

Before you can connect a repository, your GitHub account needs to be linked to your pod.

1. Go to **Settings** in your pod
2. Under the **GitHub** section, click **Connect GitHub**
3. Authorize the Brainpod GitHub App and select which repositories it can access

You only need to do this once per GitHub account. The connection is shared across all apps in your pod.

### Step 2: Connect a Repository to an App

Each build pipeline is tied to a specific app. To connect a repository:

1. Open the app you want to deploy from GitHub (create one first if needed)
2. Click **Connect Repository** in the app editor
3. Select the repository from the list

If the repository hasn't been onboarded before, Brainpod will open a pull request in it. This PR adds the GitHub Actions workflow file to your repository.

### Step 3: Merge the Onboarding PR

Review the PR Brainpod created and merge it. The workflow it adds will:

- Build a Docker image from your repository
- Push it to `registry.brainpod.io/<podname>/`
- Report the build status back to Brainpod

Once merged, your pipeline is live. The next push to the configured branch will trigger a build.

## Build States

Each build goes through the following states:

| State | Meaning |
|---|---|
| **Waiting** | Build triggered, waiting for a runner |
| **Pending** | Build is actively running |
| **Ready** | Build completed successfully, artifact available |
| **Failed** | Build encountered an error |
| **Cancelled** | Build was cancelled before completion |

Active builds (waiting and pending) are shown at the top of the list, separated from the build history.

## Build Details

Click any build row to expand its details:

- **Repository**: The GitHub repository that triggered the build
- **Workflow**: The GitHub Actions workflow name
- **Commit**: The full Git commit SHA
- **Branch**: The branch the commit was pushed to
- **State**: Current build state
- **Created / Finished**: Timestamps and total duration
- **Artifacts**: Container images produced by the build, with their full registry URI

## Artifacts

When a build succeeds, it produces one or more artifacts — container images stored in your pod's private registry. Each artifact has:

- A **name** (e.g. `app`)
- A **URI** pointing to the exact image (e.g. `registry.brainpod.io/<podname>/web@sha256:...`)

You can copy the URI directly from the build details panel and use it in your app's image field. This lets you pin an app to a specific build rather than a floating tag like `latest`.

## Filtering Builds

Use the filter bar at the top of the Builds page to narrow down the list:

- **Repository**: Show builds from a specific GitHub repository
- **Branch**: Show builds from a specific branch

Click **Clear filters** to reset.

## Next Steps

- [Container Registry](registry.md): Understand where build artifacts are stored
- [Apps](resources/apps.md): Configure an app to use a built image
- [Getting Started](getting-started.md): Deploy your first application
