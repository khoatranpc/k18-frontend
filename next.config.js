/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  devIndicators: {
    buildActivity: false
  },
  ignoreDuringBuilds: true
}

module.exports = nextConfig
