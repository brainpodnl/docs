---
order: 1
hide_menu: false
metas:
  description: "Deploy WordPress on Brainpod with a managed MariaDB database and persistent storage. Step-by-step blueprint for a production-ready WordPress installation."
  keywords: ["WordPress Brainpod", "deploy WordPress", "WordPress hosting", "managed WordPress", "self-hosted WordPress"]
---
# WordPress

The WordPress blueprint deploys a complete WordPress stack on Brainpod in one step. It sets up everything you need: a managed database, persistent storage for your files, the WordPress app, and a public route with automatic HTTPS.

## What Gets Deployed

The blueprint creates the following resources in your pod:

- **2 Disks**: one for the database, one for your WordPress files and uploads
- **1 MariaDB**: a managed MySQL-compatible database that WordPress connects to automatically
- **1 App**: WordPress 6.9 running on PHP 8.2 with Apache
- **1 Route**: a public hostname under `*.route.brainpod.io` with automatic TLS

The database connection is wired up automatically. You do not need to configure `WORDPRESS_DB_HOST`, `WORDPRESS_DB_USER`, `WORDPRESS_DB_PASSWORD`, or `WORDPRESS_DB_NAME` yourself.

## Deploying the Blueprint

1. Go to your pod in the Brainpod dashboard
2. Navigate to **Blueprints**
3. Select **WordPress**
4. Give your deployment a name (e.g. `myblog`): this prefixes all created resources
5. Click **Deploy**

Brainpod creates all resources and deploys them. Once the deployment is complete, open the hostname shown on your Route. You will be greeted by the WordPress setup wizard.

## Finishing the WordPress Setup

The first time you visit your WordPress URL, the setup wizard walks you through:

1. Choosing a language
2. Setting your site title
3. Creating your admin username and password

After completing the wizard you are taken to the WordPress dashboard and your site is live.

## Next Steps

- [Custom domains](../custom_domains.md): Point your own domain to your WordPress site
- [Container Registry](../registry.md): Push a custom image if you need plugins pre-installed
- [Disks](../resources/disks.md): Learn about the persistent storage backing your site
- [Blueprints](../blueprints.md): Browse other available blueprints
