// src/admin/app.tsx
import type { StrapiApp } from "@strapi/strapi/admin";
import MenuLogo from "./extensions/menu-logo.png";
import favicon from "./extensions/favicon.ico";
import VideoSelector from './extensions/components/video-selector';
import SourceTypeSelector from './extensions/components/source-type-selector';

interface ContentTypeAttribute {
  name: string;
  type: string;
  customField?: string;
  [key: string]: any;
}

export default {
  config: {
    head: {
      favicon: favicon,
    },
    menu: {
      logo: MenuLogo,
    },
    locales: ["en"],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "OTT CMS Dashboard",
        "videos.menu.title": "Videos",
        "videos.dashboard": "Video Dashboard",
        "videos.all": "All Videos",
        "videos.mux": "Mux Videos",
        "videos.embedded": "Embedded Videos",
        "videos.categories": "Categories",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    // Register our components
    app.addComponents([
      { name: 'video-selector', Component: VideoSelector },
      { name: 'source-type-selector', Component: SourceTypeSelector }
    ]);

    // Add Video Management links to the main menu
    app.addMenuLink({
      to: '/video-dashboard',
      icon: () => <span />,
      intlLabel: {
        id: 'videos.dashboard',
        defaultMessage: 'Video Dashboard',
      },
      Component: async () => {
        // This function needs to return a Promise with the component
        return { default: VideoSelector };
      },
      permissions: [],
    });

    // Add other menu links for Videos, Mux Videos, etc.
    app.addMenuLink({
      to: `/content-manager/collectionType/api::video.video`,
      icon: () => <span />,
      intlLabel: {
        id: 'videos.all',
        defaultMessage: 'All Videos',
      },
      Component: async () => {
        return { default: () => <div>All Videos</div> };
      },
      permissions: [],
    });

    // Register our custom field
    app.addFields([
      { type: 'sourceType', Component: SourceTypeSelector }
    ]);

    // Register hooks for custom UI enhancements
    // app.registerHook(
    //   'Admin/CM/pages/EditView/mutateEditViewLayout',
    //   ({ layout, query }) => {
    //     if (query?.contentType === 'api::video.video') {
    //       const sourceTypeIdx = layout.contentType.attributes.findIndex(
    //         (attr: ContentTypeAttribute) => attr.name === 'sourceType'
    //       );

    //       if (sourceTypeIdx !== -1) {
    //         layout.contentType.attributes[sourceTypeIdx].customField = 'sourceType';
    //       }
    //     }

    //     return { layout };
    //   }
    // );
  },
};