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

Per-second send rate is enforced by SES and varies per account. The [`GET /v2/info`](/api/account-info) endpoint returns the current `limit_per_second` value.

## Per-Request Limits

| Limit | Value |
|-------|-------|
| Recipients per email (`to`, `cc`, `bcc`) | 50 each |
| Subject length | 998 characters |
| Total attachment size per email | 10 MB |
| Emails per batch request | 100 |

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success — all emails accepted |
| 207 | Multi-Status — partial success on batch (some entries failed validation or were all-disposable) |
| 401 | API key missing |
| 403 | Invalid API key, insufficient credits, all recipients disposable, or domain not allowed |
| 422 | Validation error |
| 500 | Server error |

## Response Headers

Successful send/batch responses include diagnostic headers you can log for support tickets:

| Header | Description |
|--------|-------------|
| `X-Tenant-Id` | Numeric ID of the account that sent the request |
| `X-Recipient-Count` | Total recipients accepted for dispatch (after disposable filtering) |
| `X-Step-Auth`, `X-Step-Validate` | Server-side timings in milliseconds |
