/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_DB_URL: process.env.NEXT_PUBLIC_DB_URL || 'http://localhost:8090'
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  }
}

module.exports = nextConfig 