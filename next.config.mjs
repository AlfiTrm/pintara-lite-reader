import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/_offline',
  },
  runtimeCaching: [
    {
      urlPattern: /\/books\.json$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'data-cache-v1',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 60 * 60 * 24,
        },
      },
    },
  ],

  buildExcludes: [/_next\/dynamic-css-manifest\.json/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);