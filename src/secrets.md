---
order: 6
hide_menu: false
metas:
  description: "Create, reference, rotate, and redeploy write-only Brainpod Pod secrets without storing sensitive values in resource JSON."
  keywords: ["Brainpod secrets", "Pod secrets", "secret rotation", "runtime secrets", "environment variables"]
---
# Pod secrets

Pod secrets store passwords, tokens, and keys separately from resource documents. Values are write-only: Brainpod never shows them again after creation and API responses contain metadata only.

## Create a secret

Open the pod's **Secrets** page and select **Create secret**. Give the secret a name and either enter a value or ask Brainpod to generate one.

Generated values can use the alphanumeric, hexadecimal, base64url, or printable character sets. The generated value is also write-only, so reference it from workloads instead of expecting to copy it later.

To create a value through the REST API:

```sh
curl --fail-with-body \
  --request POST \
  --header "Authorization: Bearer $BRAINPOD_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"name":"payment-token","value":"replace-with-secret-input"}' \
  https://api.brainpod.io/v1/pods/my-pod/secrets
```

The key needs `resources:write` for the pod. Values must be non-empty, at most 32 KiB, and cannot contain a single quote, a NUL character, or a carriage return.

## Reference a secret from an App

Use this value in an App environment variable:

```text
${secret.payment-token}
```

The reference is stored in the resource document; the value is not. When Brainpod renders the revision, it pins the current secret version. At startup, the workload receives that pinned value through in-memory runtime delivery.

A deployed revision continues using the pinned version even after you overwrite or delete the secret.

## Rotate a secret

Select **Overwrite** beside the secret to create a new version. Existing running Apps keep their deployed version until you:

- deploy another revision that references the secret; or
- select **Redeploy with current secrets** on the Secrets page.

The redeploy action creates a revision using the current versions and restarts Apps whose secret versions changed. Review the version and **Used by** columns before redeploying.

Through the REST API, replace a value with `PUT /v1/pods/{pod}/secrets/{name}`, then deploy or call `POST /v1/pods/{pod}/redeploy-secrets`.

## Delete a secret

Deleting a secret makes its name immediately reusable. Deployed revisions keep access to the versions they already pin, but a new render that still contains `${secret.<name>}` fails.

Remove or replace every reference on the mutable head before deleting a secret that future deployments still need.

## Security behavior

- Values are never returned by list or detail APIs.
- Secret values are not stored in App resource JSON or Kubernetes Secrets.
- Each rendered revision pins exact secret versions for repeatable deployment.
- The workload receives values at startup through an in-memory volume.
- Anyone who can change resources and secret values can affect the next deployment; grant `resources:write` narrowly.

## Next steps

- [Apps](resources/apps.md): Reference secrets in environment variables
- [Config](resources/config.md): Store non-sensitive files
- [API keys](api-keys.md): Limit secret write access
- [API reference](api-reference.md): Authenticate REST requests
