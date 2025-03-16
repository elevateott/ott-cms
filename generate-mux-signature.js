const crypto = require("crypto");

const webhookSecret = "eqh3v390tgr3jpier4ecnnii242pc17n"; // Replace with your actual secret
const payload = JSON.stringify({
  type: "video.asset.ready",
  data: {
    id: "mux-asset-123456",
    playback_ids: [{ id: "mux-playback-123456", policy: "public" }],
    status: "ready",
    duration: 120,
  },
});

const timestamp = Math.floor(Date.now() / 1000);
const signature = crypto
  .createHmac("sha256", webhookSecret)
  .update(`${timestamp}.${payload}`)
  .digest("hex");

console.log(`Timestamp: ${timestamp}`);
console.log(`Mux-Signature: t=${timestamp}, v1=${signature}`);
