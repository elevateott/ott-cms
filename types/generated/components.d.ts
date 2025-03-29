import type { Schema, Struct } from '@strapi/strapi';

export interface AccessContentAccess extends Struct.ComponentSchema {
  collectionName: 'components_access_content_accesses';
  info: {
    description: '';
    displayName: 'ContentAccess';
  };
  attributes: {
    accessLevel: Schema.Attribute.Enumeration<['public', 'gated']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'public'>;
    downloadable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    expirationDate: Schema.Attribute.DateTime;
    releaseDate: Schema.Attribute.DateTime;
  };
}

export interface AccessVisibility extends Struct.ComponentSchema {
  collectionName: 'components_access_content_visibilities';
  info: {
    description: 'Controls content publishing status, scheduling, and expiration.';
    displayName: 'Visibility';
    icon: 'eye';
  };
  attributes: {
    contentStatus: Schema.Attribute.Enumeration<
      ['Unpublished', 'Published', 'Scheduled']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Unpublished'>;
    expirationDate: Schema.Attribute.DateTime;
    scheduledDate: Schema.Attribute.DateTime;
  };
}

export interface AnalyticsFoo2 extends Struct.ComponentSchema {
  collectionName: 'components_analytics_foo_2s';
  info: {
    displayName: 'Foo 2';
  };
  attributes: {
    Name: Schema.Attribute.String;
  };
}

export interface ContentResource extends Struct.ComponentSchema {
  collectionName: 'components_content_resources';
  info: {
    description: '';
    displayName: 'Resource';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 140;
      }>;
    file: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 3;
      }>;
  };
}

export interface ContentSubtitle extends Struct.ComponentSchema {
  collectionName: 'components_content_subtitles';
  info: {
    description: '';
    displayName: 'Subtitles';
  };
  attributes: {
    captionType: Schema.Attribute.Enumeration<['subtitles', 'captions']> &
      Schema.Attribute.DefaultTo<'subtitles'>;
    file: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    language: Schema.Attribute.Relation<'oneToOne', 'api::language.language'>;
  };
}

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
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 170;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    permalink: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
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

export interface SubscriptionsSubscriptionOptions
  extends Struct.ComponentSchema {
  collectionName: 'components_subscriptions_subscription_options';
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'access.content-access': AccessContentAccess;
      'access.visibility': AccessVisibility;
      'analytics.foo-2': AnalyticsFoo2;
      'content.resource': ContentResource;
      'content.subtitle': ContentSubtitle;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'subscriptions.subscription-options': SubscriptionsSubscriptionOptions;
    }
  }
}
