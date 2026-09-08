---
id: index
title: "Brainpod documentation"
nav_title: "Overview"
hide_menu: false
metas:
  title: "Brainpod documentation"
  description: "Deploy, configure, and operate containerized applications on Brainpod with practical guides and resource references."
  keywords: ["Brainpod", "Brainpod documentation", "application platform", "container deployment", "European cloud"]
---
<section class="docs-hero">
  <p class="docs-eyebrow">Brainpod documentation</p>
  <h1>Build and operate applications with confidence</h1>
  <p class="docs-lead">Practical guidance for deploying containerized workloads, configuring managed resources, and operating applications on Brainpod.</p>
  <div class="docs-actions">
    <a href="/cli/">Start with the CLI</a>
    <a href="/getting-started/">Deploy your first application</a>
  </div>
</section>

<section class="cli-quickstart">
  <div>
    <span class="docs-card-kicker">CLI quickstart</span>
    <h2>From login to deployment</h2>
    <p>Authenticate, select a pod, validate your resources, and deploy the mutable head.</p>
    <a href="/cli/">Read the CLI guide →</a>
  </div>
  <pre><code class="language-sh">brainpod login
brainpod config set pod &lt;pod-name&gt;
brainpod resource create --file resources.json --dry-run
brainpod resource create --file resources.json
brainpod deploy --wait</code></pre>
</section>

## Start with the right guide

<div class="docs-grid">
  <a class="docs-card" href="/getting-started/">
    <span class="docs-card-kicker">Quickstart</span>
    <strong>Deploy an application</strong>
    <span>Create an app and route, then promote your first revision.</span>
  </a>
  <a class="docs-card" href="/resources/">
    <span class="docs-card-kicker">Reference</span>
    <strong>Configure resources</strong>
    <span>Review apps, routes, disks, configuration, and managed data services.</span>
  </a>
  <a class="docs-card" href="/registry/">
    <span class="docs-card-kicker">Delivery</span>
    <strong>Publish container images</strong>
    <span>Authenticate with the Brainpod registry and push images into a pod.</span>
  </a>
  <a class="docs-card" href="/builds/">
    <span class="docs-card-kicker">Automation</span>
    <strong>Set up continuous delivery</strong>
    <span>Connect a repository and use GitHub Actions to build application images.</span>
  </a>
</div>

## How Brainpod works

Brainpod represents application infrastructure as resources within an isolated **pod**. Changes are prepared in a draft revision and do not affect the running environment until you deploy them.

1. Define the apps, routes, storage, and data services your workload requires.
2. Review the complete draft revision before it affects production.
3. Deploy the revision and monitor resource status and application events.
4. Create a new draft for the next change or restore an earlier revision when required.

[Learn about pods, resources, and revisions →](brainpod.md)

## Common tasks

- [Install and use the Brainpod CLI](cli.md)
- [Automate deployments with the REST API](api-reference.md)
- [Connect a local database client](database-tunnels.md)
- [Complete account onboarding](onboarding.md)
- [Connect a custom domain](custom_domains.md)
- [Create a policy-based API key](api-keys.md)
- [Deploy a blueprint](blueprints.md)
