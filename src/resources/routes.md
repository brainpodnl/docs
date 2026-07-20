---
order: 2
metas:
  description: "Brainpod Routes expose your apps to the internet with automatic TLS, load balancing, path-based routing, and custom domain support."
  keywords: ["Brainpod routes", "HTTP routing", "load balancer", "TLS", "custom domain", "reverse proxy", "HTTPS"]
---
# Routes

A route makes your app accessible on the internet. Without a route, your app runs but has no external connectivity. With a route, you get a hostname, traffic routing, and automatic TLS.

## How Routes Work

Routes sit in front of your apps, handling incoming HTTP/HTTPS traffic. They terminate TLS, apply routing rules, and forward requests to the appropriate app. Think of a route as your load balancer and reverse proxy combined.

Every route needs at least one routing rule. The most common pattern is routing all traffic (`/` prefix) to a single app. You can also split traffic by path-send `/api` to your API app, `/admin` to your admin app, and everything else to your frontend.

## Hostnames and Domains

When you create a route, you get a unique hostname under `*.route.brainpod.io`. This is immediately available (no DNS configuration, no waiting). The hostname is yours as long as the route exists.

Want to use your own domain? Add a custom domain to your route. Point your DNS records to us, and we handle the rest. Custom domains work exactly like the default hostnames, with the same automatic TLS and routing capabilities.

## Automatic TLS

Every route comes with automatic TLS certificates. We provision certificates when you create the route, renew them before expiry, and handle all the complexity. This works for both `*.route.brainpod.io` hostnames and your custom domains.

Your traffic is always encrypted. No manual certificate management, no worrying about expiration. HTTPS just works.

## Multiple Routes

You can create multiple routes for different purposes. One route for your production domain, another for staging. A route for your main application, separate routes for different services. Each route can point to different apps or use different routing rules.

## Next Steps

- [Custom Domains](../custom_domains.md): Use your own domain with your route
- [Apps](apps.md): Learn about deploying containerized applications
- [Resources](../resources.md): Overview of Brainpod resources