module.exports = {
  routes: [
    {
      method: "POST",
      path: "/mux/webhook",
      handler: "mux.handleMuxWebhook",
      config: {
        auth: false,
      },
    },
  ],
};
