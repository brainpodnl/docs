---
order: 7
hide_menu: false
metas:
  description: "Search Brainpod application logs, HTTP access logs, platform events, and CronJob replica output from a pod-scoped history."
  keywords: ["Brainpod events", "application logs", "HTTP access logs", "CronJob logs", "SSE", "event filters"]
---
# Events and logs

The **Events** page combines application output, HTTP access logs, managed-resource observations, and pod-level platform events. History is pod-scoped, so you can begin with the whole pod and narrow the result only when needed.

Brainpod retains events for 30 days by their source timestamp. The current event store does not backfill older SigNoz history.

## Search events in the console

Open **Events** from the pod navigation. Use **Add filter** to narrow the history by the fields available in the current result set, including:

- Resource and resource kind;
- App or CronJob replica;
- severity;
- HTTP status;
- text search;
- explicit revision links.

All active filters must match. A Resource filter excludes pod-level observations that Brainpod could not attribute reliably to one resource. Filters are included in the URL, so the resulting view can be shared with another pod member.

Select a row to inspect its structured fields. HTTP access rows show the request time, method, status, and path. App log rows retain the redacted body and supported structured fields.

## Open logs for one CronJob run

A CronJob run records its observed replica identities. From the CronJob's **Runs** tab, select **Logs** for the execution or for an individual replacement replica.

The link opens Events with an exact replica filter and a 29-day lookback. Deleted Job replicas remain searchable while their records are retained.

## Query events with the REST API

List resource events with an API key that grants `events:read`:

```sh
curl --fail-with-body \
  --header "Authorization: Bearer $BRAINPOD_API_TOKEN" \
  "https://api.brainpod.io/v1/pods/my-pod/events?resource=urn%3Abrain%3Aapp%3Adefault%3Aworker&kind=app&range=1h"
```

The `resource` parameter is required by the public REST endpoint. Supported ranges are `5m`, `15m`, `30m`, `1h`, `24h`, and `7d`. Optional filters include `kind`, `search`, and application log `level`.

History responses include an opaque next cursor in the `x-next-cursor` header and RFC 8288 `Link` header. Keep the resource, kind, range, search, and level unchanged while following that cursor.

## Stream events

`GET /v1/pods/{pod}/events/watch` returns server-sent events. The stream can include event, error, and end messages. Reconnect with the last SSE event ID or cursor and the same filters.

A stream remains open for 1 to 20 seconds per request. Delivery is bounded and best effort rather than exactly once. When the stream reports a gap or an incompatible or expired cursor, start a new history request and continue from a fresh cursor.

## Security and sensitive output

Events require current pod access in the console or the `events:read` API-key action. Pod access is rechecked during live streams.

Brainpod normalizes and redacts known sensitive fields before backend storage, but detection cannot guarantee that arbitrary application output contains no secrets. Configure applications and libraries not to write passwords, tokens, personal data, or full request bodies to stdout or stderr.

## Next steps

- [CronJobs](resources/cronjobs.md): Run scheduled workloads and open replica logs
- [Apps](resources/apps.md): Configure application workloads
- [API keys](api-keys.md): Grant event-read access
- [API reference](api-reference.md): Authenticate REST requests
