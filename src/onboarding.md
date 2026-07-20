---
order: 2
hide_menu: false
metas:
  description: "Complete Brainpod onboarding: billing details, payment method, and creating your first pod. Understand what is required before dashboard access."
  keywords: ["Brainpod onboarding", "billing", "payment method", "first pod", "dashboard access"]
---
# Onboarding

New Brainpod accounts go through a short onboarding flow before full dashboard access is enabled.

The flow makes sure your account is ready for usage-based billing and that your first project space (pod) is set up.

## What Onboarding Includes

Onboarding has four steps:

1. **Welcome**
2. **Billing details**
3. **Payment method**
4. **Create your first pod**

After these steps are completed, Brainpod marks your account as onboarded and sends you to the dashboard.

## Why This Is Required

Before onboarding is complete, Brainpod redirects signed-in users to the onboarding page.

This ensures:
- billing information is available,
- a payment method is active,
- and at least one pod exists for your workloads.

## Payment Method States

During onboarding, payment setup can show different states:

- **Active**: You can continue to the next step.
- **Pending**: Verification is still being processed. The page updates automatically.
- **Failed**: Verification did not complete. Retry adding a payment method.

## Creating Your First Pod

In the final step, you create your first pod, optionally from a blueprint.

Your pod name is important because it is used in:
- pod URLs,
- registry image paths (`registry.brainpod.io/<podname>/...`),
- and API key policies that target pod resources.

After creating your first pod, Brainpod shows a quick reminder with links to registry documentation.

## API Keys During Onboarding and After

API keys are managed per user and can be limited with policy statements.

When creating an API key, you select:
- one or more actions (for example registry or build actions),
- one or more pod resources the key can access,
- and whether statements allow or deny those actions.

See [API Keys](api-keys.md) for policy details, [Container Registry](registry.md) for push/pull usage, and [Builds](builds.md) for CI/CD usage.

## Next Steps

- [Getting Started](getting-started.md): Deploy your first app and route
- [API Keys](api-keys.md): Manage policy-based user keys
- [Container Registry](registry.md): Push your own images
- [Builds](builds.md): Automate builds from GitHub
