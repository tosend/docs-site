# Deploying to Cloudflare Pages

This documentation site is deployed to Cloudflare Pages at `docs.tosend.com`.

## Prerequisites

1. Install dependencies:
```bash
pnpm install
```

2. Authenticate with Cloudflare (one-time setup):
```bash
pnpm wrangler login
```

## Deployment

### Option 1: Deploy via CLI

Deploy to production:
```bash
pnpm deploy:prod
```

Deploy to preview:
```bash
pnpm deploy
```

### Option 2: Set up via Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/bc1a1c44574db2c6033e81bbc745abd0/pages)
2. Click "Create a project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: `pnpm build`
   - **Build output directory**: `.vitepress/dist`
   - **Node version**: 18 or higher

## Custom Domain Setup

After deployment, configure the custom domain:

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to "Custom domains"
3. Click "Set up a custom domain"
4. Enter `docs.tosend.com`
5. Cloudflare will automatically configure the DNS records

## Environment

- Account ID: `bc1a1c44574db2c6033e81bbc745abd0`
- Project name: `tosend-docs`
- Domain: `docs.tosend.com`
