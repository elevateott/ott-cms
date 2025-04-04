// src/api/video/content-types/video/lifecycles.ts

export default {
  async beforeCreate(event) {
    const data = event.params.data;
    validateSourceType(data);
    ensureRequiredComponents(data);
    await applyTemplateDefaults(data);
  },

  async beforeUpdate(event) {
    const data = event.params.data;
    if (data.sourceType) {
      validateSourceType(data);
    }
    if (data.template_type === 'trailer') {
      data.status = 'draft';
      data.is_test_asset = true;
    }

    if (data.template_type === 'episode') {
      data.status = 'published';
    }
  },
};

function validateSourceType(data) {
  const { sourceType, muxAsset, embeddedVideo } = data;

  if (!sourceType) return;

  if (sourceType === 'Mux' && !muxAsset) {
    throw new Error('Mux source selected, but no Mux Asset is linked.');
  }

  if (sourceType === 'Embedded' && !embeddedVideo) {
    throw new Error('Embedded source selected, but no Embedded Video is linked.');
  }

  if (sourceType === 'Mux') {
    data.embeddedVideo = null;
  } else if (sourceType === 'Embedded') {
    data.muxAsset = null;
  }
}

function ensureRequiredComponents(data) {
  if (!data.publicationStatus) {
    data.publicationStatus = {
      contentStatus: 'Unpublished',
    };
  }

  if (!data.contentAccess) {
    data.contentAccess = {
      accessLevel: 'Free',
      downloadable: false,
    };
  }
}

async function applyTemplateDefaults(data) {
  if (!data.template_type) return;

  const rules = {
    trailer: { requireSource: 'Mux' },
    episode: {},
    clip: { allow: ['Embedded'] },
  };

  const rule = rules[data.template_type];

  if (rule?.requireSource && data.sourceType !== rule.requireSource) {
    throw new Error(`${data.template_type} templates must use ${rule.requireSource} source.`);
  }

  if (rule?.allow && !rule.allow.includes(data.sourceType)) {
    throw new Error(`${data.template_type} templates only allow ${rule.allow.join(', ')} source types.`);
  }
}
