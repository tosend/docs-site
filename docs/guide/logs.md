# Email Logs

The Logs page shows a complete history of all emails sent through your account.

## Viewing Logs

Go to **Logs** in your dashboard to see all sent emails with:

- Subject line
- Recipient email
- Sender email
- Status
- Sent timestamp

Click on any log entry to view full details.

## Log Details

Each log entry contains:

| Field | Description |
|-------|-------------|
| Subject | Email subject line |
| From | Sender name and email |
| To | Recipient(s) with names |
| Reply-To | Reply-to address if set |
| Status | Delivery status |
| Message ID | Unique identifier for tracking |
| Sent At | Timestamp when email was sent |
| HTML Content | Full HTML body |
| Text Content | Plain text body |
| Custom Headers | Any custom headers included |
| Attachments | List of attachment names |
| Error Message | Error details if delivery failed |

## Filtering Logs

### By Status

Filter logs by delivery status. ToSend tracks each email through its full lifecycle:

| Status | Description |
|--------|-------------|
| **Pending** | Accepted by the API and queued, not yet dispatched to SES |
| **Sent** | Handed off to SES for delivery |
| **Delivered** | Remote mail server accepted the message |
| **Bounced** | Delivery failed (hard or soft bounce — see error message) |
| **Complained** | Recipient marked the email as spam |
| **Suppressed** | Blocked at the queue stage because the recipient is on your suppression list |
| **Spam** | Blocked because all recipients used disposable/temporary email addresses |
| **Failed** | SES rejected the send (e.g. invalid content, quota exceeded) |

### By Domain

Select a specific domain to view only emails sent from that domain.

### By Search

Search logs by:
- Subject line
- Message ID
- Sender email
- Recipient email

## Status Indicators

- **Pending**: In the send queue, not yet dispatched
- **Sent**: Handed to SES — delivery to the recipient server is in flight
- **Delivered**: Remote mail server accepted the message
- **Bounced**: Delivery failed (see error message for details)
- **Complained**: Recipient reported the email as spam
- **Suppressed**: The recipient is on your account's suppression list; the email was not dispatched
- **Spam**: All recipients use disposable email addresses — the email was rejected before dispatch
- **Failed**: SES returned an error at dispatch time

## Retention

Email logs are retained for your reference. Log entries include all metadata but may not include full message content for older entries.

## Troubleshooting

### Email shows as Bounced

Check the error message for details:
- **Mailbox Full**: Recipient's mailbox is full
- **User Unknown**: Email address doesn't exist
- **Domain Not Found**: Recipient domain doesn't exist
- **Rejected**: Recipient server rejected the email

### Email shows as Complaint

The recipient marked your email as spam. This address has been added to your suppression list and will not receive future emails.

### Email shows as Spam

The recipient email was identified as a disposable or temporary email address. These are automatically blocked to protect your sender reputation.
