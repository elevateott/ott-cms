export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", process.env.PORT || 10000),
  url: env("PUBLIC_URL", "http://localhost:1337"),
  app: {
    keys: env.array("APP_KEYS"),
  },
  settings: {
    cors: {
      enabled: true,
      origin: [
        "https://ott-frontend-az32.onrender.com",
        "http://localhost:3000",
      ], // Allow all origins, or specify frontend domains
    },
  },
  allowedHosts: ["ott-cms.onrender.com", "localhost"],
});
