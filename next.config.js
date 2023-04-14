/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  basePath: '/rest-countries-api',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
