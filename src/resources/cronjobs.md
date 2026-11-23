---
order: 3
hide_menu: false
metas:
  description: "Run container work on a schedule with Brainpod CronJobs, reusable triggers, manual executions, timeouts, run history, and replica logs."
  keywords: ["Brainpod CronJob", "scheduled job", "cron schedule", "AppTemplate", "background task", "run history"]
---
# CronJobs

A CronJob runs a container to completion on a schedule. Each CronJob references a reusable **Trigger** that contains the image, command or shell script, environment, Config mounts, instance size, and runtime identity.

CronJobs and Triggers are normal revisioned resources. Creating or editing them changes the pod's draft; deploy that draft before the schedule or trigger changes take effect.

## Create a CronJob

1. Add a **Cron job** resource on the pod canvas.
2. Enter a unique name.
3. Select **Add trigger**.
4. Create a Trigger, reuse an existing one, or copy supported configuration from an App.
5. Choose the schedule and timezone.
6. Set an execution timeout from 1 to 30 minutes.
7. Save the CronJob, review the draft, and deploy it.

A Trigger needs a container image or an already configured GitHub source. Repository onboarding is unavailable while creating a Trigger. A shell script runs through the configured container image.

The default timezone is `Europe/Amsterdam`. CronJobs accept a five-field cron schedule and an IANA timezone. The console offers every few minutes, hourly, daily, weekdays, weekly, and monthly choices and follows daylight-saving changes in the selected timezone.

## Reuse and edit Triggers

Multiple CronJobs can reference the same Trigger. Updating a shared Trigger changes every consuming CronJob after the next pod deployment. The editor lists those consumers and lets you save a copy when only one CronJob should change.

Copying an App copies its supported container configuration into a new Trigger. The source App remains unchanged. Disk mounts are not copied; scheduled work can use Config mounts and environment references.

A Trigger starts no workload by itself.

## Run a CronJob manually

Open a deployed CronJob and select **Run now**. Manual execution uses the deployed Trigger and CronJob configuration, not draft changes.

Manual runs can overlap another manual or scheduled execution. Use application-level locking when overlapping work could corrupt data or repeat an external action.

## Inspect runs and logs

The **Runs** tab shows active executions and the latest 20 finished executions across revisions. A run reports its queued, running, succeeded, or failed state and its observed duration.

Run history is best effort rather than an audit log. Very short jobs may finish before Brainpod observes them. When replica identity is available, select **Logs** to open Events filtered to that exact execution replica. Replacement replicas receive separate log links.

## Resource documents

CronJobs use `pod.brainpod.io/v1alpha2` and reference an AppTemplate in the same pod:

```json
{
  "apiVersion": "pod.brainpod.io/v1alpha2",
  "kind": "CronJob",
  "metadata": {
    "name": "nightly-cleanup",
    "namespace": "default"
  },
  "spec": {
    "templateRef": "urn:brain:apptemplate:default:cleanup",
    "schedule": "0 2 * * *",
    "timeZone": "Europe/Amsterdam",
    "timeoutMinutes": 30
  }
}
```

The referenced AppTemplate also uses `pod.brainpod.io/v1alpha2`. Create or replace both resources in one draft when they depend on each other.

## Next steps

- [Events and logs](../events.md): Inspect execution output
- [Apps](apps.md): Configure long-running containers
- [Secret resources](../secrets.md): Reference sensitive environment values
- [Brainpod resources](../resources.md): Review revision behavior
