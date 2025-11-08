---
order: 2
hide_menu: false
---
# Brainpod Concepts

Now that you understand the cloud-native foundation, let's explore how Brainpod organizes and manages your applications.

## Pods

A pod is your own isolated micro-cluster within Brainpod, your personal workspace where you can deploy applications, manage data, and control your infrastructure.

Almost everything belongs to a pod. Resources, container images, and settings are all contained within your pod. This isolation means you can safely experiment and deploy without conflicts. Multiple team members can work within the same pod.

Pods give you clear boundaries and ownership. Development stays separate from production. Different projects get their own space. You control what happens inside your pod while we handle the infrastructure.

## Resources

We use a resource model to represent your infrastructure. Each resource is a high-level abstraction—a single resource might map to dozens of underlying components like deployments, services, load balancers, and configurations.

You work at a much higher level than traditional cloud providers. Instead of configuring individual pieces, you simply define an app and a route. The platform handles the complexity.

Currently, we support two resource types:

- **Apps**; Your containerized applications
- **Routes**; HTTP/HTTPS routing to your apps

Learn more in the [Resources documentation](resources.md).

## Revisions

Most deployment tools lack proper version control for infrastructure changes. There's no clear history of what changed or when. We solve this with revisions.

### Git-Like Interface

Revisions give you a git-like interface built directly into the platform. Every change to your resources creates a new revision. You can see exactly what changed, compare versions, and track the evolution of your infrastructure.

You get a complete audit trail. Who made the change? When? What was modified? It's all in the revision history.

### How Revisions Work

When you create or modify a resource, we create a new revision in the `draft` state. In draft, you can safely make changes without affecting production.

Once you're ready, click "Deploy." The revision moves to `waiting` while the platform picks it up. When deployment starts, it moves to `pending`. Finally, it reaches either `ready` (success) or `failed`.

Previous revisions remain in history, ready to be restored if needed. You can compare any two revisions to see exactly what changed.

### Roll Back with Confidence

Made a change that caused problems? Rolling back is simple. Restore a previous revision, and we return your infrastructure to that exact state. No guessing about what settings to change, just return to a known-good configuration.

This makes experimentation safer. Try new configurations, test approaches, and know you can always get back to what worked.

## Putting It Together

You create a pod for your project. Within that pod, you define resources, an app and a route. When you create or update resources, we create revisions that capture the changes. After deploying, we translate your high-level definitions into the necessary cloud infrastructure.

Your team sees the complete history, can roll back if needed, and collaborates on infrastructure like you do with code.

## Next Steps

Ready to work with specific resource types and start building?

- [Resources](resources.md) – Learn about Apps and Routes in detail
- [Getting Started](getting-started.md) – Deploy your first application
- [Working with the Dashboard](dashboard.md) – Navigate the interface
- [Cloud-Native Concepts](cloud-native-concepts.md) – Review the foundation
