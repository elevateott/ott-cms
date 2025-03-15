import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      host: "0.0.0.0",
      port: 1337,
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
