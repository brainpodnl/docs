---
order: 7
hide_menu: false
metas:
  description: "Use the Brainpod REST API and OpenAPI contract to manage pods, revisions, resources, events, images, clusters, and blueprints."
  keywords: ["Brainpod API", "REST API", "OpenAPI", "Brainpod endpoints", "API authentication"]
---
# API reference

The Brainpod REST API provides programmatic access to pods, revisions, resources, deployments, events, images, clusters, and blueprints.

## Base URL and contract

The production API base URL is:

```text
https://api.brainpod.io
```

The public OpenAPI document is available without authentication:

- [OpenAPI JSON](https://api.brainpod.io/v1/openapi.json)

Treat the OpenAPI document as the authoritative contract for request fields, response schemas, required policy actions, and current resource kinds.

## Authentication

Every `/v1` endpoint except the OpenAPI document requires a Brainpod API key as a bearer token:

```http
Authorization: Bearer <brainpod-api-key>
```

Create a key in **Settings → API Keys** and grant only the actions required by the integration. Do not expose API keys in browser code, URLs, logs, or source control.

## Example request

List pods available to the authenticated user:

```sh
curl --fail-with-body \
  --header "Authorization: Bearer $BRAINPOD_API_TOKEN" \
  https://api.brainpod.io/v1/pods
```

Use environment variables or your secret manager instead of writing a key directly into a command or configuration file.

## API groups

| Group | Purpose |
|---|---|
| **Users** | Inspect the current API user |
| **Pods** | List, create, and inspect pods |
| **Blueprints** | List blueprint metadata and install resource sets |
| **Clusters** | Inspect active clusters and supported architectures |
| **Revisions** | List revisions, inspect content, and compare changes |
| **Deployments** | Deploy the mutable head or redeploy the current revision |
| **Resources** | Validate, create, replace, delete, resolve, and list resources |
| **Variables** | List references exported by resources |
| **Events** | Query or stream application, HTTP access, and platform events |
| **Images** | List and inspect public or pod-scoped container images |

## Resource mutations and deployment

Creating, replacing, deleting, or installing resources changes the pod's mutable head. The change does not affect the running environment until the head is deployed.

A typical workflow is:

1. Submit one resource or an array of resources to `POST /v1/pods/{pod}/resources`.
2. Review the returned revision and validation warnings.
3. Inspect the revision or compare it with the deployed revision.
4. Deploy the mutable head with `POST /v1/pods/{pod}/deploy`.
5. Monitor revision health and resource events.

The namespace is currently fixed to `default`.

### Deploy the reviewed draft

Pass the UUID of the draft you reviewed as `revisionId` to prevent deploying a different head revision:

```sh
curl --fail-with-body \
  --request POST \
  --header "Authorization: Bearer $BRAINPOD_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"revisionId":"00000000-0000-4000-8000-000000000001","summary":"Deploy reviewed draft"}' \
  https://api.brainpod.io/v1/pods/my-pod/deploy
```

Replace `my-pod` and the example UUID with your pod name and the revision ID returned by your resource mutation or revision inspection. The API key needs `revisions:deploy`.

The API deploys only when the supplied ID still identifies the current draft head. If it differs, or the head is no longer a draft, the request fails with HTTP `412` (`PRECONDITION_FAILED`). Read the current head, review its content and diff, then submit its ID if you intend to deploy it. Omitting `revisionId` deploys the current draft head without checking its ID against the one you reviewed; it does not select a historical revision.

This guards the revision ID, not the contents of a mutable draft. Edits to the same draft can retain its ID, so coordinate concurrent editors when the exact reviewed content must remain unchanged.

### Discard the current draft

Delete the exact current draft revision to restore its parent as the mutable head:

```sh
curl --fail-with-body \
  --request DELETE \
  --header "Authorization: Bearer $BRAINPOD_API_TOKEN" \
  https://api.brainpod.io/v1/pods/my-pod/revisions/00000000-0000-4000-8000-000000000001
```

Replace the pod name and UUID with the current draft head. The API key needs `resources:write`.

The request fails with HTTP `412` when the UUID is stale, the revision is not the current draft head, or the draft has no parent. Read the pod again and review the current head before retrying. A successful discard changes the mutable head to the draft's parent and leaves the deployed revision and running resources unchanged.

## Resource schemas and variables

`ResourceInput` in the OpenAPI components contains the supported resource documents. The live contract currently includes:

- App
- Config
- Route
- Postgres
- MariaDB
- Valkey
- Disk
- MSSQL

Resource schemas include `x-brainpod-variables`, which describes references such as `${db.uri}` that can be used in App environment variables. Secret variables are identified as secret and their values are not returned by the variables API.

## Errors

API errors include:

- a stable error code for programmatic handling;
- a human-readable message;
- a request ID for support correlation;
- additional details when relevant.

Use the HTTP status for the broad error class and the stable code for specific recovery behavior. Include the request ID when contacting support, but do not include API keys or secret values.

## Streaming events

`GET /v1/pods/{pod}/events/watch` uses server-sent events. Clients should process events as they arrive, retain the latest event ID, and reconnect after the server closes a stream. The [Brainpod CLI](cli.md) implements this reconnection behavior.

## Next steps

- [API keys](api-keys.md): Define least-privilege policies
- [Brainpod CLI](cli.md): Use a version-matched command contract
- [Resources](resources.md): Understand available resource types
- [Database tunnels](database-tunnels.md): Connect local database tools
