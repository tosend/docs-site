# PHP SDK

Official PHP SDK for the ToSend email API.

- **Package**: `tosend/tosend-php`
- **Requirements**: PHP 7.4+, cURL extension
- **Repository**: [tosend/tosend-php](https://github.com/tosend/tosend-php)

## Installation

### With Composer

```bash
composer require tosend/tosend-php
```

### Without Composer

This SDK is a single file with no external dependencies. You can use it without Composer:

1. Download [`src/Api.php`](https://github.com/tosend/tosend-php/blob/main/src/Api.php) from the repository
2. Place it anywhere in your project
3. Include it in your code:

```php
require_once 'path/to/Api.php';

$tosend = new ToSend\Api('tsend_your_api_key');
```

::: tip
The SDK only requires PHP 7.4+ with the `curl` and `json` extensions, which are included in most PHP installations.
:::

## Quick Start

```php
use ToSend\Api;

$tosend = new Api('tsend_your_api_key');

$response = $tosend->send([
    'from' => [
        'email' => 'hello@yourdomain.com',
        'name' => 'Your App'
    ],
    'to' => [
        ['email' => 'user@example.com']
    ],
    'subject' => 'Hello from ToSend!',
    'html' => '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
]);

echo $response['message_id'];
```

## Configuration

### Simple

```php
$tosend = new ToSend\Api('tsend_your_api_key');
```

### Custom Base URL

```php
$tosend = new ToSend\Api('tsend_your_api_key');
$tosend->setBaseUrl('https://custom-api.example.com');
```

## Send Email

### Basic Email

```php
$response = $tosend->send([
    'from' => [
        'email' => 'hello@yourdomain.com',
        'name' => 'Your App'  // optional
    ],
    'to' => [
        ['email' => 'user@example.com'],
        ['email' => 'another@example.com', 'name' => 'John Doe']
    ],
    'subject' => 'Welcome!',
    'html' => '<h1>Hello</h1>',
    'text' => 'Hello'  // optional, auto-generated from HTML if not provided
]);
```

### With CC, BCC, and Reply-To

```php
$response = $tosend->send([
    'from' => ['email' => 'hello@yourdomain.com'],
    'to' => [['email' => 'user@example.com']],
    'cc' => [['email' => 'cc@example.com']],
    'bcc' => [['email' => 'bcc@example.com']],
    'reply_to' => ['email' => 'support@yourdomain.com', 'name' => 'Support'],
    'subject' => 'Hello',
    'html' => '<p>Hello World</p>'
]);
```

### With Attachments

```php
$response = $tosend->send([
    'from' => ['email' => 'hello@yourdomain.com'],
    'to' => [['email' => 'user@example.com']],
    'subject' => 'Your Invoice',
    'html' => '<p>Please find your invoice attached.</p>',
    'attachments' => [
        [
            'type' => 'application/pdf',
            'name' => 'invoice.pdf',
            'content' => base64_encode(file_get_contents('invoice.pdf'))
        ]
    ]
]);
```

## Batch Sending

Send multiple emails in a single request:

```php
$response = $tosend->batch([
    [
        'from' => ['email' => 'hello@yourdomain.com'],
        'to' => [['email' => 'user1@example.com']],
        'subject' => 'Hello User 1',
        'html' => '<p>Hello!</p>'
    ],
    [
        'from' => ['email' => 'hello@yourdomain.com'],
        'to' => [['email' => 'user2@example.com']],
        'subject' => 'Hello User 2',
        'html' => '<p>Hello!</p>'
    ]
]);

foreach ($response['results'] as $result) {
    if ($result['status'] === 'success') {
        echo "Sent: " . $result['message_id'] . "\n";
    } else {
        echo "Failed: " . $result['message'] . "\n";
    }
}
```

## Account Info

```php
$info = $tosend->getAccountInfo();

echo "Account: " . $info['account']['title'] . "\n";
echo "Emails this month: " . $info['account']['emails_usage_this_month'] . "\n";

foreach ($info['domains'] as $domain) {
    echo $domain['domain_name'] . ": " . $domain['verification_status'] . "\n";
}
```

## Error Handling

```php
use ToSend\Api;
use ToSend\ToSendException;

try {
    $response = $tosend->send([
        'from' => ['email' => 'hello@yourdomain.com'],
        'to' => [['email' => 'user@example.com']],
        'subject' => 'Hello',
        'html' => '<p>Hello</p>'
    ]);
} catch (ToSendException $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Code: " . $e->getCode() . "\n";

    // Get detailed validation errors
    foreach ($e->getErrors() as $field => $errors) {
        foreach ($errors as $key => $message) {
            echo "$field: $message\n";
        }
    }
}
```

## API Reference

### `new Api(string $apiKey)`

Create a new Api instance with your API key.

### `send(array $params): array`

Send a single email. Returns `['message_id' => '...']` on success.

**Parameters:**
- `from` (required) - Sender address `['email' => '...', 'name' => '...']`
- `to` (required) - Array of recipient addresses
- `subject` (required) - Email subject
- `html` (required) - HTML content
- `text` (optional) - Plain text content
- `cc` (optional) - Array of CC addresses
- `bcc` (optional) - Array of BCC addresses
- `reply_to` (optional) - Reply-to address
- `attachments` (optional) - Array of attachments

### `batch(array $emails): array`

Send multiple emails. Returns `['results' => [...]]` with status for each email.

### `getAccountInfo(): array`

Get account and domain information.

### `setBaseUrl(string $url): self`

Set a custom API base URL (useful for testing).
