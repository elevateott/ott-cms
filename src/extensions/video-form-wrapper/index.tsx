// // File: src/extensions/video-form-wrapper/index.tsx
// import React, { useEffect, useState } from 'react';
// import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
// import SourceTypeSelector from '../source-type-selector';

// const VideoFormWrapper = ({ children }) => {
//   const { form } = useContentManagerContext();
//   const { values: modifiedData, onChange } = form;
//   const [videoMode, setVideoMode] = useState<'mux' | 'embedded' | 'both'>('both');

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const res = await fetch('/api/settings');
//         const data = await res.json();
//         setVideoMode(data?.data?.attributes?.video_source_mode || 'both');
//       } catch (e) {
//         console.error('Failed to fetch settings', e);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const sourceType = modifiedData?.source_type;
//   const isMux = sourceType === 'mux';
//   const isEmbedded = sourceType === 'embedded';

//   return (
//     <div>
//       {videoMode !== 'both' ? (
//         <p>Video Source is locked to: <strong>{videoMode}</strong></p>
//       ) : (
//         <SourceTypeSelector />
//       )}

//       {isMux && <div className="mt-4"><p>Mux Upload Area (linked via mux_asset)</p></div>}
//       {isEmbedded && <div className="mt-4"><p>Embedded video fields: HLS URL, Duration, Captions, etc.</p></div>}

//       {children}
//     </div>
//   );
// };

// export default VideoFormWrapper;
