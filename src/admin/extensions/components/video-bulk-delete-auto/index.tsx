// // File: src/admin/extensions/components/video-bulk-delete-auto/index.tsx
// import React from 'react';
// import { useNotification } from '@strapi/strapi/admin';
// import { Button } from '@strapi/design-system';
// import { ExclamationMarkCircle } from '@strapi/icons';

// const DeleteAutoCreatedVideos = () => {
//   const { toggleNotification } = useNotification();

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete all auto-created videos?')) return;

//     try {
//       const res = await fetch('/api/videos/bulk-delete-auto-created', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const result = await res.json();

//       toggleNotification({
//         type: 'success',
//         message: `Deleted ${result.deletedCount} auto-created videos.`,
//       });

//       window.location.reload();
//     } catch (err) {
//       toggleNotification({ type: 'danger', message: 'Failed to delete auto-created videos.' });
//     }
//   };

//   return (
//     <Button variant="danger" startIcon={<ExclamationMarkCircle />} onClick={handleDelete}>
//       Delete Auto-Created Videos
//     </Button>
//   );
// };

// export default DeleteAutoCreatedVideos;