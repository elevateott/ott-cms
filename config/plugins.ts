export default ({ env }) => ({
  "custom-strapi-plugin-mux": {
    enabled: true,
    resolve: './src/plugins/custom-strapi-plugin-mux', // Explicitly provide the path
    config: {
      accessTokenId: env("MUX_TOKEN_ID"),
      secretKey: env("MUX_TOKEN_SECRET"),
      webhookSigningSecret: env("MUX_WEBHOOK_SECRET"),
      playbackSigningId: env("MUX_SIGNING_KEY_ID"),
      playbackSigningSecret: env("MUX_SIGNING_KEY_PRIVATE_KEY"),
    },
  },
});
