/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://ihsanmuh.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/component*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};
