---
id: index
hide_menu: false
---
# Welcome to Brainpod

## Introduction

Brainpod is a European cloud-native application platform that makes deploying and managing containerized applications straightforward. Built on Kubernetes but without the complexity.

## Key Capabilities

**Built-in Container Registry**: Push your images to our integrated OCI registry without additional configuration. It works seamlessly with your deployments from day one.

**HTTP Routing & Load Balancing**: Expose your applications through intelligent routes that handle traffic distribution and filtering automatically.

**Real-time Observability**: Application logs are captured and displayed in real-time—just write to stdout.

**Dutch Infrastructure**: Your applications run on Dutch servers, ensuring full compliance with European data sovereignty requirements.

## How Brainpod Works

### Pods

A pod is your isolated workspace within Brainpod where you deploy applications and manage infrastructure. Resources, container images, and settings are contained within your pod, allowing safe experimentation without conflicts. Multiple team members can collaborate within the same pod.

### Resources

We use a resource model to represent your infrastructure. Each resource is a high-level abstraction. Instead of configuring individual components, you simply define what you need and the platform handles the complexity.

Currently, we support two resource types:

- **[Apps](resources/apps.md)** — Your containerized applications
- **[Routes](resources/routes.md)** — HTTP/HTTPS routing to your apps

Learn more in the [Resources documentation](resources.md).

### Revisions

Every change to your resources creates a new revision, giving you complete version control for infrastructure changes. You can see exactly what changed, compare versions, and track the evolution of your infrastructure.

When you create or modify a resource, we create a new revision in the `draft` state where you can safely make changes. Once ready, click "Deploy" and the revision moves through `waiting`, `pending`, and finally `ready` or `failed`.

Previous revisions remain in history for easy rollback. Made a change that caused problems? Simply restore a previous revision to return to a known-good configuration.

### Putting It Together

Create a pod for your project, define resources (apps and routes), and deploy. We translate your high-level definitions into the necessary cloud infrastructure. Your team sees the complete history and can roll back when needed.

## Next Steps

- [Getting Started](getting-started.md) — Deploy your first application
- [Resources](resources.md) — Learn about Apps and Routes in detail