const API_BASE_URL = process.env.MINIO_ENDPOINT;

const nextConfig = {
  images: {
    domains: [API_BASE_URL],
    remotePatterns: [
      {
        protocol: "http",
        hostname: API_BASE_URL,
        port: "9000",
        pathname: "/wishio/**",
      },
    ],
  },
};

module.exports = nextConfig;
