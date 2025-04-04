import { parseManifest } from '../../../../utils/hls-utils';

export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.hls_url) {
      const meta = await parseManifest(data.hls_url);
      data.duration = meta?.duration || null;
      data.resolution = meta?.resolution || '';
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.hls_url) {
      const meta = await parseManifest(data.hls_url);
      data.duration = meta?.duration || null;
      data.resolution = meta?.resolution || '';
    }
  },
};
