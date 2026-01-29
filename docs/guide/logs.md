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

Filter logs by delivery status:

| Status | Description |
|--------|-------------|
| **Sent** | Email was successfully delivered |
| **Bounced** | Email could not be delivered |
| **Complaint** | Recipient marked as spam |
| **Spam** | Blocked due to disposable/invalid address |

### By Domain

Select a specific domain to view only emails sent from that domain.

### By Search

Search logs by:
- Subject line
- Message ID
- Sender email
- Recipient email

## Status Indicators

- **Sent/Delivered**: Email was accepted by the recipient's mail server
- **Bounced**: Delivery failed (see error message for details)
- **Complaint**: Recipient reported the email as spam
- **Spam**: Email was blocked because recipient uses a disposable email address

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
