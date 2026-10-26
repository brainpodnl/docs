---
order: 4
hide_menu: false
metas:
  description: "Create private S3-compatible Brainpod Buckets, connect Apps with scoped credentials, and manage objects in the console."
  keywords: ["Brainpod bucket", "S3 storage", "object storage", "file uploads", "S3 credentials"]
---
# Buckets

A Bucket provides private S3-compatible object storage for one pod. Use it for uploads, generated files, exports, backups, or other data that does not need a mounted filesystem.

Bucket support must be enabled for your account. When it is unavailable, the Bucket resource and **Storage** navigation are hidden.

## Create a Bucket

In the console:

1. Open the pod and select **Resources**.
2. Select **Create resource → Bucket**.
3. Enter a name and choose an available provider and region.
4. Save the Bucket and deploy the draft revision.
5. Wait until the Bucket reports **Ready** before using its credentials or managing objects.

Names contain 3–63 lowercase letters, numbers, or hyphens. A name is unique within its pod. Provider and region cannot be changed after creation.

The equivalent resource document is:

```json
{
  "apiVersion": "pod.brainpod.io/v1alpha1",
  "kind": "Bucket",
  "metadata": {
    "name": "uploads",
    "namespace": "default"
  },
  "spec": {
    "provider": "exoscale",
    "region": "de-fra-1"
  }
}
```

Provider keys and regions depend on the platform configuration. Use the console selectors instead of assuming that the example values are available.

## Connect an App

A ready Bucket exports five secret variables:

| Variable | Purpose |
|---|---|
| `${s3.uploads.endpoint}` | Direct S3 provider endpoint |
| `${s3.uploads.region}` | Provider region |
| `${s3.uploads.bucketName}` | Physical provider bucket name |
| `${s3.uploads.accessKeyId}` | Bucket-scoped access key |
| `${s3.uploads.secretAccessKey}` | Bucket-scoped signing secret |

Replace `uploads` with the resource name. Reference these variables in an App environment instead of copying credential values:

```json
{
  "env": [
    { "name": "S3_ENDPOINT", "value": "${s3.uploads.endpoint}" },
    { "name": "S3_REGION", "value": "${s3.uploads.region}" },
    { "name": "S3_BUCKET", "value": "${s3.uploads.bucketName}" },
    { "name": "S3_ACCESS_KEY", "value": "${s3.uploads.accessKeyId}" },
    { "name": "S3_SECRET_KEY", "value": "${s3.uploads.secretAccessKey}" }
  ]
}
```

Brainpod resolves the references to workload Secrets during deployment. Secret values are not stored in the App or Bucket resource document and are not returned by the variables API.

## Manage Objects

Open **Storage** in the pod navigation and select a ready Bucket. The file manager lets you:

- browse folders and objects;
- upload files up to 25 MiB each;
- create folders;
- download files;
- delete objects or empty folders.

File transfers pass through the authenticated Brainpod console. Refresh the listing if an interrupted upload may have completed at the provider.

## Delete a Bucket

Removing the resource from a draft schedules provider deletion after deployment. Brainpod retains the physical bucket while a live or preparing revision still needs it. The bucket must be empty before it can be deleted.

Deleting a Bucket resource does not silently remove stored objects. Delete the objects first, then remove and deploy the resource change.

## Use the CLI

Inspect the Bucket schema and create it through the normal revision workflow:

```sh
brainpod describe resource bucket --json
brainpod --pod my-pod resource create --file bucket.json --dry-run
brainpod --pod my-pod resource create --file bucket.json
brainpod --pod my-pod deploy --wait
```

## Next Steps

- [Apps](apps.md): Reference Bucket credentials in environment variables
- [Disks](disks.md): Compare mounted block storage
- [API reference](../api-reference.md): Use Bucket resources through the REST API
- [Resources](../resources.md): Review all resource types
