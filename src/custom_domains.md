---
order: 4
hide_menu: false
metas:
  description: "Add custom domains to your Brainpod routes. Configure DNS, get automatic TLS certificates, and serve your apps from any domain you own."
  keywords: ["Brainpod custom domains", "DNS configuration", "TLS certificate", "HTTPS", "CNAME", "custom hostname"]
---
# Custom domains

Every route on Brainpod comes with a unique hostname under `*.prod.brainpod.io`. While these work great for testing and internal services, you'll likely want to use your own domain for production applications.

Custom domains let you serve your apps from any domain you own. When you add a custom domain to a route, we provision a TLS certificate and configure routing for that domain. Point your DNS to Brainpod, and we handle the rest automatic TLS certificates, traffic routing, and renewals.

## Adding a Custom Domain

To add a custom domain to your route:

1. Create or edit your route in the dashboard
2. Add your domain (e.g., `api.example.com` or `www.example.com`) to the route configuration
3. Deploy the route changes
4. Navigate to the Domains page in your dashboard
5. Find your domain and copy the DNS target (CNAME value) provided
6. Go to your DNS provider's control panel
7. Add the appropriate DNS records pointing to the target (see DNS Configuration below)
8. Return to the Domains page to monitor verification status

The Domains page shows all your custom domains with their verification states and DNS records. Once your DNS records are updated and propagating, we automatically provision a TLS certificate. This typically takes a few minutes but can take longer depending on DNS propagation times.

## DNS Configuration

To configure DNS for your custom domain, create a CNAME record pointing to the DNS target provided in the Domains page. This is typically something like your-route.prod.brainpod.io.

```
www.example.com.  CNAME  your-route.prod.brainpod.io.
```

CNAME records automatically follow any infrastructure changes on our side, so you won't need to update them if our routing changes.

## Multiple Custom Domains

A single route can have multiple custom domains. This is useful when you want several domains pointing to the same application-for example, `www.example.com` and `app.example.com`, or multiple brand domains.

To add multiple domains, simply add each domain when creating or editing your route configuration. After deploying, configure DNS records for each domain separately in your DNS provider.

Each domain gets its own TLS certificate and verification status on the Domains page. All domains on a route use the same routing rules and point to the same apps.

## Next Steps
- [Resources](resources.md): Learn about apps and routes
- [Getting Started](getting-started.md): Deploy your first application
