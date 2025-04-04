// src/admin/app.tsx
import type { StrapiApp } from "@strapi/strapi/admin";
import MenuLogo from "./extensions/menu-logo.png";
import favicon from "./extensions/favicon.ico";
import VideoSelector from './extensions/components/video-selector';
import SourceTypeSelector from './extensions/components/source-type-selector';
import { Play } from '@strapi/icons';
import VideoBatchActions from './extensions/components/video-batch-actions';
//import VideoFormWrapper from './extensions/video-form-wrapper';
//import AutoCreatedFilter from './extensions/components/video-auto-created-filter';
import AutoCreatedCell from './extensions/components/auto-created-cell';
//import DeleteAutoCreatedVideos from './extensions/components/video-bulk-delete-auto';
import TestModeCell from './extensions/components/test-mode-cell';
//import TemplateSelector from './extensions/components/template-selector';

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
    // Register components
    app.addComponents([
      { name: 'video-selector', Component: VideoSelector },
      { name: 'source-type-selector', Component: SourceTypeSelector },
    ]);

    // Add menu links
    app.addMenuLink({
      to: '/video-dashboard',
      icon: () => <Play fill="primary700" />,
      intlLabel: {
        id: 'videos.dashboard',
        defaultMessage: 'Video Dashboard',
      },
      Component: async () => {
        return { default: VideoSelector };
      },
      permissions: [],
    });

    app.addMenuLink({
      to: `/content-manager/collectionType/api::video.video`,
      icon: () => <Play fill="primary700" />,
      intlLabel: {
        id: 'videos.all',
        defaultMessage: 'All Videos',
      },
      Component: async () => {
        return { default: () => <div>All Videos</div> };
      },
      permissions: [],
    });

    // Register source type custom field
    app.addFields([
      { type: 'sourceType', Component: SourceTypeSelector },
    ]);

    // Register batch actions in list view
    app.registerHook('Admin/CM/pages/ListView/mutateListView', ({ layout, components }) => {
      if (layout.apiID !== 'video') return { layout, components };

      return {
        layout,
        components: {
          ...components,
          actions: [...(components?.actions || []), { name: 'video-batch-actions', Component: VideoBatchActions }],
        },
      };
    });
    // ✅ Inject video form wrapper into edit view
// app.getPlugin('content-manager').injectComponent('editView', 'api::video.video', {
//   name: 'video-form-wrapper',
//   Component: VideoFormWrapper,
// });

// // ✅ Inject auto-created video filter
// app.getPlugin('content-manager').injectComponent('listView', 'api::video.video', {
//   name: 'auto-created-filter',
//   Component: AutoCreatedFilter,
// });

// ✅ Inject auto-created badge cell
// app.getPlugin('content-manager').injectComponent('listView.table.cell', 'api::video.video', {
//   name: 'auto_created',
//   Component: AutoCreatedCell,
// });

// ✅ Inject bulk delete button
// app.getPlugin('content-manager').injectComponent('listView.actions', 'api::video.video', {
//   name: 'bulk-delete-auto',
//   Component: DeleteAutoCreatedVideos,
// });

// ✅ Inject test mode badge cell
// app.getPlugin('content-manager').injectComponent('listView.table.cell', 'api::video.video', {
//   name: 'is_test_asset',
//   Component: TestModeCell,
// });

// ✅ Inject template selector into edit view
// app.getPlugin('content-manager').injectComponent('editView', 'api::video.video', {
//   name: 'template-selector',
//   Component: TemplateSelector,
// });

  }
};
