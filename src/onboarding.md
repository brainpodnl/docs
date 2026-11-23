---
order: 2
hide_menu: false
metas:
  description: "Connect GitHub, let Brainpod analyze and build a repository, review its generated pod, and complete repository onboarding."
  keywords: ["Brainpod onboarding", "GitHub repository", "agent onboarding", "GitHub Actions", "first pod", "billing"]
---
# Onboarding

Repository onboarding turns an existing GitHub repository into a Brainpod pod. The Brainpod agent plans the deployment, writes a draft revision, builds images through the repository's GitHub Actions, and checks that the deployed applications start.

## Connect GitHub and choose a repository

1. Select **Continue with GitHub**.
2. Install or authorize the Brainpod GitHub App for the repository you want to deploy.
3. Choose a repository and branch.
4. Select **Analyze repository**.

Brainpod creates an onboarding pod and pins the session to the selected commit. Use the link for granting repository access when the repository does not appear. You can also start from a template or create an empty pod.

## Follow the plan and builds

The agent card shows the session steps from the start. Each step reports whether it is waiting, running, completed, or failed, how long it has run, and what it produced. Open the conversation when you need the agent's detailed activity.

Planned Apps appear on the canvas as soon as the agent identifies the services. Other resources replace or join them while the agent writes the draft. Select a resource to review the source-file evidence behind it.

The agent commits the build configuration to an onboarding branch named `brainpod/onboarding-<pod>`. The first images build in the repository's GitHub Actions. Each service shows whether its workflow started and the current Build phase; select the Build to inspect its log.

If GitHub Actions cannot start because the repository owner reached an Actions minutes or spending limit, follow the billing link in the failure card and select **Try again** after resolving it.

## Review decisions and required values

The agent pauses when it needs a decision or sensitive value:

1. Open the affected resource and review the linked source evidence.
2. Enter each required value. Brainpod stores sensitive values as Secret resources in the draft.
3. Use **Open settings** to adjust an individual resource.
4. Add corrections or a broader request in the reply field.
5. Review the resulting resources and image builds.

A reply starts a follow-up run against the same draft. When the agent has no remaining questions or required values, it deploys the exact draft as its final step. When user review is still required, select **Review and deploy** to deploy the revision you reviewed.

The deployment card follows resource readiness. If an App fails to start and the agent can correct its plan, onboarding returns to the active step, rebuilds the affected service, and deploys another revision.

Select **Skip setup** to keep the draft and leave onboarding without deploying. **Start over** deletes the onboarding pod only while no deployment has ever been requested.

## Continuous deployments

During onboarding, Brainpod adds `steiger.yml` and the deploy workflow to the onboarding branch and opens a draft pull request where GitHub permits it. The workflow authenticates to Brainpod with GitHub OIDC, so it does not add an API key to the repository.

After the pod becomes healthy, Brainpod makes that pull request ready for review, or opens it when GitHub did not allow a draft. Review and merge it when you want continuous deployments. You can skip this step and continue to the pod dashboard.

## Trial limits and billing

Trial accounts have a smaller agent budget per onboarding run. When the analysis reaches that limit, select **Add billing details**, complete the payment method flow in the canvas, and then retry the analysis. A retried run uses the limits of the account's current tier.

Settings, notifications, and billing pages remain available while onboarding is incomplete. Other dashboard pages continue to redirect to onboarding until the first deployment succeeds or you explicitly skip setup.

## Recovery

- **Repository missing**: grant the GitHub App access to more repositories and reload the repository picker.
- **Analysis failed**: open the agent activity, fix the reported repository issue, and select **Try again**.
- **Trial limit reached**: add billing details or choose a template instead.
- **GitHub Actions did not run**: resolve the reported Actions limit or repository setting, then retry the workflow.
- **Build failed**: inspect the Build attached to the affected service. The agent may revise its plan when the failure identifies an actionable cause.
- **Deployment failed**: review resource Events and the reported startup reason. Apply corrections before retrying.

## Next steps

- [Brainpod concepts](brainpod.md): Understand drafts, revisions, and deployment
- [Builds](builds.md): Review repository builds
- [Resources](resources.md): Inspect the generated resource graph
- [Blueprints](blueprints.md): Start from a predefined stack
