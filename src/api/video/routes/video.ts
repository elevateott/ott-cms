/**
 * video router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::video.video', {
  config: {
    find: {
      policies: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});


//export default factories.createCoreRouter('api::video.video');
