import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "ToSend Documentation",
  description: "Email sending API documentation for ToSend",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Guide', link: '/guide/domains' },
      { text: 'SDKs', link: '/sdks/' },
      { text: 'API Reference', link: '/api/introduction' }
    ],

    sidebar: [
      {
        text: 'User Guide',
        items: [
          { text: 'Domains', link: '/guide/domains' },
          { text: 'DMARC', link: '/guide/dmarc' },
          { text: 'API Keys', link: '/guide/api-keys' },
          { text: 'Webhooks', link: '/guide/webhooks' },
          { text: 'Email Logs', link: '/guide/logs' },
          { text: 'Suppressions', link: '/guide/suppressions' },
          { text: 'Metrics', link: '/guide/metrics' },
          { text: 'Billing', link: '/guide/billing' },
          { text: 'WordPress', link: '/guide/wordpress' }
        ]
      },
      {
        text: 'SDKs',
        items: [
          { text: 'Overview', link: '/sdks/' },
          { text: 'Node.js', link: '/sdks/node' },
          { text: 'Python', link: '/sdks/python' },
          { text: 'Go', link: '/sdks/go' },
          { text: 'Laravel', link: '/sdks/laravel' },
          { text: 'PHP', link: '/sdks/php' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Introduction', link: '/api/introduction' },
          { text: 'Send Email', link: '/api/send-email' },
          { text: 'Batch Emails', link: '/api/batch-emails' },
          { text: 'Account Info', link: '/api/account-info' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tosend' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © ToSend'
    }
  }
})
