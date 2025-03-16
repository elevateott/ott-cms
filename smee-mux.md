# **📌 Setting Up `smee.io` for Webhook Testing in Strapi**

This guide explains how to use **`smee.io`** to receive webhooks from Mux in your **local Strapi app**.

---

## **🔹 What is `smee.io`?**
`smee.io` is a webhook proxy that allows Mux to send webhooks to your local Strapi app, even though it is running on `localhost`.

---

## **🔹 Step 1: Install `smee-client`**
Run the following command to globally install the `smee-client`:

```bash
npm install --global smee-client
```
✅ **This allows you to forward webhooks from `smee.io` to your local server.**

---

## **🔹 Step 2: Start the Webhook Proxy**
Now, run the following command to start listening for webhooks from Mux:

```bash
smee -u https://smee.io/xdcfVCRWdTN9ED --target http://localhost:1337/mux-video-uploader/webhook-handler

```
✅ **Breakdown:**
- `-u https://smee.io/xdcfVCRWdTN9ED` → **Your unique webhook proxy URL**.
- `--target http://localhost:1337/mux-video-uploader/webhook-handler` → **Where the webhook is forwarded in your local Strapi app**.

🚀 **Now, webhooks sent to `smee.io/xdcfVCRWdTN9ED` will be forwarded to your Strapi app!** 🎉

---

## **🔹 Step 3: Register Webhook in Mux**
1. **Go to [Mux Dashboard](https://dashboard.mux.com/)** → **Settings** → **Webhooks**.
2. Click **"Add Webhook"**.
3. **Enter the Webhook URL**:
   ```
   https://smee.io/xdcfVCRWdTN9ED
   ```
4. **Select Events to Listen For**:
   - ✅ `video.asset.ready`
   - ✅ `video.asset.failed`
   - ✅ `video.upload.created`
   - ✅ `video.upload.asset_created`
   - ✅ `video.upload.cancelled`
5. **Click Save**.

🚀 **Now Mux will send webhooks to `smee.io`, which will forward them to your local Strapi app!** 🎉

---

<!-- ## **🔹 Step 4: Handle Webhooks in Strapi**
### 📌 **Create Webhook Controller**
**File:** `./src/api/mux/controllers/mux.js`
```javascript
"use strict";

module.exports = {
  async handleMuxWebhook(ctx) {
    try {
      const { type, data } = ctx.request.body;
      console.log("📩 Received Mux Webhook:", type, data);

      if (type === "video.asset.ready") {
        await strapi.db.query("api::video.video").update({
          where: { muxAssetId: data.id },
          data: { muxPlaybackId: data.playback_ids[0].id, status: "ready" },
        });
      } else if (type === "video.asset.failed") {
        await strapi.db.query("api::video.video").update({
          where: { muxAssetId: data.id },
          data: { status: "failed" },
        });
      }

      return ctx.send({ received: true });
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      return ctx.badRequest("Webhook processing failed");
    }
  },
};
```

### 📌 **Define Webhook Route**
**File:** `./src/api/mux/routes/mux.js`
```javascript
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
```

🚀 **Now Strapi can receive webhooks at `http://localhost:1337/api/mux/webhook`!** 🎉 -->

---

## **🔹 Step 5: Test Webhook Setup**
### ✅ **Restart Strapi**:
```bash
npm run develop
```

### ✅ **Verify `smee.io` is Running**:
```bash
smee -u https://smee.io/xdcfVCRWdTN9ED --target http://localhost:1337/api/mux/webhook
```
(Keep this running in a separate terminal window.)

### ✅ **Trigger a Webhook by Uploading a Video**
1. Upload a test video to Mux via Strapi Admin Panel.
2. Wait for **Mux to send a webhook**.
3. **Check the logs**, you should see:
   ```
   📩 Received Mux Webhook: video.asset.ready
   ```
4. **Verify in Strapi's database** → The `muxPlaybackId` should be stored.

---

## **📌 Summary: Setting Up Webhooks with `smee.io`**
| **Step** | **Action** |
|---------|-----------|
| **1️⃣ Install `smee-client`** | `npm install --global smee-client` |
| **2️⃣ Start Webhook Proxy** | `smee -u https://smee.io/xdcfVCRWdTN9ED --target http://localhost:1337/mux-video-uploader/webhook-handler` |
| **3️⃣ Register Webhook in Mux** | Add `smee.io` URL to Mux Dashboard |
| **4️⃣ Create Webhook Handler in Strapi** | `/api/mux/controllers/mux.js` |
| **5️⃣ Define Webhook Route** | `/api/mux/routes/mux.js` |
| **6️⃣ Restart Strapi & Test** | `npm run develop` |

🚀 **Now Mux webhooks will automatically update Strapi with video statuses!** 🔥
Would you like help **securing webhooks to prevent unauthorized calls?** 🚀

