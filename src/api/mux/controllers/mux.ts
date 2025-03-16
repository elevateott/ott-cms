"use strict";

module.exports = {
  async handleMuxWebhook(ctx) {
    try {
      const { type, data } = ctx.request.body;

      // Validate that we have the correct data structure
      if (!type || !data) {
        return ctx.badRequest("Missing required fields: type or data");
      }

      console.log("📩 Received Mux Webhook:", type, data);

      switch (type) {
        case "video.asset.created":
          await strapi.db.query("api::video.video").update({
            where: { muxAssetId: data.id },
            data: { status: "preparing", duration: data.duration || 0 },
          });
          break;

        case "video.asset.ready":
          await strapi.db.query("api::video.video").update({
            where: { muxAssetId: data.id },
            data: { muxPlaybackId: data.playback_ids[0].id, status: "ready" },
          });
          break;

        case "video.asset.errored":
          await strapi.db.query("api::video.video").update({
            where: { muxAssetId: data.id },
            data: {
              status: "failed",
              errorMessage: JSON.stringify(data.errors || {}),
            },
          });
          break;

        case "video.asset.deleted":
          await strapi.db.query("api::video.video").delete({
            where: { muxAssetId: data.id },
          });
          break;

        case "video.live_stream.connected":
          await strapi.db.query("api::live-stream.live-stream").update({
            where: { muxLiveStreamId: data.id },
            data: { status: "live" },
          });
          break;

        case "video.live_stream.disconnected":
          await strapi.db.query("api::live-stream.live-stream").update({
            where: { muxLiveStreamId: data.id },
            data: { status: "disconnected" },
          });
          break;

        case "video.live_stream.idle":
          await strapi.db.query("api::live-stream.live-stream").update({
            where: { muxLiveStreamId: data.id },
            data: { status: "idle" },
          });
          break;

        case "video.live_stream.completed":
          await strapi.db.query("api::live-stream.live-stream").update({
            where: { muxLiveStreamId: data.id },
            data: { status: "completed" },
          });
          break;

        case "video.asset.track.ready":
          console.log(`✅ Track ready for asset: ${data.id}`);
          break;

        case "video.asset.track.errored":
          console.log(`❌ Error in track for asset: ${data.id}`, data.errors);
          break;

        default:
          console.log(`ℹ️ Unhandled event: ${type}`);
      }

      return ctx.send({ received: true });
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      return ctx.badRequest("Webhook processing failed");
    }
  },
};
