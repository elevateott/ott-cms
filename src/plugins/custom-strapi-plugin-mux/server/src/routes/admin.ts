const routes = [
  {
    method: 'POST',
    path: '/custom-strapi-plugin-mux/direct-upload',
    handler: 'mux.postDirectUpload',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'POST',
    path: '/custom-strapi-plugin-mux/remote-upload',
    handler: 'mux.postRemoteUpload',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'DELETE',
    path: '/custom-strapi-plugin-mux/mux-asset/:documentId',
    handler: 'mux.deleteMuxAsset',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'POST',
    path: '/custom-strapi-plugin-mux/webhook-handler',
    handler: 'mux.muxWebhookHandler',
    config: {
      auth: false,
      prefix: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/thumbnail/:documentId',
    handler: 'mux.thumbnail',
    config: {
      auth: false,
      prefix: false,
      description: 'Proxies thumbnail requests to load correctly within the Strapi Admin Dashboard',
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/storyboard/:documentId',
    handler: 'mux.storyboard',
    config: {
      auth: false,
      prefix: false,
      description: 'Proxies storyboard requests to load correctly within the Strapi Admin Dashboard',
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/sign/:documentId',
    handler: 'mux.signMuxPlaybackId',
    config: {
      prefix: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/mux-text-tracks/:documentId',
    handler: 'mux.textTrack',
    config: {
      policies: [],
      prefix: false,
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/mux-asset',
    handler: 'mux-asset.find',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/mux-asset/count',
    handler: 'mux-asset.count',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/mux-asset/:documentId',
    handler: 'mux-asset.findOne',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'POST',
    path: '/custom-strapi-plugin-mux/mux-asset',
    handler: 'mux-asset.create',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'PUT',
    path: '/custom-strapi-plugin-mux/mux-asset/:documentId',
    handler: 'mux-asset.update',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'DELETE',
    path: '/custom-strapi-plugin-mux/mux-asset/:documentId',
    handler: 'mux-asset.del',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/mux-settings',
    handler: 'mux-settings.isConfigured',
    config: {
      policies: [],
      prefix: false,
    },
  },
  {
    method: 'GET',
    path: '/custom-strapi-plugin-mux/health',
    handler: (ctx) => {
      ctx.body = { status: 'ok', timestamp: new Date().toISOString() };
    },
    config: {
      auth: false,
    },
  }
];

export default routes;
