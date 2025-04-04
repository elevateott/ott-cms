// // src/plugins/custom-strapi-plugin-mux/content-types/mux-asset/lifecycles.ts

// import { factories } from '@strapi/strapi';
// import axios from 'axios';

// export default factories.createCoreService('plugin::custom-strapi-plugin-mux.mux-asset', ({ strapi }) => ({
//   async afterCreate(event) {
//     const muxAsset = event.result;

//     // ✅ Check if a video already exists for this Mux Asset
//     const existingVideo = await strapi
//       .documents('api::video.video')
//       .findFirst({
//         filters: { muxAsset: muxAsset.id },
//         status: 'draft', // You can omit if not using Draft & Publish
//       });

//     if (existingVideo) {
//       strapi.log.info(`Video already exists for Mux Asset ${muxAsset.id}`);
//       return;
//     }

//     // ✅ Create a linked video with base data
//     const createdVideo = await strapi
//       .documents('api::video.video')
//       .create({
//         data: {
//           title: muxAsset.playback_id ?? `Mux Video ${muxAsset.id}`,
//           sourceType: 'Mux',
//           muxAsset: muxAsset.id,
//           isAutoCreated: true,
//           publicationStatus: {
//             contentStatus: 'Unpublished',
//           },
//           contentAccess: {
//             accessLevel: 'Free',
//             downloadable: false,
//           },
//         },
//       });

//     // ✅ Pull metadata from Mux API
//     try {
//       const muxAssetId = muxAsset.mux_asset_id;
//       const muxTokenId = process.env.MUX_TOKEN_ID;
//       const muxTokenSecret = process.env.MUX_TOKEN_SECRET;

//       const { data } = await axios.get(`https://api.mux.com/video/v1/assets/${muxAssetId}`, {
//         auth: {
//           username: muxTokenId,
//           password: muxTokenSecret,
//         },
//       });

//       const duration = Math.round(data.data?.duration || 0);
//       const width = data.data?.max_stored_resolution?.width || 0;
//       const height = data.data?.max_stored_resolution?.height || 0;
//       const resolution = width && height ? `${width}x${height}` : '';

//       await strapi
//         .documents('api::video.video')
//         .update({
//           documentId: createdVideo.documentId,
//           data: {
//             duration,
//             resolution,
//           },
//         });

//       strapi.log.info(`Auto-linked metadata to video ${createdVideo.documentId}: ${duration}s, ${resolution}`);
//     } catch (err) {
//       strapi.log.error(`❌ Failed to fetch metadata from Mux API for asset ${muxAsset.id}: ${err.message}`);
//     }
//   },
// }));

