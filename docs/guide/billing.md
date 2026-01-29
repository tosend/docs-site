# Billing & Credits

ToSend uses a simple pay-as-you-go pricing model. Purchase credits and use them to send emails.

## Pricing

| Credits | Price | Cost per Email |
|---------|-------|----------------|
| 10,000 emails | $3 | $0.0003 |

- **No monthly fees**: Only pay for what you use
- **Credits never expire**: Use them whenever you need
- **Multiple domains**: Send from any verified domain

## Credit Balance

View your current credit balance on the dashboard or in **Settings** → **Billing**.

Each email sent (including CC and BCC recipients) uses one credit.

## Purchasing Credits

1. Go to **Settings** → **Billing**
2. Enter the amount you want to pay (minimum $3)
3. Credits are calculated automatically
4. Complete payment with your card

### Payment Methods

ToSend accepts all major credit and debit cards through Stripe:
- Visa
- Mastercard
- American Express
- And more

### Saved Payment Methods

Save a card for faster future purchases:

1. Go to **Settings** → **Billing**
2. Add a new payment method
3. Optionally set as default

You can manage saved cards anytime:
- Add new cards
- Remove old cards
- Change default card

## Transaction History

View all past purchases in the **Credit History** section:

- Transaction ID
- Amount paid
- Credits received
- Date
- Payment method
- Receipt link

## Credit Usage

Credits are deducted when emails are queued for sending:

- **To recipients**: 1 credit each
- **CC recipients**: 1 credit each
- **BCC recipients**: 1 credit each

Example: An email to 2 recipients with 1 CC uses 3 credits.

## Low Balance

When your credit balance is low:

1. You'll see a warning on the dashboard
2. Emails may be blocked if credits run out
3. Purchase more credits to continue sending

::: tip Buffer Credits
Keep a buffer of credits to avoid interruption. Emails queued when credits run out will fail.
:::

## Insufficient Credits

If you attempt to send without enough credits:

- The API returns a `403` error
- Error message: "Insufficient credit balance to send emails"
- Purchase more credits to resume sending

## Receipts

Click on any transaction to view or download your receipt for accounting purposes.
