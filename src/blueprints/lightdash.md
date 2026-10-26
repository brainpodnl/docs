---
order: 7
hide_menu: false
metas:
  description: "Deploy Lightdash OSS with managed PostgreSQL and a Pod-owned S3-compatible Bucket for assets and query results."
  keywords: ["Lightdash Brainpod", "business intelligence", "analytics", "dbt", "self-hosted Lightdash"]
---
# Lightdash

The Lightdash blueprint deploys the open-source edition for building metrics, charts, dashboards, and data insights from your warehouse.

## What Gets Deployed

The blueprint creates:

- **1 Disk**: 5 GB for PostgreSQL data;
- **1 Postgres**: a managed PostgreSQL 16 database for Lightdash metadata;
- **1 Bucket**: private S3-compatible storage for assets, results, and exports;
- **1 App**: Lightdash 2.588.0 on a `1x` instance;
- **1 Route**: a public HTTPS hostname for Lightdash.

Brainpod creates a Pod-owned Bucket for uploaded assets, query results, and exports. The database connection, public URL, and storage credentials are configured automatically.

## Install the Blueprint

1. Open the target pod and select **Blueprints**.
2. Select **Lightdash**.
3. Enter an installation name.
4. Review the generated resources and deploy the revision.
5. Open the Route hostname and complete the Lightdash setup.

Lightdash availability requires the pod owner's `blueprints`, `blueprint_lightdash`, and `resource_bucket` features. `blueprint_lightdash` is disabled by default, so the blueprint may not appear until it is enabled for the owner or subscription tier.

The blueprint creates the Bucket with the `exoscale` provider in `de-fra-1`. That provider and region must be available to the platform. Brainpod resolves the Bucket's endpoint, physical name, region, access key, and secret key into workload Secrets during deployment. Credential values are not stored in the blueprint or resource documents.

If deployment waits for storage credentials, wait until the Bucket reports **Ready** and retry the deployment. Removing a feature flag prevents new installations; it does not remove existing resources or revoke issued Bucket credentials.

## Next Steps

- [PostgresDB](../resources/postgres.md): Review the metadata database
- [Custom domains](../custom_domains.md): Use your own hostname
- [Blueprints](../blueprints.md): Browse other blueprints
