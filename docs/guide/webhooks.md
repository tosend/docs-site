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

## Webhook Payload

When an event occurs, ToSend sends a `POST` request to your endpoint with a JSON payload.

### Bounce Event

```json
{
  "type": "bounce",
  "email": "recipient@example.com",
  "bounce_sub_type": "General",
  "reason": "smtp; 550 5.1.1 The email account does not exist",
  "is_hard_bounce": true,
  "message_id": "msg_abc123..."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Always `"bounce"` |
| `email` | string | The recipient email that bounced |
| `bounce_sub_type` | string | Bounce sub-type (e.g. `General`, `NoEmail`, `Suppressed`, `OnAccountSuppressionList`) |
| `reason` | string | Diagnostic message explaining the bounce reason |
| `is_hard_bounce` | boolean | Present and `true` for permanent/hard bounces. Absent for soft bounces |
| `message_id` | string | The original email message ID |

### Complaint Event

```json
{
  "type": "complaint",
  "email": "recipient@example.com",
  "message_id": "msg_abc123..."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Always `"complaint"` |
| `email` | string | The recipient who complained |
| `message_id` | string | The original email message ID |

### Include Message Content

Enable **Include Message** when creating your webhook to receive the full email content in the payload. This is useful for debugging but increases payload size.

When enabled, a `mail` object is added to the payload:

```json
{
  "type": "bounce",
  "email": "recipient@example.com",
  "bounce_sub_type": "General",
  "reason": "smtp; 550 5.1.1 The email account does not exist",
  "is_hard_bounce": true,
  "message_id": "msg_abc123...",
  "mail": {
    "id": "msg_abc123...",
    "subject": "Welcome to our platform",
    "html": "<html>...</html>",
    "text": "Plain text version...",
    "headers": { "X-Custom-Header": "value" },
    "from_name": "Your App",
    "from_email": "noreply@yourdomain.com",
    "reply_to_details": "support@yourdomain.com",
    "to_details": [{ "email": "recipient@example.com", "name": "John" }],
    "other_recipients": [],
    "error_message": "smtp; 550 5.1.1 The email account does not exist",
    "status": "bounced",
    "created_at": "2025-01-15 10:30:00"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `mail.id` | string | The message ID |
| `mail.subject` | string | Email subject line |
| `mail.html` | string | HTML body of the email |
| `mail.text` | string | Plain text body of the email |
| `mail.headers` | object | Custom headers attached to the email |
| `mail.from_name` | string | Sender display name |
| `mail.from_email` | string | Sender email address |
| `mail.reply_to_details` | string | Reply-to address |
| `mail.to_details` | array | Recipient details |
| `mail.other_recipients` | array | CC/BCC recipients |
| `mail.error_message` | string | Error message if delivery failed |
| `mail.status` | string | Final email status (`bounced`, `complaint`, `suppressed`) |
| `mail.created_at` | string | When the email was originally sent (UTC) |

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

If your endpoint returns an error or times out, ToSend will retry the webhook delivery.

## Best Practices

- **Use HTTPS**: Webhook endpoints must use HTTPS
- **Respond quickly**: Return 200 immediately, then process asynchronously
- **Handle duplicates**: The same event may be delivered multiple times
- **Validate payloads**: Verify the webhook came from ToSend
