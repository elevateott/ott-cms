"use strict";

module.exports = {
  async handleMuxWebhook(ctx) {
    try {
      const { type, data } = ctx.request.body;

      console.log("📩 Received Mux Webhook:", type);

      // Route based on event type
      if (type.startsWith("video.")) {
        // Forward the request to the Mux plugin's webhook endpoint
        try {
          // Access the plugin's controller directly and call its webhook handler
          await strapi
            .plugin("mux-video-uploader")
            .controller("mux")
            .muxWebhookHandler(ctx, () => Promise.resolve());

          // The plugin's handler already sent a response, so we don't need to
          return;
        } catch (err) {
          console.error("Error forwarding to plugin webhook handler:", err);
          // Fall back to our direct implementation if the plugin handler fails
          //return await handleVideoWebhook(type, data, ctx);
        }
      } else if (type.startsWith("live.")) {
        // Handle live stream webhooks manually
        return await handleLiveStreamWebhook(type, data, ctx);
      } else {
        console.warn("⚠️ Unhandled Mux Webhook Type:", type);
        return ctx.badRequest("Unhandled webhook type");
      }
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      return ctx.badRequest("Webhook processing failed");
    }
  },
};

// Fallback handler for video-related webhooks
// async function handleVideoWebhook(type, data, ctx) {
//   try {
//     if (type === "video.asset.ready") {
//       // Find the video with this Mux asset ID
//       const entries = await strapi.db.query("api::video.video").findMany({
//         where: { muxAssetId: data.id },
//       });

//       if (entries && entries.length > 0) {
//         // Update the video record with playback ID
//         await strapi.db.query("api::video.video").update({
//           where: { id: entries[0].id },
//           data: {
//             muxPlaybackId: data.playback_ids[0].id,
//             status: "ready",
//           },
//         });
//       }
//     } else if (type === "video.asset.failed") {
//       // Find the video with this Mux asset ID
//       const entries = await strapi.db.query("api::video.video").findMany({
//         where: { muxAssetId: data.id },
//       });

//       if (entries && entries.length > 0) {
//         // Update the video record with failed status
//         await strapi.db.query("api::video.video").update({
//           where: { id: entries[0].id },
//           data: { status: "failed" },
//         });
//       }
//     }

//     return ctx.send({ received: true });
//   } catch (err) {
//     console.error("Error processing video webhook:", err);
//     return ctx.badRequest("Video webhook processing failed");
//   }
// }

async function handleLiveStreamWebhook(type, data, ctx) {
  try {
    if (type === "live.stream.created") {
      // Store new live stream details in Strapi
      await strapi.db.query("api::live-stream.live-stream").create({
        data: {
          muxStreamId: data.id,
          status: "created",
          playbackId: data.playback_ids[0]?.id || null,
          streamKey: data.stream_key || null,
        },
      });
      return ctx.send({ message: "Live Stream Created" });
    }

    if (type === "live.stream.active") {
      // Update status when the live stream goes live
      await strapi.db.query("api::live-stream.live-stream").update({
        where: { muxStreamId: data.id },
        data: { status: "live" },
      });
      return ctx.send({ message: "Live Stream is now Active" });
    }

    if (type === "live.stream.idle") {
      // Update when stream goes idle
      await strapi.db.query("api::live-stream.live-stream").update({
        where: { muxStreamId: data.id },
        data: { status: "idle" },
      });
      return ctx.send({ message: "Live Stream is now Idle" });
    }

    if (type === "live.stream.completed") {
      // Update when live stream ends
      await strapi.db.query("api::live-stream.live-stream").update({
        where: { muxStreamId: data.id },
        data: { status: "completed" },
      });
      return ctx.send({ message: "Live Stream Completed" });
    }

    return ctx.badRequest("Unhandled live stream event");
  } catch (error) {
    console.error("❌ Live Stream Webhook Error:", error);
    return ctx.badRequest("Live Stream Webhook Processing Failed");
  }
}
