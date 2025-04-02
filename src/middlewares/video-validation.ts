// src/middlewares/video-validation.ts
export default (config, { strapi }) => {
    return async (ctx, next) => {
      const { url, method, request } = ctx;

      // VTT upload check for subtitles
      if (url.startsWith('/upload') && method === 'POST') {
        const fileInfoRaw = request.body?.fileInfo;

        if (fileInfoRaw) {
          const fileInfo = JSON.parse(fileInfoRaw);

          const fileName = fileInfo.name.toLowerCase();
          const extension = fileName.split('.').pop();
          const mime = fileInfo.type;

          // Custom logic: only allow .vtt if the file was uploaded from subtitles field
          if (
            fileInfo?.related?.some((rel) =>
              rel?.ref?.includes('subtitles')
            ) &&
            (mime !== 'text/vtt' || extension !== 'vtt')
          ) {
            ctx.throw(400, 'Only .vtt files are allowed for subtitle uploads.');
          }
        }
      }

      // Validate embedded video URLs
      if (
        (url.includes('/api/embedded-videos') || url.includes('/embedded-video')) &&
        (method === 'POST' || method === 'PUT')
      ) {
        const body = request.body?.data || {};

        if (body?.url) {
          // Validate URL format - must be an HLS stream (.m3u8)
          if (!body.url.match(/\.m3u8(\?.*)?$/i)) {
            return ctx.badRequest(
              'Validation error',
              { errors: { url: ['URL must be an HLS stream ending with .m3u8'] } }
            );
          }

          // Optional: Perform a light validation by checking if the URL resolves
          try {
            const response = await fetch(body.url, {
              method: 'HEAD',
              headers: { 'Accept': '*/*' },
            });

            if (response.status >= 400) {
              return ctx.badRequest(
                'Validation error',
                { errors: { url: ['Unable to access the URL. Please verify it exists and is accessible.'] } }
              );
            }
          } catch (error) {
            // Don't block on network errors - it might be an internal URL
            console.warn('Failed to validate embedded video URL:', error.message);
          }
        }
      }

      await next();
    };
  };