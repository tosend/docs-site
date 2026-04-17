# Webhooks

Webhooks notify your application in real-time when email events occur, such as bounces or spam complaints.

## Creating a Webhook

1. Go to **Webhooks** in your dashboard
2. Click **Create Webhook**
3. Enter your endpoint URL (must be HTTPS)
4. Select the events you want to receive
5. Optionally, restrict to a specific domain
6. Click **Create**

## Events

| Event | Description |
|-------|-------------|
| `bounced` | Email could not be delivered (hard or soft bounce) |
| `complaint` | Recipient marked the email as spam |

## Request Headers

Every webhook `POST` includes:

| Header | Description |
|--------|-------------|
| `Content-Type` | `application/json` |
| `User-Agent` | `ToSend-Webhook/2.0` |
| `X-ToSend-Event` | Event type — `bounced` or `complaint` |
| `X-ToSend-Timestamp` | ISO-8601 UTC timestamp of dispatch |
| `X-ToSend-Signature` | `sha256=<hex>` HMAC signature (only when the webhook has a secret configured) |

## Webhook Payload

When an event occurs, ToSend sends a `POST` request with this top-level shape:

```json
{
  "type": "bounced",
  "data": { /* event-specific fields */ },
  "created_at": "2026-04-18T10:30:00.000Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Event type — `bounced` or `complaint` |
| `data` | object | Event-specific payload (see below) |
| `created_at` | string | ISO-8601 UTC timestamp when the webhook was dispatched |
| `mail` | object | Present only when **Include Message** is enabled — see below |

### Bounce Event

```json
{
  "type": "bounced",
  "data": {
    "email": "recipient@example.com",
    "bounce_type": "Permanent",
    "bounce_sub_type": "General",
    "is_hard_bounce": true,
    "reason": "smtp; 550 5.1.1 The email account does not exist",
    "timestamp": "2026-04-18T10:29:58.000Z",
    "message_id": "msg_abc123..."
  },
  "created_at": "2026-04-18T10:30:00.000Z"
}
```

| `data` Field | Type | Description |
|--------------|------|-------------|
| `email` | string | The recipient address that bounced |
| `bounce_type` | string | `Permanent`, `Transient`, or `Undetermined` |
| `bounce_sub_type` | string | E.g. `General`, `NoEmail`, `Suppressed`, `OnAccountSuppressionList` |
| `is_hard_bounce` | boolean | `true` for permanent bounces, `false` for soft |
| `reason` | string | SMTP diagnostic message |
| `timestamp` | string | When SES reported the bounce |
| `message_id` | string | The `message_id` returned when you sent the email |

### Complaint Event

```json
{
  "type": "complaint",
  "data": {
    "email": "recipient@example.com",
    "feedback_type": "abuse",
    "reason": "abuse",
    "timestamp": "2026-04-18T10:29:58.000Z",
    "message_id": "msg_abc123..."
  },
  "created_at": "2026-04-18T10:30:00.000Z"
}
```

| `data` Field | Type | Description |
|--------------|------|-------------|
| `email` | string | The recipient who complained |
| `feedback_type` | string | ARF feedback type (`abuse`, `fraud`, `other`, etc.) |
| `reason` | string | Same as `feedback_type` |
| `timestamp` | string | When SES reported the complaint |
| `message_id` | string | The `message_id` returned when you sent the email |

### Include Message Content

Enable **Include Message** when creating your webhook to receive the full email metadata alongside the event. Useful for debugging; increases payload size.

When enabled, a `mail` object is added at the top level:

```json
{
  "type": "bounced",
  "data": { "...": "..." },
  "created_at": "2026-04-18T10:30:00.000Z",
  "mail": {
    "id": "msg_abc123...",
    "subject": "Welcome to our platform",
    "from_name": "Your App",
    "from_email": "noreply@yourdomain.com",
    "reply_to": "support@yourdomain.com",
    "to_details": [{ "email": "recipient@example.com", "name": "John" }],
    "other_recipients": { "cc": [], "bcc": [] },
    "custom_headers": { "X-Campaign": "welcome-v2" },
    "status": "bounced",
    "error_message": "smtp; 550 5.1.1 The email account does not exist",
    "created_at": "2026-04-18 10:28:14"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `mail.id` | string | The `message_id` (same as `data.message_id`) |
| `mail.subject` | string | Email subject line |
| `mail.from_name` | string \| null | Sender display name |
| `mail.from_email` | string | Sender email address |
| `mail.reply_to` | string \| null | Reply-to address |
| `mail.to_details` | array | `to` recipients `[{email, name}]` |
| `mail.other_recipients` | object | `{ cc: [...], bcc: [...] }` |
| `mail.custom_headers` | object \| null | Custom headers supplied at send time |
| `mail.status` | string | Final log status — `sent`, `bounced`, `complained`, `suppressed`, `failed` |
| `mail.error_message` | string \| null | Error message if delivery failed |
| `mail.created_at` | string | When the email was sent (UTC, `YYYY-MM-DD HH:MM:SS`) |

::: info
`mail` does **not** include `html` or `text` bodies. Request bodies are stored in object storage and are not replayed in webhooks.
:::

## Verifying Signatures

When a webhook has a secret configured, every request is signed with HMAC-SHA256 over the raw request body using your secret. The hex digest is sent in the `X-ToSend-Signature` header as `sha256=<hex>`.

Compute the same HMAC on your side and compare in constant time:

```javascript
// Node.js / Express — receive the raw body (not the parsed JSON)
import crypto from 'node:crypto';
import express from 'express';

const app = express();

app.post(
  '/webhooks/tosend',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const signature = req.header('X-ToSend-Signature') || '';
    const expected =
      'sha256=' +
      crypto
        .createHmac('sha256', process.env.TOSEND_WEBHOOK_SECRET)
        .update(req.body) // Buffer of the raw bytes
        .digest('hex');

    const ok =
      signature.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

    if (!ok) return res.status(401).send('Invalid signature');

    const event = JSON.parse(req.body.toString('utf8'));
    res.status(200).send('OK');
    processWebhook(event);
  },
);
```

```python
# Python / Flask
import hmac, hashlib, os
from flask import Flask, request, abort

app = Flask(__name__)

@app.post("/webhooks/tosend")
def tosend_webhook():
    secret = os.environ["TOSEND_WEBHOOK_SECRET"].encode()
    expected = "sha256=" + hmac.new(secret, request.data, hashlib.sha256).hexdigest()
    sig = request.headers.get("X-ToSend-Signature", "")
    if not hmac.compare_digest(sig, expected):
        abort(401)
    # request.get_json() is safe to call after signature verification
    return "OK", 200
```

::: warning Use the raw body
Signatures are computed over the exact bytes sent. If your framework parses and re-serializes JSON before you verify, the signature will not match. Always verify against the raw request body.
:::

## Domain Scoping

- **All Domains**: Receive events for all domains in your account
- **Specific Domain**: Only receive events for the selected domain

## Managing Webhooks

### Update a Webhook

Click on a webhook to edit:
- Endpoint URL
- Event subscriptions
- Domain scope
- Status (Active/Disabled)
- Include message option

### Delete a Webhook

1. Find the webhook in your list
2. Click the delete icon
3. Confirm deletion

## Responding to Webhooks

Your endpoint should:

1. Return a `200` status code to acknowledge receipt
2. Process the webhook asynchronously if needed
3. Respond within 10 seconds

```javascript
// Example Express.js handler
app.post('/webhooks/tosend', (req, res) => {
  const event = req.body;

  // Acknowledge immediately
  res.status(200).send('OK');

  // Process asynchronously
  processWebhook(event);
});
```

## Retry Policy

If your endpoint returns a non-2xx status or times out (after 10 seconds), ToSend retries the delivery. Each attempt is recorded in the webhook log visible in the dashboard.

## Best Practices

- **Use HTTPS**: Webhook endpoints must use HTTPS
- **Respond quickly**: Return 200 within 10 seconds, then process asynchronously
- **Handle duplicates**: The same event may be delivered more than once — dedupe on `data.message_id` + `type`
- **Verify the signature**: Always check `X-ToSend-Signature` against the raw request body when a secret is configured
