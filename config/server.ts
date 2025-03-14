console.log("Server Config:", {
  host: process.env.HOST,
  port: process.env.PORT,
  database_host: process.env.DATABASE_HOST,
  database_name: process.env.DATABASE_NAME,
});

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
