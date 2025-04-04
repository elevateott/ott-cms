export default {
    method: 'POST',
    path: '/videos/bulk-delete-auto-created',
    handler: 'video.bulkDeleteAutoCreated',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  };
