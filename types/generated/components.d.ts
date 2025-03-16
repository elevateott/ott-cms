import type { Schema, Struct } from '@strapi/strapi';

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedResource extends Struct.ComponentSchema {
  collectionName: 'components_shared_resources';
  info: {
    displayName: 'Resource';
  };
  attributes: {
    file: Schema.Attribute.Media;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'SEO';
    icon: 'allergies';
    name: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
    websiteUrl: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSubscriptionOptions extends Struct.ComponentSchema {
  collectionName: 'components_shared_subscription_options';
  info: {
    displayName: 'Subscription Options';
  };
  attributes: {
    oneTimePurchasePrice: Schema.Attribute.Decimal;
    purchaseNote: Schema.Attribute.String;
    rentalDuration: Schema.Attribute.Enumeration<
      ['1 day', '3 days', '1 week', '1 month', '3 months', '6 months', '1 year']
    >;
    rentalPrice: Schema.Attribute.Decimal;
  };
}

export interface SharedSubtitle extends Struct.ComponentSchema {
  collectionName: 'components_shared_subtitles';
  info: {
    displayName: 'Subtitle';
  };
  attributes: {
    file: Schema.Attribute.Media;
    language: Schema.Attribute.Enumeration<['en', 'es', 'fr', 'de']>;
  };
}

export interface SharedVisibility extends Struct.ComponentSchema {
  collectionName: 'components_shared_visibilities';
  info: {
    displayName: 'Visibility';
    icon: 'eye';
  };
  attributes: {
    accessLevel: Schema.Attribute.Enumeration<['public', 'gated']>;
    downloadable: Schema.Attribute.Boolean;
    expirationDate: Schema.Attribute.DateTime;
    releaseDate: Schema.Attribute.DateTime;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.resource': SharedResource;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.subscription-options': SharedSubscriptionOptions;
      'shared.subtitle': SharedSubtitle;
      'shared.visibility': SharedVisibility;
    }
  }
}
