---
order: 6
hide_menu: false
metas:
  description: "Create, reference, rotate, deploy, and roll back write-only Brainpod Secret resources without storing sensitive values in App resource JSON."
  keywords: ["Brainpod secrets", "Secret resources", "secret rotation", "runtime secrets", "environment variables"]
---
# Secret resources

A Secret resource stores the identity of a password, token, or key in a pod revision. Its value remains write-only and outside the resource document. Every revision pins the exact value version it uses, so deploying, discarding, reverting, and rolling back secrets follows the same revision workflow as other resources. The App environment workflow is available for existing Apps as well as newly created Apps.

## Store an App variable as a secret

In the console:

1. Open the App on the pod canvas.
2. Add or edit an environment variable.
3. Enter its key and, for a typed secret, its initial value.
4. Select the open-lock action **Store as secret** beside the value.
5. Choose a typed or generated value and select **Save secret**.
6. Save the App, review the Secret change in the Deploy panel, and deploy the draft.

Brainpod adds a Secret resource to the draft and replaces the App value with a reference such as:

```text
${secret.payment-token}
```

Generated values are created server-side and never reach the browser. Typed values cannot be viewed again after saving.

On the canvas, referenced Secrets appear as chips on their Apps. Unused Secret resources appear together in a **Secrets** node.

## Share and replace a value

Multiple Apps or variables can reference the same Secret. Open a secret-backed environment value to see:

- the Secret name and current draft version;
- whether that version has been deployed;
- other Apps that use the Secret.

Select **Replace value** to write a new version into the draft. Every reference to that Secret uses the new version when you deploy the draft. Running Apps continue using the version pinned by the deployed revision until that deployment succeeds.

Select **Use a plain value** to unlink one environment variable. The Secret remains in the draft for other references; remove its resource from the canvas when nothing should use it.

## Revision behavior

Secret changes are ordinary draft changes:

- deploying pins the draft's Secret versions and restarts affected workloads;
- discarding the draft drops Secret resources and value changes made only in that draft;
- reverting a Secret change restores the parent draft's pinned version;
- rolling back creates a revision with the Secret versions that historical revision used.

A Secret with no value cannot be deployed by an App that references it. Use **Set secret value** before deploying.

## Use the REST API

Create a Secret resource and its value in the pod's draft:

```sh
curl --fail-with-body \
  --request POST \
  --header "Authorization: Bearer $BRAINPOD_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"name":"payment-token","value":"replace-with-secret-input"}' \
  https://api.brainpod.io/v1/pods/my-pod/secrets
```

The key needs `resources:write` for the current draft. The request creates a draft when needed. Values must be non-empty, at most 32 KiB, and cannot contain a single quote, NUL character, or carriage return.

Use `PUT /v1/pods/{pod}/secrets/{name}` to pin a new value version in the draft. Use `DELETE /v1/pods/{pod}/secrets/{name}` to remove the Secret resource from the draft. Review and deploy the draft through the normal revision endpoint; there is no separate secret redeploy action.

Concurrent writes can return `412 DRAFT_CHANGED` when the targeted draft was deployed or replaced. Read the current head and retry against that draft.

## Remove a Secret

Remove every current-draft reference before deleting the Secret resource. A draft that still contains `${secret.<name>}` fails to render without that Secret.

Earlier revisions retain the value versions they pin. Deleting a Secret from the current draft therefore does not change an already deployed or historical revision.

## Security behavior

- List and detail APIs return metadata and version numbers, never values.
- Secret values do not appear in App resource JSON or Kubernetes Secrets.
- Workloads receive pinned values at startup through in-memory runtime delivery.
- Anyone who can change resources and Secret values can affect the next deployment; grant `resources:write` narrowly.

## Next steps

- [Apps](resources/apps.md): Store environment values as Secrets
- [Config](resources/config.md): Store non-sensitive files
- [API keys](api-keys.md): Limit Secret write access
- [API reference](api-reference.md): Authenticate REST requests
