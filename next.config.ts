import { withSentryConfig } from "@sentry/nextjs";
import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const basePath = process.env.IS_DEMO === "1" ? "/demo" : "";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Document-Policy",
            value: "js-profiling",
          },
        ],
      },
    ];
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: "/demo-assets",
        redirects: async () => [
          {
            source: "/",
            destination: basePath,
            permanent: false,
            basePath: false,
          },
        ],
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  cacheComponents: true,
  devIndicators: false,
  poweredByHeader: false,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: false,
    },
    incomingRequests: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    prefetchInlining: true,
    cachedNavigations: true,
    appNewScrollHandler: true,
    inlineCss: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default withSentryConfig(withBotId(nextConfig), {
  org: "sentry-developer-experience",
  project: "chatbot",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/sentry-tunnel",
  silent: !process.env.CI,
});
