---
order: 1
hide_menu: false
metas:
  description: "Deploy your first application on Brainpod in minutes. Complete onboarding, create your first pod, deploy an app, and expose it with a route."
  keywords: ["Brainpod getting started", "onboarding", "deploy container", "create app", "create route", "quick start"]
---
# Getting Started

This guide walks you through your first deployment on Brainpod.

You will:
- complete onboarding,
- create your first pod,
- deploy an app,
- and expose it on the internet with a route.

## Step 0: Complete Onboarding

Before full dashboard access is available, complete onboarding:

1. Add billing details
2. Add a payment method
3. Create your first pod

If you have not done this yet, start with [Onboarding](onboarding.md).

## What You'll Build

By the end of this guide, you'll have:
- A containerized application running on Brainpod
- A public URL with automatic HTTPS
- Understanding of the core draft → deploy workflow

## Step 1: Open Your Pod

Go to your pod in the Brainpod dashboard.

A pod is your isolated workspace. Apps, routes, images, and revisions all live inside it.

## Step 2: Create Your First App

An app is your containerized workload running on Brainpod infrastructure.

1. Open the **Apps** section
2. Click **Create App**
3. Configure your app:
   - **Name**: `web` (or any descriptive name)
   - **Instance Type**: `small` for this example
   - **Replicas**: `1`
   - **Image**: `nginx:latest` (or your own image)
   - **Environment Variables**: leave empty for now
4. Click **Create**

Your app is now saved as a draft. It is not running yet.

## Step 3: Deploy Your App

1. Review your app draft
2. Click **Deploy**
3. Wait for deployment to complete

Your app is now running, but not publicly reachable yet.

## Step 4: Create a Route

A route exposes your app with a hostname and automatic TLS.

1. Open **Routes**
2. Click **Create Route**
3. Configure:
   - **Name**: `web-route`
   - **Routing rule**:
     - Path prefix: `/`
     - Target app: `web`
4. Click **Create**

## Step 5: Deploy Your Route

1. Review the route draft
2. Click **Deploy**
3. Wait for deployment to complete

You now get a public hostname for your app.

## Step 6: Open Your Application

Open the route hostname in your browser.

If you used `nginx:latest`, you should see the default nginx page.

## Understanding the Workflow

The same pattern applies to almost everything in Brainpod:

1. **Create drafts**: define changes safely
2. **Review changes**: verify before rollout
3. **Deploy**: make changes live
4. **Roll back**: restore a previous revision if needed

## Next Steps

- [Onboarding](onboarding.md): Review account setup requirements
- [Resources](resources.md): Learn how apps and routes work in depth
- [API Keys](api-keys.md): Create user-scoped policy-based keys
- [Container Registry](registry.md): Push your own images
- [Builds](builds.md): Automate builds from GitHub
- [Custom domains](custom_domains.md): Use your own domain names

## Common Questions

**How do I update my app?**
Update the image in the app draft and deploy a new revision.

**Can I roll back a deployment?**
Yes. Every deployment creates a revision you can restore.

**How do I use my own domain?**
Add a custom domain to your route and point DNS to Brainpod. TLS is handled automatically.
