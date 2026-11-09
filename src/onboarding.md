---
order: 2
hide_menu: false
metas:
  description: "Connect GitHub, let the Brainpod agent analyze a repository, review the generated pod draft, and complete your first deployment."
  keywords: ["Brainpod onboarding", "GitHub repository", "agent onboarding", "first pod", "billing"]
---
# Onboarding

Repository onboarding turns an existing GitHub repository into a reviewable Brainpod pod. The Brainpod agent reads the selected commit, proposes resources on the pod canvas, builds the application images, and leaves the first deployment under your control.

## Connect GitHub and choose a repository

1. Select **Continue with GitHub**.
2. Install or authorize the Brainpod GitHub App for the repository you want to deploy.
3. Choose a repository and branch.
4. Select **Analyze repository**.

Brainpod creates an onboarding pod and starts an agent run pinned to the selected commit. Use the link for granting repository access when the repository does not appear. You can also start from a template or create an empty pod.

## Follow the analysis

The agent card shows each step as waiting, running, completed, or failed. Before the conversation begins, it reports whether the run is waiting for a runner, preparing its workspace, or checking out the repository.

The summary shows elapsed time, tool calls, and images that are still building. Select **All activity** to open the read-only conversation, including commands and their output. After a failed run, the same history remains available as **What the agent did**.

Resources appear on the canvas while the agent works. The run may create disks, databases, configuration, builds, apps, and routes as it discovers the repository. A retry continues from the partial draft where possible.

## Review the proposed pod

Before deployment:

1. Open each proposed resource and review the agent's file and line evidence.
2. Supply every required value requested by the agent.
3. Use **Open settings** to change a resource directly.
4. Enter corrections or a follow-up request when the proposal needs broader changes.
5. Review the complete draft and its image builds.

The onboarding agent does not deploy the initial proposal by itself. **Review and deploy** deploys the exact draft you reviewed. If a build or deployment fails, fix the cause and retry from the canvas.

Select **Skip setup** to keep the draft and leave onboarding without deploying. **Start over** deletes the onboarding pod only while no deployment has ever been requested.

## Continuous deployments

After the first successful deployment, the agent can propose a pull request containing continuous-deployment files. Review those files before asking Brainpod to open the pull request. This step is optional; finish onboarding to continue to the pod dashboard.

## Trial limits and billing

Trial accounts have a smaller agent budget per onboarding run. When the analysis reaches that limit, select **Add billing details**, complete the payment method flow in the canvas, and then retry the analysis. A retried run uses the limits of the account's current tier.

Settings, notifications, and billing pages remain available while onboarding is incomplete. Other dashboard pages continue to redirect to onboarding until the first deployment succeeds or you explicitly skip setup.

## Recovery

- **Repository missing**: grant the GitHub App access to more repositories and reload the repository picker.
- **Analysis failed**: open **What the agent did**, fix the reported repository issue, and select **Try again**.
- **Trial limit reached**: add billing details or choose a template instead.
- **Build failed**: inspect the build attached to the affected App, update the draft or repository, and retry.
- **Deployment failed**: review resource events, correct the draft, and deploy again.

## Next steps

- [Brainpod concepts](brainpod.md): Understand drafts, revisions, and deployment
- [Builds](builds.md): Review repository builds
- [Resources](resources.md): Inspect the generated resource graph
- [Blueprints](blueprints.md): Start from a predefined stack
