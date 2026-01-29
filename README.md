# ToSend Documentation

Official documentation for [ToSend](https://tosend.com) - a modern transactional email sending service.

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://dash.cloudflare.com/)
[![Built with VitePress](https://img.shields.io/badge/Built%20with-VitePress-646cff)](https://vitepress.dev/)

**Live Documentation**: [docs.tosend.com](https://docs.tosend.com)

## Overview

This repository contains the complete documentation for ToSend, including:

- **User Guides** - Domain setup, API keys, webhooks, suppressions, and billing
- **API Reference** - Complete REST API documentation with examples
- **SDKs** - Official SDKs for Node.js, Python, Go, Laravel, and PHP
- **WordPress Integration** - Guide for using ToSend with WordPress

## Tech Stack

- **[VitePress](https://vitepress.dev/)** - Vue-powered static site generator
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Deployment platform
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm 8.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/tosend/docs-site.git
cd docs-site

# Install dependencies
pnpm install
```

### Local Development

Start the development server with hot module replacement:

```bash
pnpm dev
```

The documentation site will be available at `http://localhost:5173`

### Build

Generate the static site:

```bash
pnpm build
```

The built files will be in `.vitepress/dist`

### Preview

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```
user-docs/
├── .vitepress/
│   ├── config.mjs         # VitePress configuration
│   └── dist/              # Build output (ignored)
├── docs/
│   ├── index.md           # Homepage
│   ├── guide/             # User guides
│   ├── api/               # API reference
│   └── sdks/              # SDK documentation
├── package.json
├── wrangler.toml          # Cloudflare Pages config
└── README.md
```

## Deployment

This site is automatically deployed to Cloudflare Pages.

### CLI Deployment

```bash
# One-time setup: Authenticate with Cloudflare
pnpm wrangler login

# Deploy to production
pnpm deploy:prod

# Deploy to preview
pnpm deploy
```

### Continuous Deployment

The site is configured for automatic deployment via Cloudflare Pages:

1. Push changes to the `main` branch
2. Cloudflare Pages automatically builds and deploys
3. Preview deployments are created for pull requests

**Build Configuration:**
- Build command: `pnpm build`
- Build output directory: `.vitepress/dist`
- Node version: 18

## Contributing

We welcome contributions to improve the documentation!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b improve-api-docs`)
3. Make your changes
4. Test locally with `pnpm dev`
5. Commit your changes (`git commit -m 'Improve API documentation'`)
6. Push to your branch (`git push origin improve-api-docs`)
7. Open a Pull Request

### Writing Guidelines

- Use clear, concise language
- Include code examples where applicable
- Follow the existing markdown formatting
- Test all code snippets before submitting
- Add screenshots for UI-related guides

### Adding New Pages

1. Create a new `.md` file in the appropriate directory (`docs/guide/`, `docs/api/`, or `docs/sdks/`)
2. Add the page to the sidebar in `.vitepress/config.mjs`
3. Test the navigation locally

## Documentation Sections

### User Guide
Complete guides for using ToSend:
- Domain verification and DNS setup
- DMARC configuration
- API key management
- Webhook integration
- Email logs and analytics
- Suppression list management
- Billing and usage metrics
- WordPress integration

### API Reference
RESTful API documentation:
- Authentication
- Send single emails
- Send batch emails
- Retrieve account information
- Error handling

### SDKs
Official SDKs and integration guides:
- Node.js
- Python
- Go
- Laravel
- PHP

## Links

- **Main Site**: [tosend.com](https://tosend.com)
- **Documentation**: [docs.tosend.com](https://docs.tosend.com)
- **GitHub**: [github.com/tosend](https://github.com/tosend)
- **Support**: support@tosend.com

## License

MIT License - Copyright © ToSend

---

Built with ❤️ by the ToSend team
