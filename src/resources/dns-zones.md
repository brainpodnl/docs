---
order: 3
hide_menu: false
metas:
  description: "Host a DNS zone with Brainpod, delegate it with pod-specific nameservers, preserve existing records, and connect root domains to Routes."
  keywords: ["Brainpod DNS", "DNS zone", "apex domain", "nameservers", "DNS records", "DnsZone"]
---
# DNS zones

Brainpod DNS hosts a domain's authoritative DNS zone and connects Route domains without requiring a CNAME, CNAME flattening, or an ALIAS record. This makes it suitable for root domains such as `example.com`.

Hosting a zone moves responsibility for every record under that domain to Brainpod, including website, email, verification, and certificate records. Review the complete record set before changing nameservers.

Brainpod DNS is feature-gated. The option appears only when the `resource_dnszone` feature is enabled for the pod owner.

## Add a domain with Brainpod DNS

1. Open **Domains** in the pod.
2. Select **Add domain** and choose the Route that should serve it.
3. Select **Brainpod DNS** as the connection method.
4. Confirm the DNS zone whose nameservers you will change.
5. Review the common DNS records Brainpod found. Add any missing mail, verification, or application records.
6. Add the domain and DNS zone to the draft.
7. Deploy the draft.
8. At the registrar, replace the zone's nameservers with the two nameservers shown on the Domains page.

For a delegated subdomain such as `app.example.com`, add those nameservers as NS records for `app` in the parent `example.com` zone instead of changing the registrar.

Brainpod verifies the delegation against the pod's unique nameserver pair. A partial or mixed nameserver set does not verify ownership.

## Preserve existing records

The add-domain flow looks up common public records before creating the zone. DNS does not provide a reliable way to enumerate every record, so this scan may be incomplete.

Review records for:

- apex and `www` website addresses;
- MX and mail-related TXT records;
- SPF, DKIM, and DMARC;
- domain-verification records;
- service-specific subdomains.

Names that are missing when you switch nameservers stop resolving until you add them to the DnsZone and deploy. Supported record types are A, AAAA, CNAME, MX, TXT, CAA, and SRV.

Brainpod owns the address record for each Route domain covered by the zone. Do not add an A, AAAA, or CNAME record with the same name as a Route domain.

## Disable DNSSEC before delegation

Brainpod DNS zones are unsigned. If the parent zone contains a DS record, validating resolvers reject the zone after you switch nameservers.

Disable DNSSEC at the registrar, remove the DS record, and wait for its TTL to expire before changing nameservers. The Domains page reports this condition when it detects a DS record.

## Edit records

Open the DnsZone resource and select **Records** to change its records. Record edits update the pod's draft. Deploy that draft before the changes are published.

The zone domain is immutable. Create another DnsZone when you need to host a different domain.

## Remove a hosted zone

Changing or deleting the DnsZone in a draft does not immediately remove its active DNS service. Move the domain's nameservers away from Brainpod first and wait for the delegation to propagate.

A removed or detached zone keeps serving its last deployed records while the domain still delegates to a Brainpod nameserver pair. This protects the domain, including its mail records, from being taken offline by a draft change.

## Use external DNS instead

Choose **External DNS** when you want to keep the zone at its current provider. Add the CNAME shown on the Domains page. Root domains require a provider that supports CNAME flattening or an equivalent external-target ALIAS feature.

A domain inside a Brainpod DNS zone owned by another pod also uses an external CNAME. Add that record to the owning pod's DnsZone.

## Next steps

- [Custom domains](../custom_domains.md): Choose and verify a Route domain
- [Routes](routes.md): Configure routing and access
- [Brainpod resources](../resources.md): Review draft and deployment behavior
