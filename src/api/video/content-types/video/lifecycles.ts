export default {
    async beforeCreate(event) {
      validateSourceType(event.params.data);
    },
    async beforeUpdate(event) {
      validateSourceType(event.params.data);
    },
  };

  function validateSourceType(data) {
    const { sourceType, muxAsset, embeddedVideo } = data;

    if (sourceType === 'Mux' && !muxAsset) {
      throw new Error('Mux source selected, but no Mux Asset is linked.');
    }

    if (sourceType === 'Embedded' && !embeddedVideo) {
      throw new Error('Embedded source selected, but no Embedded Video is linked.');
    }

    if (sourceType === 'Mux' && embeddedVideo) {
      throw new Error('Cannot select Embedded Video when Mux is the source.');
    }

    if (sourceType === 'Embedded' && muxAsset) {
      throw new Error('Cannot select Mux Asset when Embedded is the source.');
    }
  }
