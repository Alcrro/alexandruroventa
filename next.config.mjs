/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST_URL: process.env.HOST_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
};

export default nextConfig;
