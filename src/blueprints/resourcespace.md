---
order: 6
hide_menu: false
metas:
  description: "Deploy ResourceSpace digital asset management with MariaDB, persistent media storage, and an administrator account on Brainpod."
  keywords: ["ResourceSpace Brainpod", "digital asset management", "DAM", "media library", "self-hosted ResourceSpace"]
---
# ResourceSpace

The ResourceSpace blueprint deploys an open-source digital asset management system for organizing, searching, and sharing images, documents, video, and other media.

## What Gets Deployed

The blueprint creates:

- **2 Disks**: 5 GB for MariaDB and 10 GB for uploaded assets and generated previews;
- **1 MariaDB**: a managed MariaDB 11 database;
- **1 App**: ResourceSpace 11.0.0 on a `1x` instance;
- **1 Route**: a public HTTPS hostname for the application.

The App receives its database connection and Route hostname from Brainpod resource variables. The media Disk is mounted at `/data` so originals and previews survive App restarts and redeployments.

## Install the Blueprint

1. Open the target pod and select **Blueprints**.
2. Select **ResourceSpace**.
3. Enter an installation name, administrator email, username, and password.
4. Review the generated resources and deploy the revision.
5. Open the Route hostname and sign in with the administrator account you supplied.

The administrator password must contain at least eight characters, one uppercase letter, one number, and one special character. The default username is `admin`, but you can replace it during installation.

Resource names receive the installation name as a prefix. Keep the credentials in a password manager; the blueprint passes them to ResourceSpace during installation.

## Storage and Availability

ResourceSpace stores media on a Disk, so the App runs as a single-instance stateful workload. Brainpod deploys disk-backed Apps with a recreate strategy. A deployment can therefore include a short interruption while the old instance stops and the replacement starts.

A revision rollback restores resource definitions but does not undo media or database changes already written to the Disks. Back up important assets and database data independently.

## Next Steps

- [Custom domains](../custom_domains.md): Use your own hostname
- [Disks](../resources/disks.md): Understand persistent media storage
- [MariaDB](../resources/mariadb.md): Review the managed database
- [Blueprints](../blueprints.md): Browse other blueprints
