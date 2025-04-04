// src/middlewares/source-type-enforcer.ts

export default (config, { strapi }) => {
    return async (ctx, next) => {
      const settings = await strapi
        .documents('api::setting.setting')
        .findFirst();

      const mode = settings?.videoSourceMode ?? 'both';
      const body = ctx.request.body;

      if (ctx.request.path.includes('/videos')) {
        if (mode === 'Mux' && body.source_type === 'Embedded') {
          return ctx.badRequest('Embedded videos are disabled by platform settings.');
        }

        if (mode === 'Embedded' && body.source_type === 'Mux') {
          return ctx.badRequest('Mux videos are disabled by platform settings.');
        }
      }

      await next();
    };
  };
