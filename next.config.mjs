/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "/utils/image-loader.ts",
  },
};

export default nextConfig;
