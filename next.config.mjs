/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // "https://admin.karismahotels.com/sites/default/files/styles/full_width_carousel_desktop/public/2024-12/weddings_architecture_margaritaville_riviera_maya_24.jpg?itok=-D45VX9E",
        hostname: "admin.karismahotels.com",
        port: "",
        pathname: "/sites/**",
      },
    ],
  },
};

export default nextConfig;
