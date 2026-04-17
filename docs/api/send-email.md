# Send Email

Send a single email to one or more recipients.

## Endpoint

```
POST /v2/emails
```

## Request Body

**Authentication:** Send your API key via the `Authorization: Bearer <api_key>` header.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from` | object | Yes | Sender information |
| `to` | array | Yes | Array of recipient objects with `email` (required) and `name` (optional). Max 50 recipients. |
| `subject` | string | Yes | Email subject line |
| `html` | string | No* | HTML content of the email |
| `text` | string | No* | Plain text content of the email |
| `cc` | array | No | Array of CC recipients with `email` (required) and `name` (optional). Max 50. |
| `bcc` | array | No | Array of BCC recipients with `email` (required) and `name` (optional). Max 50. |
| `reply_to` | object \| string | No | Reply-to address — object `{ email, name }` or an RFC 5322 string like `"Support <support@acme.com>"` |
| `headers` | object | No | Custom email headers (string keys and values) |
| `attachments` | array | No | Array of attachment objects. Total decoded size must be ≤ 10 MB |
| `tags` | object | No | Key-value string pairs for analytics and filtering. Keys ≤ 128 chars, values ≤ 256 chars |
| `message_hash` | string | No | Custom message identifier (≤ 255 chars) returned as `message_id`. If omitted, ToSend generates one |

*At least one of `html` or `text` is required. If only `html` is provided, a plain text version is automatically generated.

### Limits

- **Subject**: ≤ 998 characters (RFC 5322 line length)
- **Recipients**: up to 50 each in `to`, `cc`, `bcc`
- **Attachments**: ≤ 10 MB total (sum of decoded sizes). Allowed MIME types include PDF, Office documents, text, common images, and common archives
- **Batch**: see [Batch Emails](/api/batch-emails) — up to 100 emails per request

### From Object

```json
{
  "name": "John Doe",
  "email": "john@yourdomain.com"
}
```

The `from` email domain must be verified in your ToSend account.

### To Array

The `to` field must be an array of recipient objects. Each object requires an `email` field, and `name` is optional.

```json
{
  "to": [
    {
      "email": "jane@example.com"
    },
    {
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Recipient email address |
| `name` | string | No | Recipient display name |

### CC and BCC Arrays

Same format as `to` - an array of objects with `email` (required) and `name` (optional):

```json
{
  "cc": [
    { "email": "manager@example.com" }
  ],
  "bcc": [
    { "name": "Archive", "email": "archive@example.com" }
  ]
}
```

### Reply-To

Either an object or an RFC 5322 string:

```json
{ "name": "Support Team", "email": "support@yourdomain.com" }
```

```json
"Support Team <support@yourdomain.com>"
```

A plain address string like `"support@yourdomain.com"` is also accepted. Invalid `reply_to` values are silently dropped rather than rejecting the request.

### Tags

Attach key-value metadata for reporting and webhook filtering:

```json
{
  "tags": {
    "campaign": "welcome-series",
    "template": "day-0"
  }
}
```

### Custom Message Hash

Provide your own identifier for cross-referencing in your system:

```json
{ "message_hash": "order-12345-receipt" }
```

The same value is returned as `message_id` in the response. Note: ToSend does **not** deduplicate on `message_hash` — sending twice with the same hash dispatches two emails. If you need idempotency, track sent hashes in your own application.

### Attachment Object

```json
{
  "type": "application/pdf",
  "name": "invoice.pdf",
  "content": "base64_encoded_content_here"
}
```

## Example Request

```bash
curl -X POST https://api.tosend.com/v2/emails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "from": {
      "name": "Acme Inc",
      "email": "hello@acme.com"
    },
    "to": [
      {
        "email": "jane@example.com"
      },
      {
        "name": "John Doe",
        "email": "john@example.com"
      }
    ],
    "subject": "Welcome to Acme!",
    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
    "text": "Welcome! Thanks for signing up."
  }'
```

## Example with Attachments

```bash
curl -X POST https://api.tosend.com/v2/emails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "from": {
      "name": "Billing",
      "email": "billing@acme.com"
    },
    "to": [
      {
        "email": "customer@example.com"
      }
    ],
    "subject": "Your Invoice",
    "html": "<p>Please find your invoice attached.</p>",
    "attachments": [
      {
        "type": "application/pdf",
        "name": "invoice-001.pdf",
        "content": "JVBERi0xLjQKJ..."
      }
    ]
  }'
```

## Success Response

```json
{
  "message_id": "a1b2c3d4e5f6789..."
}
```

The `message_id` can be used to track the email status.

## Error Responses

### Missing API Key (401)

```json
{
  "status_code": 401,
  "error_type": "unauthorized",
  "message": "API Key is missing",
  "errors": {
    "api_key": {
      "required": "API key is required."
    }
  }
}
```

### Invalid API Key (403)

```json
{
  "status_code": 403,
  "error_type": "forbidden",
  "message": "Invalid API Key",
  "errors": {
    "api_key": {
      "invalid": "The provided API key is invalid."
    }
  }
}
```

### Domain Not Verified (422)

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "The from email domain is not verified.",
  "errors": {
    "from": {
      "domain_not_verified": "The from email domain is not verified."
    }
  }
}
```

### Domain Not Allowed for API Key (422)

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "The from email domain is not allowed for this API key.",
  "errors": {
    "from": {
      "domain_not_allowed": "The from email domain is not allowed for this API key."
    }
  }
}
```

### Insufficient Credits (403)

```json
{
  "status_code": 403,
  "error_type": "forbidden",
  "message": "Insufficient credit balance to send emails.",
  "errors": {
    "account": {
      "insufficient_balance": "Insufficient credit balance to send emails. Please buy more credits."
    }
  }
}
```

### Missing Content (422)

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "Subject and either html or text content are required.",
  "errors": {
    "subject": {
      "required": "Subject is required."
    },
    "content": {
      "required": "Either html or text content is required."
    }
  }
}
```

### Too Many Recipients (422)

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "Maximum 50 recipient email addresses are allowed.",
  "errors": {
    "to": {
      "max_limit": "Maximum 50 recipient email addresses are allowed."
    }
  }
}
```

## Notes

- Disposable/temporary recipient addresses are filtered out before sending. Mixed batches (some valid, some disposable) still send to the valid recipients; the dropped addresses are recorded under `meta.spam_recipients` in the email log.
- If **all** recipients are disposable, the request is rejected with `403` and a single `spam` log row is created.
- The `from` email domain must be verified in your account before sending.
- Suppression checks (hard bounces, complaints) are performed just before SES dispatch, not during the API request. A `200` response does not guarantee the email will be sent — check the email log for final status.
