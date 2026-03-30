---
order: 2
hide_menu: false
metas:
  description: "Run a self-hosted PocketBase backend on Brainpod. Deploy PocketBase as a containerized app with persistent storage and a public route."
  keywords: ["PocketBase Brainpod", "self-hosted PocketBase", "deploy PocketBase", "backend as a service", "BaaS"]
---
# PocketBase

The PocketBase blueprint deploys a self-hosted PocketBase backend on Brainpod. PocketBase gives you a realtime database, authentication, file storage, and an admin UI: all in a single app. Brainpod handles the infrastructure.

## What Gets Deployed

The blueprint creates the following resources in your pod:

- **1 Disk**: persistent storage for your PocketBase data at `/pb_data`
- **1 App**: PocketBase v0.36.7 running on port 8090
- **1 Route**: a public hostname under `*.route.brainpod.io` with automatic TLS

## Deploying the Blueprint

1. Go to your pod in the Brainpod dashboard
2. Navigate to **Blueprints**
3. Select **PocketBase**
4. Give your deployment a name (e.g. `backend`): this prefixes all created resources
5. Click **Deploy**

Brainpod creates all resources and deploys them. Once the deployment is complete, you need to create your first superuser account before you can use the admin UI.

## Creating Your Superuser Account

PocketBase generates a one-time setup link the first time it starts. To find it:

1. Go to your pod in the Brainpod dashboard
2. Open the **Events** page for your PocketBase app
3. Look for a log line that contains a link like:

```
http://0.0.0.0:8090/_/#/pbinstal/...
```

4. Copy that URL and replace `0.0.0.0:8090` with your Brainpod hostname (shown on your Route)

The final URL will look like:

```
https://your-hostname.route.brainpod.io/_/#/pbinstal/...
```

Open that URL in your browser to create your superuser account. After completing the setup you have full access to the PocketBase admin UI at `https://your-hostname.route.brainpod.io/_/`.

## Next Steps

- [Custom domains](../custom_domains.md): Point your own domain to your PocketBase instance
- [Disks](../resources/disks.md): Learn about the persistent storage backing your data
- [Blueprints](../blueprints.md): Browse other available blueprints
