import axios from 'axios';
import { Parser } from 'm3u8-parser';

export async function parseManifest(hlsUrl: string) {
  try {
    const res = await axios.get(hlsUrl);
    const parser = new Parser();
    parser.push(res.data);
    parser.end();

    const manifest = parser.manifest;

    const duration = manifest?.segments?.reduce((acc, seg) => acc + seg.duration, 0) || 0;

    // Try to extract resolution from stream info (if it's a master playlist)
    const resolution = manifest?.playlists?.[0]?.attributes?.RESOLUTION;
    const resolutionStr = resolution ? `${resolution.width}x${resolution.height}` : '';

    return {
      duration: Math.round(duration),
      resolution: resolutionStr,
    };
  } catch (err) {
    console.error('Failed to parse HLS manifest:', err.message);
    return { duration: 0, resolution: '' };
  }
}
