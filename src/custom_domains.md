---
order: 4
hide_menu: false
metas:
  description: "Connect custom domains to Brainpod Routes with an external CNAME or Brainpod-hosted DNS, including root domains and automatic TLS."
  keywords: ["Brainpod custom domains", "Brainpod DNS", "DNS configuration", "TLS certificate", "HTTPS", "CNAME", "apex domain"]
---
# Custom domains

Every Brainpod Route receives a unique hostname under `*.route.brainpod.io`. Add a custom domain when you want to serve the same Route through a domain you own.

Brainpod provisions and renews TLS certificates for both generated hostnames and custom domains. The Domains page shows each domain's DNS, certificate, and deployed-Route state.

## Add a domain

1. Open **Domains** in the pod.
2. Select **Add domain**.
3. Enter the domain and select the Route that should serve it.
4. Choose **External DNS** or **Brainpod DNS**.
5. Review the connection details and add the change to the draft.
6. Complete the DNS instructions shown on the Domains page.
7. Deploy the draft.

DNS and certificate preparation can finish before the Route is deployed. Traffic starts after the DNS and TLS states are ready and a deployed Route contains the domain.

## Connect with external DNS

External DNS keeps the zone at your current provider. Add the CNAME target shown on the Domains page:

```text
www.example.com.  CNAME  generated-host.route.brainpod.io.
```

Use only the hostname as the target, without `https://` or a path. Remove conflicting A, AAAA, CNAME, forwarding, or redirect records at that exact name. Keep unrelated records, especially mail and verification records.

Some providers proxy CNAME traffic by default. Disable that proxy while Brainpod verifies DNS and provisions HTTPS.

A standard CNAME cannot be placed at a zone apex such as `example.com`. Use a provider that supports CNAME flattening or an equivalent external-target ALIAS feature, use a subdomain such as `www`, or choose Brainpod DNS.

## Connect with Brainpod DNS

Brainpod DNS hosts the complete zone and can connect both root domains and subdomains. The add-domain flow scans common existing records, lets you review them, and shows the pod-specific nameservers to configure.

Because Brainpod becomes authoritative for the zone, include every record that must keep working after the delegation changes. Disable DNSSEC and let the DS record expire before switching nameservers.

See [DNS zones](resources/dns-zones.md) for the complete migration, record-management, DNSSEC, and removal workflow.

## Multiple domains

A Route can contain multiple custom domains. Add and connect each domain from the Domains page. All domains use the same Route rules, including any per-rule Brainpod login requirement.

Each domain receives its own status and TLS certificate. A domain may use external DNS while another domain on the same Route uses Brainpod DNS.

## Troubleshooting

- **Waiting for DNS**: confirm the exact CNAME target or both Brainpod nameservers at the authoritative provider.
- **DNSSEC warning**: remove the parent DS record and wait for its TTL before switching to Brainpod DNS.
- **Missing mail or service records**: add the records to the DnsZone and deploy before changing nameservers.
- **HTTPS ready, traffic waiting**: deploy the draft that contains the domain and Route.
- **External DNS at the root fails**: use provider flattening, a supported ALIAS record, a subdomain, or Brainpod DNS.

## Next steps

- [DNS zones](resources/dns-zones.md): Host and manage authoritative DNS
- [Routes](resources/routes.md): Configure routing rules and access
- [Brainpod resources](resources.md): Review revisions and deployment
