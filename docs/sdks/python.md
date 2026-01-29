# Python SDK

Official Python SDK for the ToSend email API.

- **Package**: [`tosend`](https://pypi.org/project/tosend/)
- **Requirements**: Python 3.8+
- **Repository**: [tosend/tosend-python](https://github.com/tosend/tosend-python)

## Installation

```bash
pip install tosend
```

## Quick Start

```python
from tosend import ToSend

client = ToSend("tsend_your_api_key")

response = client.send(
    from_address={"email": "hello@yourdomain.com", "name": "Your App"},
    to=[{"email": "user@example.com"}],
    subject="Welcome!",
    html="<h1>Hello!</h1><p>Thanks for signing up.</p>",
)

print(response.message_id)
```

## Configuration

### Simple

```python
client = ToSend("tsend_your_api_key")
```

### With Options

```python
client = ToSend(
    api_key="tsend_your_api_key",
    base_url="https://api.tosend.com",  # optional
    timeout=60,  # optional, in seconds
)
```

## Send Email

### Basic Email

```python
response = client.send(
    from_address={"email": "hello@yourdomain.com", "name": "Your App"},
    to=[
        {"email": "user@example.com"},
        {"email": "another@example.com", "name": "John Doe"},
    ],
    subject="Hello!",
    html="<h1>Welcome</h1>",
    text="Welcome",  # optional
)
```

### With CC, BCC, and Reply-To

```python
response = client.send(
    from_address={"email": "hello@yourdomain.com"},
    to=[{"email": "user@example.com"}],
    cc=[{"email": "cc@example.com"}],
    bcc=[{"email": "bcc@example.com"}],
    reply_to={"email": "support@yourdomain.com", "name": "Support"},
    subject="Hello",
    html="<p>Hello World</p>",
)
```

### With Attachments

```python
import base64

with open("invoice.pdf", "rb") as f:
    content = base64.b64encode(f.read()).decode()

response = client.send(
    from_address={"email": "hello@yourdomain.com"},
    to=[{"email": "user@example.com"}],
    subject="Your Invoice",
    html="<p>Please find your invoice attached.</p>",
    attachments=[
        {
            "type": "application/pdf",
            "name": "invoice.pdf",
            "content": content,
        }
    ],
)
```

## Batch Sending

Send multiple emails in a single request:

```python
response = client.batch([
    {
        "from": {"email": "hello@yourdomain.com"},
        "to": [{"email": "user1@example.com"}],
        "subject": "Hello User 1",
        "html": "<p>Welcome!</p>",
    },
    {
        "from": {"email": "hello@yourdomain.com"},
        "to": [{"email": "user2@example.com"}],
        "subject": "Hello User 2",
        "html": "<p>Welcome!</p>",
    },
])

for result in response.results:
    if result.status == "success":
        print(f"Sent: {result.message_id}")
    else:
        print(f"Failed: {result.message}")
```

## Account Info

```python
info = client.get_account_info()

print(info.account.title)
print(info.account.emails_usage_this_month)
print(info.account.emails_sent_last_24hrs)

for domain in info.domains:
    print(f"{domain.domain_name}: {domain.verification_status}")
```

## Error Handling

```python
from tosend import ToSend, ToSendError

client = ToSend("tsend_your_api_key")

try:
    response = client.send(
        from_address={"email": "hello@yourdomain.com"},
        to=[{"email": "user@example.com"}],
        subject="Hello",
        html="<p>Hello</p>",
    )
except ToSendError as e:
    print(f"Error: {e.message}")
    print(f"Status: {e.status_code}")
    print(f"Type: {e.error_type}")
    print(f"Details: {e.errors}")

    if e.is_validation_error:
        # Handle validation error (422)
        pass

    if e.is_authentication_error:
        # Handle auth error (401/403)
        pass

    if e.is_rate_limit_error:
        # Handle rate limit (429)
        pass
```

## Type Hints

The SDK includes full type hints. You can use the provided dataclasses:

```python
from tosend import ToSend, Address, SendEmailRequest

client = ToSend("tsend_your_api_key")

# Using Address dataclass
from_addr = Address(email="hello@yourdomain.com", name="Your App")
to_addr = Address(email="user@example.com")

response = client.send(
    from_address=from_addr,
    to=[to_addr],
    subject="Hello!",
    html="<h1>Welcome!</h1>",
)
```

## Zero Dependencies

The Python SDK uses only the standard library and has no external dependencies.
