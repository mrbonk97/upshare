import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    /**
     * These packages need to be added as external, else Oracle DB will try to load them due to a
     * Webpack bug.
     *
     * See these two issues for more information:
     * - https://github.com/oracle/node-oracledb/issues/1688
     * - https://github.com/oracle/node-oracledb/issues/1691
     **/
    config.externals.push(
      ...[
        "@azure/app-configuration",
        "@azure/identity",
        "@azure/keyvault-secrets",
        "oci-common",
        "oci-objectstorage",
        "oci-secrets",
      ]
    );

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
