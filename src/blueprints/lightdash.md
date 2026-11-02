---
order: 7
hide_menu: false
metas:
  description: "Deploy Lightdash OSS with managed PostgreSQL and connect S3-compatible object storage for assets and query results."
  keywords: ["Lightdash Brainpod", "business intelligence", "analytics", "dbt", "self-hosted Lightdash"]
---
# Lightdash

The Lightdash blueprint deploys the open-source edition for building metrics, charts, dashboards, and data insights from your warehouse.

## What Gets Deployed

The blueprint creates:

- **1 Disk**: 5 GB for PostgreSQL data;
- **1 Postgres**: a managed PostgreSQL 16 database for Lightdash metadata;
- **1 App**: Lightdash 2.588.0 on a `1x` instance;
- **1 Route**: a public HTTPS hostname for Lightdash.

You supply an existing S3-compatible bucket for uploaded assets, query results, and exports. Brainpod configures the database connection and public URL automatically.

## Prepare Object Storage

Before installation, collect these values from your S3-compatible provider:

- endpoint URL;
- bucket name;
- region;
- access key;
- secret key.

The endpoint must be a complete URL. The installation form defaults the region to `us-east-1`; replace it when your provider uses another region. Use credentials restricted to the selected bucket and the operations Lightdash needs.

## Install the Blueprint

1. Open the target pod and select **Blueprints**.
2. Select **Lightdash**.
3. Enter an installation name and the five object-storage values.
4. Review the generated resources and deploy the revision.
5. Open the Route hostname and complete the Lightdash setup.

The blueprint passes the supplied storage values to `S3_ENDPOINT`, `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY`, and `S3_SECRET_KEY`. Query-result storage inherits the same configuration.

Treat the access and secret keys as credentials. Rotate them at the provider and update the App when access changes.

## Next Steps

- [PostgresDB](../resources/postgres.md): Review the metadata database
- [Custom domains](../custom_domains.md): Use your own hostname
- [Blueprints](../blueprints.md): Browse other blueprints
