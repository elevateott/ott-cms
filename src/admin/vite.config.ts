import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "10000", 10),
      strictPort: true,
      allowedHosts: ["ott-cms.onrender.com"], // Add your Strapi backend URL
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
