/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Configure the domains from which images will be served
    domains: ['wildalmonds.com'],
    // Configure the patterns for remote images
    // This should include the hostname wildalmonds.com
    // remotePatterns: ['https://wildalmonds.com/api/uploads/*'],
  },
}

module.exports = nextConfig
