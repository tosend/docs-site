# Batch Emails

Send multiple emails in a single API request. Each email in the batch is processed independently.

## Endpoint

```
POST /v2/emails/batch
```

## Request Body

**Authentication:** Send your API key via the `Authorization: Bearer <api_key>` header, or pass an `api_key` field in the wrapped request body (see below).

The batch endpoint accepts two body shapes:

**1. Wrapped object** (recommended):

```json
{
  "api_key": "tsend_...",   // optional if using Authorization header
  "emails": [ /* email objects */ ]
}
```

**2. Bare array**:

```json
[ /* email objects */ ]
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `emails` | array | Yes (in wrapped form) | Array of 1–100 email objects |
| `api_key` | string | No | API key, as an alternative to the `Authorization` header |

Each email object follows the same schema as the [Send Email](/api/send-email) endpoint, including `tags`, `message_hash`, `reply_to`, `headers`, and `attachments`.

## Example Request

```bash
curl -X POST https://api.tosend.com/v2/emails/batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_api_key" \
  -d '{
    "emails": [
      {
        "from": {
          "name": "Acme Inc",
          "email": "hello@acme.com"
        },
        "to": [
          { "email": "user1@example.com" },
          { "name": "Jane", "email": "jane@example.com" }
        ],
        "subject": "Welcome User 1!",
        "html": "<h1>Welcome!</h1>"
      },
      {
        "from": {
          "name": "Acme Inc",
          "email": "hello@acme.com"
        },
        "to": [
          { "email": "user2@example.com" }
        ],
        "subject": "Welcome User 2!",
        "html": "<h1>Welcome!</h1>"
      }
    ]
  }'
```

## Success Response

```json
{
  "results": [
    {
      "status": "success",
      "message_id": "a1b2c3d4e5f6789..."
    },
    {
      "status": "success",
      "message_id": "b2c3d4e5f6789a1..."
    }
  ]
}
```

The HTTP status is `200` when every email is accepted.

## Partial Success Response

When some emails fail validation, the response status is **`207 Multi-Status`**. The `results` array is returned in the same order as the input, and successful emails are still processed:

```json
{
  "results": [
    {
      "status": "success",
      "message_id": "a1b2c3d4e5f6789..."
    },
    {
      "status": "error",
      "status_code": 422,
      "error_type": "validation_error",
      "message": "The from email domain is not found.",
      "errors": {
        "from": {
          "domain_not_found": "The from email domain is not found in your account."
        }
      }
    },
    {
      "status": "spam",
      "message": "All recipient email addresses are marked as spam / disposable.",
      "errors": {
        "to": {
          "spam": "All recipient email addresses are marked as spam / disposable."
        }
      }
    }
  ]
}
```

## Result Statuses

| Status | Description |
|--------|-------------|
| `success` | Email was accepted and queued for delivery |
| `error` | Validation failed (check `errors` for details) |
| `spam` | All recipients were filtered as spam/disposable |

## Error Responses

### Empty Emails Array (422)

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "Emails data is required and must be an array",
  "errors": {
    "emails": {
      "required": "Emails data is required and must be an array."
    }
  }
}
```

### Batch Size Exceeded (422)

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "Maximum 100 emails allowed per batch request.",
  "errors": {
    "emails": {
      "max_limit": "Maximum 100 emails allowed per batch request."
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

## Notes

- Maximum 100 emails per batch request
- Credit balance is checked against the **sum of all valid recipients** before any email is queued; if there isn't enough credit for the whole batch, the request fails with `403`
- Each email in the batch is validated independently
- Failed emails do not affect the processing of other emails in the batch
- Results are returned in the same index order as the input array
- HTTP status is `200` when all emails succeed, `207` when at least one email returned `error` or `spam`
- The total recipient count across all emails counts toward your usage
