# Introduction

ToSend is an email sending API that makes it easy to send transactional emails at scale. Built on AWS SES infrastructure, ToSend provides reliable email delivery with comprehensive tracking.

## Base URL

```
https://api.tosend.com
```

## Authentication

All API requests require authentication using an API key. Include your API key in the `Authorization` header:

```
Authorization: Bearer your_api_key_here
```

::: tip
You can also send the API key in the request body as `api_key`. Header authentication is recommended.
```json
{
  "api_key": "your_api_key_here"
}
```
:::

You can generate API keys from your [ToSend dashboard](https://dash.tosend.com/app/api-keys). API keys can be restricted to specific domains for added security.

## Response Format

All responses are returned in JSON format.

### Success Response

```json
{
  "message_id": "abc123def456..."
}
```

### Error Response

```json
{
  "status_code": 422,
  "error_type": "validation_error",
  "message": "Subject and either html or text content are required.",
  "errors": {
    "subject": {
      "required": "Subject is required."
    }
  }
}
```

#### Error Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status_code` | integer | HTTP status code |
| `error_type` | string | Machine-readable error category |
| `message` | string | Human-readable error message |
| `errors` | object | Field-specific validation errors (optional) |

#### Error Types

| Error Type | Description |
|------------|-------------|
| `bad_request` | Malformed request (400) |
| `unauthorized` | Missing API key (401) |
| `forbidden` | Invalid API key or insufficient permissions (403) |
| `not_found` | Endpoint or resource not found (404) |
| `validation_error` | Request validation failed (422) |
| `rate_limit_exceeded` | Too many requests (429) |
| `internal_error` | Server error (500) |

## Rate Limits

Rate limits depend on your plan type. Check your account dashboard for current limits.

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | API key missing |
| 403 | Invalid API key, insufficient credits, or domain not allowed |
| 422 | Validation error |
| 500 | Server error |
