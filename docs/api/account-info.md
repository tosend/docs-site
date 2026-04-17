# Account Info

Retrieve information about your ToSend account and verified domains. Useful for verifying an API key, checking credit balance before sending, and confirming domain verification status.

## Endpoint

```
GET /v2/info
```

## Authentication

Send your API key via the `Authorization` header:

```
Authorization: Bearer your_api_key
```

## Example Request

```bash
curl -X GET https://api.tosend.com/v2/info \
  -H "Authorization: Bearer your_api_key"
```

## Success Response

```json
{
  "account": {
    "id": 142,
    "status": "active",
    "plan_type": "pro",
    "credit_balance": 48750,
    "monthly_email_limit": 100000,
    "limit_per_second": 14,
    "ses_region": "us-east-1",
    "bounce_rate": 0.012,
    "complaint_rate": 0.0003,
    "ses_status": "healthy"
  },
  "domains": [
    {
      "id": 88,
      "domain_name": "acme.com",
      "verification_status": "verified",
      "is_default": 1,
      "total_sent": 24189,
      "total_delivered": 23902,
      "total_bounced": 212,
      "total_complained": 7
    },
    {
      "id": 112,
      "domain_name": "mail.acme.com",
      "verification_status": "pending",
      "is_default": 0,
      "total_sent": 0,
      "total_delivered": 0,
      "total_bounced": 0,
      "total_complained": 0
    }
  ]
}
```

## Response Fields

### Account Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Internal tenant identifier |
| `status` | string | Account status — `active`, `suspended`, `pending` |
| `plan_type` | string | Current subscription plan (`free`, `pro`, etc.) |
| `credit_balance` | number \| null | Remaining prepaid send credits. `null` if the plan is not credit-based |
| `monthly_email_limit` | number | Maximum emails the account may send per calendar month |
| `limit_per_second` | number | Per-second send rate limit enforced by SES |
| `ses_region` | string | AWS region used for sending (e.g. `us-east-1`) |
| `bounce_rate` | number | Rolling bounce rate as a fraction (e.g. `0.012` = 1.2%) |
| `complaint_rate` | number | Rolling complaint rate as a fraction |
| `ses_status` | string | SES reputation state — `healthy`, `under_review`, `paused` |

### Domain Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Internal domain identifier |
| `domain_name` | string | The domain name |
| `verification_status` | string | `verified`, `pending`, or `failed` |
| `is_default` | number | `1` if this is the account's default sending domain, otherwise `0` |
| `total_sent` | number | Lifetime sends attributed to this domain |
| `total_delivered` | number | Lifetime delivered count |
| `total_bounced` | number | Lifetime bounce count |
| `total_complained` | number | Lifetime complaint count |

## Notes

- If your API key is restricted to a specific domain, the `domains` array still returns all verified domains on the account — only sending is restricted.
- `bounce_rate` and `complaint_rate` are expressed as fractions between 0 and 1, not percentages.
- A `credit_balance` of `null` means the account is on a plan that does not consume credits (e.g. an enterprise contract).
- Check `credit_balance` and `ses_status` before high-volume campaigns to avoid `403 insufficient_balance` or `paused` rejections.
