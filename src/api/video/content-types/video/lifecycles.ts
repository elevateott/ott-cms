// src/api/video/content-types/video/lifecycles.ts
export default {
  async beforeCreate(event) {
    validateSourceType(event.params.data);
    ensureRequiredComponents(event.params.data);
  },

  async beforeUpdate(event) {
    if (event.params.data.sourceType) {
      validateSourceType(event.params.data);
    }
  }
};

function validateSourceType(data) {
  if (!data.sourceType) return;

  const { sourceType, muxAsset, embeddedVideo } = data;

  if (sourceType === 'Mux' && !muxAsset) {
    throw new Error('Mux source selected, but no Mux Asset is linked.');
  }

  if (sourceType === 'Embedded' && !embeddedVideo) {
    throw new Error('Embedded source selected, but no Embedded Video is linked.');
  }

  if (sourceType === 'Mux' && embeddedVideo) {
    // Clear the embedded video if source type is Mux
    data.embeddedVideo = null;
  }

  if (sourceType === 'Embedded' && muxAsset) {
    // Clear the Mux asset if source type is Embedded
    data.muxAsset = null;
  }
}

function ensureRequiredComponents(data) {
  // Ensure publication status is set
  if (!data.publicationStatus) {
    data.publicationStatus = {
      contentStatus: 'Unpublished'
    };
  }

  // Ensure content access is set
  if (!data.contentAccess) {
    data.contentAccess = {
      accessLevel: 'Free',
      downloadable: false
    };
  }
}