---
layout: home

hero:
  name: "toSend"
  text: "Email delivery, honestly priced."
  tagline: "Send transactional, marketing, and product emails. $0.30 per 1,000. Every feature included. No tiers. Built on AWS SES with 99.4% deliverability."
  actions:
    - theme: brand
      text: Get Started Free →
      link: /guide/domains
    - theme: alt
      text: API Reference
      link: /api/introduction
    - theme: alt
      text: WordPress Setup
      link: /guide/wordpress

features:
  - icon: 🚀
    title: 99.4% Deliverability
    details: Built on AWS SES infrastructure with automatic SPF, DKIM, and DMARC configuration. Your emails land in the inbox.
    link: /guide/domains
    linkText: Set up a domain
  - icon: 📧
    title: SMTP & REST API
    details: Send via SMTP relay or REST API — whatever fits your stack. Support for HTML, plain text, and attachments.
    link: /api/send-email
    linkText: View API docs
  - icon: 📦
    title: Batch Sending
    details: Send hundreds of emails in a single API request with independent per-recipient error handling.
    link: /api/batch-emails
    linkText: Learn more
  - icon: 📊
    title: Full Visibility
    details: Detailed email logs with delivery status, real-time analytics, and daily/monthly aggregated metrics.
    link: /guide/metrics
    linkText: View metrics docs
  - icon: 🪝
    title: Event Webhooks
    details: Real-time notifications for delivery, bounces, complaints, and opens. Track every email event as it happens.
    link: /guide/webhooks
    linkText: Configure webhooks
  - icon: 🛠️
    title: Official SDKs
    details: Native SDKs for Node.js, Python, Go, Laravel, and PHP. Plus one-click WordPress integration via FluentSMTP.
    link: /sdks/
    linkText: Browse SDKs
---

<div class="home-content">

## Send your first email in seconds

::: code-group

```php [WordPress]
// Install the free FluentSMTP plugin, connect it to toSend,
// and every wp_mail() call is routed through your verified domain.

wp_mail(
    'user@example.com',
    'Hello from toSend',
    '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
    ['Content-Type: text/html']
);
```

```bash [cURL]
curl -X POST https://api.tosend.com/v2/emails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tsend_your_api_key" \
  -d '{
    "from": {
      "name": "Your App",
      "email": "hello@yourdomain.com"
    },
    "to": [{ "email": "user@example.com" }],
    "subject": "Hello from toSend",
    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>"
  }'
```

```typescript [Node.js]
import { ToSend } from 'tosend';

const tosend = new ToSend('tsend_your_api_key');

const response = await tosend.send({
  from: { email: 'hello@yourdomain.com', name: 'Your App' },
  to: [{ email: 'user@example.com' }],
  subject: 'Hello from toSend',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
});

console.log(response.message_id);
```

```python [Python]
from tosend import ToSend

client = ToSend("tsend_your_api_key")

response = client.send(
    from_address={"email": "hello@yourdomain.com", "name": "Your App"},
    to=[{"email": "user@example.com"}],
    subject="Hello from toSend",
    html="<h1>Welcome!</h1><p>Thanks for signing up.</p>",
)

print(response.message_id)
```

```php [PHP]
use ToSend\Api;

$tosend = new Api('tsend_your_api_key');

$response = $tosend->send([
    'from' => ['email' => 'hello@yourdomain.com', 'name' => 'Your App'],
    'to' => [['email' => 'user@example.com']],
    'subject' => 'Hello from toSend',
    'html' => '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
]);

echo $response['message_id'];
```

:::

<div class="home-cta">
  <a href="/sdks/" class="cta-link">See all SDKs →</a>
</div>

</div>

<div class="home-content home-steps">

## Sending in 3 steps

<div class="steps-grid">
  <div class="step">
    <span class="step-number">1</span>
    <h3>Create your free account</h3>
    <p>Sign up with 200 free emails. No credit card required.</p>
  </div>
  <div class="step">
    <span class="step-number">2</span>
    <h3>Add your domain</h3>
    <p>Add your sending domain and configure DNS records. toSend verifies DKIM, SPF, and DMARC automatically.</p>
  </div>
  <div class="step">
    <span class="step-number">3</span>
    <h3>Start sending</h3>
    <p>Connect via FluentSMTP, SMTP relay, or REST API. Set up webhooks to track delivery in real time.</p>
  </div>
</div>

</div>

<div class="home-content home-wp">

## If you run WordPress, you're home.

<div class="wp-grid">
  <div class="wp-card">
    <h3>FluentSMTP</h3>
    <p>Connect your WordPress site in 2 minutes with the free FluentSMTP plugin. 300,000+ installs. Every <code>wp_mail()</code> call goes through toSend automatically.</p>
    <a href="/guide/wordpress">WordPress setup guide →</a>
  </div>
  <div class="wp-card">
    <h3>Works with everything</h3>
    <p>WooCommerce, FluentCRM, Gravity Forms, WPForms, LearnDash — any plugin that sends email through <code>wp_mail()</code> works out of the box.</p>
    <a href="/sdks/">View all integrations →</a>
  </div>
</div>

</div>
