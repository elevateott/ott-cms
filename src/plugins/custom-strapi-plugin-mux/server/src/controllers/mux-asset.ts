import { Context } from 'koa';

import { MuxAssetUpdate } from '../content-types/mux-asset/types';
import { resolveMuxAsset } from '../utils/resolve-mux-asset';
import { updateTextTracks } from '../utils/text-tracks';
import { ASSET_MODEL } from '../utils/types';

const search = async (ctx: Context) => {
  const params = ctx.query;
  if (!params.sort) {
    params.sort = "createdAt";
  }
  if (!params.order) {
    params.order = "desc";
  }

  // Convert to Strapi v5 format
  const queryParams = {
    sort: { [String(params.sort)]: String(params.order).toLowerCase() },
    start: params.start ? parseInt(params.start as string, 10) : 0,
    limit: params.limit ? parseInt(params.limit as string, 10) : 100,
  };

  // Use proper Strapi v5 query API
  return await strapi.db.query(ASSET_MODEL).findMany({
    ...queryParams,
  });
};

const find = async (ctx: Context) => {
  try {
    const entities = await search(ctx);
    const totalCount = await count(ctx);
    const items = entities || []; // Ensure items is never undefined
    return { items, totalCount };
  } catch (error) {
    console.error('Error in mux-asset.find:', error);
    throw error;
  }
};

const findOne = async (ctx: Context) => {
  const { documentId } = ctx.params;

  return await strapi.db.query(ASSET_MODEL).findOne({
    where: { id: documentId },
  });
};

const count = async (ctx: Context) => {
  const params = ctx.query;

  return await strapi.db.query(ASSET_MODEL).count();
};

const create = async (ctx: Context) => {
  const { body } = ctx.request.body;

  return await strapi.db.query(ASSET_MODEL).create({ data: body });
};

const update = async (ctx: Context) => {
  const { documentId } = ctx.params;
  const muxAsset = await resolveMuxAsset({ id: documentId });

  const { title, custom_text_tracks } = <MuxAssetUpdate>ctx.request.body;

  /** Let Mux's webhook handlers notify us of track changes */
  await updateTextTracks(muxAsset, custom_text_tracks);

  if (typeof title === 'string' && title) {
    await strapi.db.query(ASSET_MODEL).update({
      where: { id: documentId },
      data: { title },
    });
  }

  return { ok: true };
};

const del = async (ctx: Context) => {
  const { documentId } = ctx.params;

  return await strapi.db.query(ASSET_MODEL).delete(documentId);
};

export default {
  find,
  findOne,
  count,
  create,
  update,
  del,
};
