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

When an event occurs, ToSend sends a POST request to your endpoint with a JSON payload:

### Bounce Event

```json
{
  "event": "bounced",
  "email": "recipient@example.com",
  "domain": "yourdomain.com",
  "bounce_type": "Permanent",
  "bounce_subtype": "General",
  "timestamp": "2024-01-15T10:30:00Z",
  "message_id": "abc123..."
}
```

### Complaint Event

```json
{
  "event": "complaint",
  "email": "recipient@example.com",
  "domain": "yourdomain.com",
  "timestamp": "2024-01-15T10:30:00Z",
  "message_id": "abc123..."
}
```

## Include Message Content

Enable **Include Message** to receive the full email content in webhook payloads. This is useful for debugging but increases payload size.

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
3. Respond within 30 seconds

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
