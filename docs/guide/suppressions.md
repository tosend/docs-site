# Suppressions

The suppression list contains email addresses that should not receive emails. This includes bounced addresses and spam complaints.

## Why Suppressions Matter

Sending to suppressed addresses harms your sender reputation:

- **Bounces**: Continued attempts to invalid addresses signals spam behavior
- **Complaints**: Ignoring spam reports can get your domain blacklisted

ToSend automatically manages your suppression list to protect your deliverability.

## Viewing Suppressions

Go to **Suppressions** in your dashboard to see all suppressed addresses with:

- Email address
- Suppression reason (Bounced/Complained)
- Bounce type (if applicable)
- Date suppressed

## Suppression Types

### Bounced

Email addresses that returned a permanent delivery failure:

| Bounce Type | Description |
|-------------|-------------|
| **General** | Generic permanent failure |
| **MailboxFull** | Recipient's mailbox is full |
| **ContentRejected** | Email content was rejected |
| **Suppressed** | Previously bounced address |

### Complained

Email addresses where the recipient clicked "Report Spam" or "Mark as Junk" in their email client.

### Validation Suppressed

Addresses that failed email validation checks before sending.

## Filtering Suppressions

### By Status

- **Bounced**: Show only bounced addresses
- **Complained**: Show only spam complaints

### By Bounce Type

Filter by specific bounce reason:
- General
- MailboxFull
- ContentRejected
- EmailValidationSuppressed
- OnAccountSuppressionList

### By Domain

View suppressions for a specific sending domain.

### By Search

Search for a specific email address.

## Automatic Suppression

ToSend automatically adds addresses to your suppression list when:

1. **Hard bounce**: Permanent delivery failure (invalid address, domain not found)
2. **Spam complaint**: Recipient reports email as spam
3. **Validation failure**: Address fails format validation

## Sending to Suppressed Addresses

If you attempt to send to a suppressed address:

- The email will be blocked
- It will appear in your logs with status "Spam" or error message
- No email will be sent to protect your reputation

## Best Practices

- **Monitor bounce rates**: High bounce rates (>4%) indicate list quality issues
- **Clean your lists**: Remove inactive subscribers regularly
- **Use double opt-in**: Confirm email addresses before adding to your list
- **Honor unsubscribes**: Remove unsubscribed users promptly
