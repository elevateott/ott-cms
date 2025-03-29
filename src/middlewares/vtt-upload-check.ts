export default (config, { strapi }) => {
    return async (ctx, next) => {
      const { url, method, request } = ctx;

      // Only run on upload POST request
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

      await next();
    };
  };
