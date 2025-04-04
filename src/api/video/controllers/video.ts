/**
 * video controller
 */

import { factories } from '@strapi/strapi'

const defaultController = factories.createCoreController('api::video.video');

export default {
  ...defaultController,

  async bulkDeleteAutoCreated(ctx) {
    const entries = await strapi.entityService.findMany('api::video.video', {
      filters: { isAutoCreated: true },
      fields: ['id'],
      limit: 1000,
    });

    const ids = entries.map((e) => e.id);

    const deleted = await Promise.all(
      ids.map((id) => strapi.entityService.delete('api::video.video', id))
    );

    ctx.send({ deletedCount: deleted.length });
  },
};

//export default factories.createCoreController('api::video.video');
