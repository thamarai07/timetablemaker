/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tabletimeing.netlify.app/',
    generateRobotsTxt: true, // Optional: generates a robots.txt file
    sitemapSize: 7000, // Optional: splits sitemap if it exceeds 7000 URLs
    generateIndexSitemap: true, // Optional: generates an index sitemap
  };
  