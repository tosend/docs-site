# Domains

To send emails with ToSend, you need to verify ownership of your domain by adding DNS records.

## Adding a Domain

1. Go to **Domains** in your dashboard
2. Click **Add Domain**
3. Enter your domain name (e.g., `yourdomain.com`)


## DNS Records

After adding a domain, you'll need to configure three DNS records with your DNS provider.

### DKIM Record

DKIM (DomainKeys Identified Mail) verifies that emails are authorized by the domain owner.

| Type | Name | Value |
|------|------|-------|
| TXT | `tosend._domainkey.yourdomain.com` | Provided in dashboard |

The DKIM value is a long string containing your public key. Copy the entire value from your dashboard.

### SPF Record

SPF (Sender Policy Framework) authorizes ToSend to send emails on behalf of your domain.

| Type | Name | Value |
|------|------|-------|
| TXT | `send.yourdomain.com` | `v=spf1 include:amazonses.com ~all` |

### MX Record

The MX record enables bounce and complaint handling.

| Type | Name | Priority | Value |
|------|------|----------|-------|
| MX | `send.yourdomain.com` | 10 | `feedback-smtp.us-east-1.amazonses.com` |

### DMARC Record (Recommended)

DMARC protects your domain from email spoofing and improves deliverability. Add this after DKIM and SPF are verified.

| Type | Name | Value |
|------|------|-------|
| TXT | `_dmarc.yourdomain.com` | `v=DMARC1; p=none;` |

::: tip Learn More
See our complete [DMARC Guide](/guide/dmarc) for detailed setup instructions, policy explanations, and how to use Cloudflare's DMARC Management feature.
:::

## Verification Status

After adding DNS records, your domain will go through these statuses:

| Status | Description |
|--------|-------------|
| **Pending** | DNS records are being verified. This can take up to 72 hours. |
| **Verified** | Domain is ready to send emails. |
| **Failed** | DNS records were not detected within 72 hours. Check your configuration. |

::: warning DNS Propagation
DNS changes can take up to 48 hours to propagate. If verification fails, double-check your records and try again.
:::

## Sending DNS Instructions

You can email the DNS configuration instructions to your domain administrator:

1. Go to **Domains** → select your domain
2. Click **Send DNS Instructions**
3. Enter the recipient email address

This is limited to 3 emails per domain per day.

## Deleting a Domain

To remove a domain:

1. Go to **Domains** → select your domain
2. Click **Delete Domain**
3. Confirm the deletion

::: danger Warning
Deleting a domain will immediately stop all email sending from that domain. API requests using this domain will fail.
:::

## Domain Statistics

Each domain shows sending statistics for the last 30 days:

- Total emails sent
- Verification status
- Date added
