# Account Info

Retrieve information about your ToSend account and verified domains.

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
    "title": "Acme Inc",
    "plan_type": "pro",
    "status": "active",
    "emails_usage_this_month": 15420,
    "emails_sent_last_24hrs": 892
  },
  "domains": [
    {
      "domain_name": "acme.com",
      "verification_status": "verified",
      "created_at": "2024-01-15 10:30:00"
    },
    {
      "domain_name": "mail.acme.com",
      "verification_status": "pending",
      "created_at": "2024-02-01 14:20:00"
    }
  ]
}
```

## Response Fields

### Account Object

| Field | Description |
|-------|-------------|
| `title` | Your account/organization name |
| `plan_type` | Current subscription plan (free, pro, etc.) |
| `status` | Account status (active, suspended, etc.) |
| `emails_usage_this_month` | Total emails sent in the current calendar month |
| `emails_sent_last_24hrs` | Emails sent in the last 24 hours |

### Domain Object

| Field | Description |
|-------|-------------|
| `domain_name` | The domain name |
| `verification_status` | Domain verification status (verified, pending, failed) |
| `created_at` | When the domain was added (UTC) |

## Notes

- If your API key is restricted to a specific domain, only that domain's statistics will be shown
- Usage counts include all recipient types (to, cc, bcc)
- Monthly usage resets on the 1st of each month (UTC)
