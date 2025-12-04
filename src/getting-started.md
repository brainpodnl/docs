---
order: 1
hide_menu: false
---
# Getting Started

This guide walks you through deploying your first application on Brainpod. You'll create an app, expose it with a route, and see your application running on the internet in minutes.

## What You'll Build

By the end of this guide, you'll have:
- A containerized application running on Brainpod
- A public URL with automatic HTTPS
- Understanding of the core deployment workflow

## Step 1: Create Your First App

An app is your containerized application running on Brainpod's infrastructure.

1. Navigate to your pod in the Brainpod dashboard
2. Click **Create App** or go to the Apps section
3. Configure your app:
   - **Name**: `web` (or any descriptive name)
   - **Instance Type**: Select `small` for this example
   - **Replicas**: `1` for this example
   - **Image**: `nginx:latest` (or your container image)
   - **Environment Variables**: Leave empty for now
4. Click **Create**

Your app configuration is now saved as a draft. It's not running yet. We need to deploy it first.

## Step 2: Deploy Your App

Deploying makes your app revision active and starts your containers.

1. Review your app configuration in the draft
2. Click **Deploy** 
3. Wait for the deployment to complete (usually takes 30-60 seconds)

Your app is now running! However, it's not accessible from the internet yet. For that, we need a route.

## Step 3: Create a Route

A route exposes your app to the internet with a hostname and automatic TLS.

1. Go to the Routes section in your pod
2. Click **Create Route**
3. Configure your route:
   - **Name**: `web-route` (or any descriptive name)
   - **Routing Rules**: 
     - Path prefix: `/`
     - Target app: `web` (select the app you just created)
4. Click **Create**

## Step 4: Deploy Your Route

Just like apps, routes need to be deployed to go live.

1. Review your route configuration
2. Click **Deploy**
3. Wait for the deployment to complete

Your route is now live! You'll see a hostname that ends with `*.prod.brainpod.io`.

## Step 5: Access Your Application

Click on the hostname provided by your route. Your application is now accessible on the internet with automatic HTTPS!

If you deployed the nginx example, you'll see the default nginx welcome page.

## Understanding the Workflow

The workflow you just completed is the core Brainpod deployment pattern:

1. **Create drafts** — Configure your resources without affecting production
2. **Review changes** — Inspect your configuration before deploying
3. **Deploy** — Make your changes live
4. **Roll back** — If something goes wrong, revert to a previous revision

This same workflow applies whether you're deploying your first app or updating a complex multi-service application.

## Next Steps

Now that you have a basic application running, explore these topics:

- [Push your own images](registry.md) to Brainpod's private registry
- [Learn about resources](resources.md) and how apps and routes work together
- [Configure apps](resources/apps.md) with environment variables and scaling
- [Set up custom domains](custom-domains.md) for your routes

## Common Questions

**How do I update my application?**  
Update the image tag in your app configuration, create a new draft, and deploy it.

**Can I roll back a deployment?**  
Yes! Every deployment creates a revision. You can roll back to any previous revision from the history.

**How do I use my own domain?**  
Add a custom domain to your route and point your DNS records to Brainpod. TLS certificates are automatic.
