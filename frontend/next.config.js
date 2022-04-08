/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MORAILS_SERVER_URL: process.env.MORAILS_SERVER_URL,
    MORAILS_APP_ID: process.env.MORAILS_APP_ID,
    MORAILS_MASTER_KEY: process.env.MORAILS_MASTER_KEY,
  },
}

module.exports = nextConfig
