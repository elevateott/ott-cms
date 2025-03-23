import type { StrapiApp } from "@strapi/strapi/admin";
import MenuLogo from "./extensions/menu-logo.png";
import favicon from "./extensions/favicon.ico";
import VideoSelector from './extensions/components/video-selector';
import { useNavigate } from 'react-router-dom';
import { Button } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { LinkButton } from '@strapi/design-system';

// Define types for the hook parameters
interface LinkItem {
  type: string;
  to?: string;
  Component?: any;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

interface RightLinksHookParams {
  contentType: {
    uid: string;
    [key: string]: any;
  };
  links: LinkItem[];
}

export default {
  config: {
    head: {
      favicon: favicon,
    },
    menu: {
      logo: MenuLogo,
    },
    locales: [
      "en",
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "OTT CMS Dashboard",
        "videos.menu.title": "Videos",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);

      // List all available hooks
      //console.log('Available hooks:', Object.keys(app || {}));

      // app.registerHook('Admin/CM/pages/ListView/right-links', ({ contentType, links }) => {
      //   console.log('Hook triggered!');
      //   return { contentType, links };
      // });

    // app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', ({ displayedHeaders, layout }) => {
    //   // This hook allows you to modify the list view columns
    //   console.log('Mux assets hook triggered!', { displayedHeaders, layout });

    //   // Your modification logic here
    //   // For example, you might want to add a custom action button:
    //   if (layout.contentType.uid === 'plugin::custom-strapi-plugin-mux.mux-asset') {
    //     // Modify the displayedHeaders or other properties
    //     console.log('layout.contentType.uid', layout.contentType.uid);
    //   }

    //   return { displayedHeaders, layout };
    // });

    // You might also need this hook to override the "Create new entry" button
    // app.registerHook(
    //   'Admin/CM/pages/ListView/right-links',
    //   ({ contentType, links }: RightLinksHookParams) => {
    //     console.log('registerHook triggered!', { contentType, links });

    //     // Check if we're on the mux-assets list view
    //     if (contentType.uid === 'plugin::custom-strapi-plugin-mux.mux-asset') {
    //       // Replace the default "Create new entry" link with your custom link
    //       const modifiedLinks = links.map((link: LinkItem) => {
    //         if (link.type === 'Button' && link.to?.includes('/create')) {
    //           return {
    //             ...link,
    //             to: '/plugins/custom-strapi-plugin-mux', // Adjust this path to match your plugin's route
    //             onClick: (e: React.MouseEvent) => {
    //               e.preventDefault();
    //               // Navigate to your plugin's interface
    //               window.location.href = '/admin/plugins/custom-strapi-plugin-mux';
    //             }
    //           };
    //         }
    //         return link;
    //       });

    //       return { contentType, links: modifiedLinks };
    //     }

    //     return { contentType, links };
    //   }
    // );
  },
};
