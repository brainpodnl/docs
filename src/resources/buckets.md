---
order: 4
hide_menu: false
metas:
  description: "Create private S3-compatible Brainpod Buckets, connect Apps with scoped credentials, and manage objects in the console."
  keywords: ["Brainpod bucket", "S3 storage", "object storage", "file uploads", "S3 credentials"]
---
# Buckets

A Bucket provides private S3-compatible object storage for one pod. Use it for uploads, generated files, exports, backups, or other data that does not need a mounted filesystem.

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

Provider keys and regions depend on the platform configuration. Use the console selectors or `GET /v1/storage/providers` to discover available placement instead of assuming that the example values are available.

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

Brainpod delivers the referenced credentials to the workload without storing their values in the App or Bucket resource document or returning them from the variables API. Configure your S3 client with the exported endpoint, region, physical bucket name, and credentials; use path-style bucket addressing. Environment variable names depend on your application.

Apps connect directly to the S3 provider using native S3 authentication. They do not send a Brainpod API key to the gateway described below.

## Manage objects

Open **Storage** in the pod navigation and select a ready Bucket. The file manager lets you:

- browse folders and objects;
- upload files up to 25 MiB each;
- create folders;
- download files;
- delete objects or empty folders.

The console authorizes each operation with a short-lived, pod-scoped machine key. Uploads pass through the console and S3 gateway. Downloads open a provider-presigned URL valid for 60 seconds; the browser downloads directly from the storage provider, not through the console or gateway. Treat these URLs as temporary secrets: an issued URL remains usable until expiry even if the Brainpod API key is revoked.

Refresh the listing if an interrupted upload may have completed at the provider. Deleting a folder removes only its empty marker, not the objects beneath its prefix.

## Use the S3 gateway

For scripts that manage objects with a Brainpod API key, use the pod-specific endpoint:

```text
https://<pod-name>.s3.brainpod.io/<bucket-name>/<object-key>
```

Use the logical Bucket resource name in this URL, not the physical provider bucket name exported to Apps. Encode object-key path segments as URL components while preserving slash separators.

The gateway uses `Authorization: Bearer <brainpod-api-key>`, not AWS Signature Version 4. Unmodified AWS CLI and SDK authentication does not work with this endpoint. For an App that needs a native S3 client, use the [direct provider connection](#connect-an-app) instead.

Create an [API key](../api-keys.md) with an explicit policy for the target pod:

| Action | Allows |
|---|---|
| `s3:list` | Listing the pod's buckets and their objects |
| `s3:read` | Requesting a short-lived download URL |
| `s3:write` | Uploading, replacing, and deleting objects, including multipart operations |

A policy grant does not give access to a pod the key's owner cannot access. These grants are pod-scoped, not bucket- or object-prefix-scoped. Write permission includes deletion; it is not upload-only.

With the key available in the `BRAINPOD_API_KEY` environment variable, list objects in the `uploads` Bucket:

```sh
curl --fail-with-body \
  --header "Authorization: Bearer ${BRAINPOD_API_KEY}" \
  'https://my-pod.s3.brainpod.io/uploads?list-type=2&delimiter=%2F'
```

Listings use S3 XML and support prefixes and continuation tokens. To upload a single file:

```sh
curl --fail-with-body \
  --header "Authorization: Bearer ${BRAINPOD_API_KEY}" \
  --header 'Content-Type: image/png' \
  --upload-file ./photo.png \
  'https://my-pod.s3.brainpod.io/uploads/photo.png'
```

Single-object uploads require `Content-Length` and are limited to 25 MiB. The gateway also supports initiating, uploading parts, completing, and aborting multipart uploads; each part has the same 25 MiB limit. Multipart listing, automatic resume, and automatic cleanup of abandoned uploads are not supported.

To request a download URL without following the redirect:

```sh
curl --fail-with-body \
  --dump-header - --output /dev/null \
  --header "Authorization: Bearer ${BRAINPOD_API_KEY}" \
  'https://my-pod.s3.brainpod.io/uploads/photo.png'
```

A successful response is `307 Temporary Redirect`. Open its `Location` URL, or download it with a separate request that has **no Brainpod Authorization header**. Do not use `--location-trusted`: the provider uses the signature in the URL, not your Brainpod API key.

The gateway supports `ListBuckets`, `ListObjectsV2`, `PutObject`, `GetObject`, `DeleteObject`, and the multipart operations above. It does not support `HeadObject`, ranged or conditional downloads, object versions, bulk deletion, or bucket creation/deletion. Create and remove Buckets through the resource revision workflow, not the object gateway.

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

Gateway object commands shipped in [CLI v0.0.7](https://github.com/brainpodnl/cli/releases/tag/v0.0.7) and remain available in v0.0.8. Use your normal Brainpod login and an API key with the explicit S3 permissions above; existing keys are not expanded automatically.

```sh
brainpod --pod my-pod s3 ls
brainpod --pod my-pod s3 ls s3://uploads/images/
brainpod --pod my-pod s3 cp ./photo.png s3://uploads/photo.png
brainpod --pod my-pod s3 cp s3://uploads/photo.png ./downloaded.png
brainpod --pod my-pod s3 mv s3://uploads/photo.png s3://uploads/renamed.png
brainpod --pod my-pod s3 rm s3://uploads/renamed.png
```

Paths use the logical Bucket name and literal UTF-8 object keys, not provider names or URLs. Quote shell metacharacters; do not percent-encode keys in CLI paths. Listings automatically fetch all pages and show one level of objects and prefixes.

Copies, moves, and file-based `s3 upload` are limited to 25 MiB. Local destination files must not already exist; remote destinations replace existing objects. Moves copy first, then delete the source, and are not atomic. `s3 rm` deletes one exact key, never an entire prefix. There is no recursive or sync command.

For larger downloads, `brainpod --pod my-pod s3 download s3://uploads/large-file.bin -` streams raw bytes to stdout. Check the process exit status before using the result: interrupted downloads can leave partial output. Streaming `s3 upload -` uses multipart uploads and requires an explicit producer-success file; see the [CLI streaming transfer guide](https://github.com/brainpodnl/cli/blob/v0.0.8/README.md#streaming-transfers) before using it. The gateway accepts only its supported backup metadata fields, not arbitrary multipart metadata.

The CLI defaults to `https://s3.brainpod.io` and adds the selected pod's hostname. Override the base origin with `--s3-endpoint`, `BRAINPOD_S3_ENDPOINT`, or `brainpod config set s3-endpoint <url>`. Changing the REST API endpoint does not change the S3 endpoint. The CLI handles Bearer authentication and downloads without forwarding the API key to the provider.

## Next steps

- [Apps](apps.md): Reference Bucket credentials in environment variables
- [Disks](disks.md): Compare mounted block storage
- [API reference](../api-reference.md): Use Bucket resources through the REST API
- [Resources](../resources.md): Review all resource types
