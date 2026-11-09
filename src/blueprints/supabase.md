---
order: 8
hide_menu: false
metas:
  description: "Deploy Supabase on Brainpod with managed PostgreSQL, S3-compatible storage, protected Studio, and routed API services."
  keywords: ["Supabase Brainpod", "deploy Supabase", "Supabase PostgreSQL", "Supabase Studio"]
---
# Supabase

The Supabase blueprint deploys the Supabase API services and Studio with Brainpod-managed PostgreSQL and object storage.

## Resources

The blueprint creates:

- one PostgresDB 16 resource with a persistent Disk;
- one Bucket for Supabase object storage;
- one stateless App for Auth, REST, Storage, Realtime, and Edge Functions;
- one Studio App with a 5 GB Disk for saved snippets;
- one Route for the API paths and Studio.

The Route sends `/auth/v1`, `/rest/v1`, `/storage/v1`, and `/functions/v1` to their service ports. It sends `/realtime/v1` to Realtime with the hostname and path rewrite that service expects. The root path opens Studio.

Studio has no independent login and connects with elevated database access. Brainpod therefore protects the root Route with Brainpod authentication; only the pod owner and members can open it.

## Deploy

1. Open **Blueprints** in the target pod.
2. Select **Supabase** and enter a deployment name.
3. Review the generated PostgresDB, Bucket, Apps, Disks, and Route.
4. Deploy the draft.
5. Wait for the database and both Apps to become healthy.
6. Open the generated Route. Sign in to Brainpod when opening Studio.

The Supabase blueprint may be unavailable until the account has the Supabase blueprint, general blueprint, and Bucket features enabled.

## Generated configuration

Brainpod generates one shared JWT secret for the API and Studio Apps. The Apps receive database and Bucket settings from resource references, so the generated values follow the deployed resources without copying provider credentials into the blueprint.

Email autoconfirmation is enabled because the blueprint does not provision an SMTP service. Configure a mail provider after deployment before relying on email confirmation flows.

## Limitations

- Realtime database-change subscriptions that require logical WAL are unavailable in the default database configuration.
- Restoring the database can remove grants created outside the blueprint. Recheck Supabase roles and grants after a restore.
- Studio stores saved snippets on its own Disk and therefore runs as a single replica.

## Next steps

- [PostgresDB](../resources/postgres.md): Review the managed database
- [Database backups](../database-backups.md): Configure a fresh database backup
- [Custom domains](../custom_domains.md): Attach a domain to the Supabase Route
- [Brainpod resources](../resources.md): Review the generated resource graph
