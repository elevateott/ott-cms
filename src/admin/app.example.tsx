import type { StrapiApp } from '@strapi/strapi/admin';


/*
TODO:
customize admin dashboard
https://docs-v3.strapi.io/developer-docs/latest/guides/custom-admin.html#introduction
https://www.dgrebb.com/post/strapi-cms-admin-panel-customization-post-version-4-15-0/
https://docs-v4.strapi.io/dev-docs/admin-panel-customization
https://docs.strapi.io/dev-docs/plugins/admin-panel-api
https://docs.strapi.io/dev-docs/plugins/content-manager-apis
https://www.youtube.com/watch?v=XGR_Aa8uNHk
https://www.youtube.com/watch?v=434c3IkA4pU
https://www.youtube.com/watch?v=gS-l96dQAKk
https://github.com/boazpoolman/strapi-code-themes
https://forum.strapi.io/t/custom-admin-panel/28987
*/


export default {
  config: {
    locales: [
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
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};



/*
import MenuLogo from "./extensions/my-menu-logo.png";

export default {
  config: {
    menu: { // Replace the Strapi logo in the main navigation
      logo: MenuLogo,
    },
    // Other configuration options...
  },
  bootstrap() {},
};

import AuthLogo from "./extensions/my-logo.png";
import MenuLogo from "./extensions/logo.png";
import favicon from "./extensions/favicon.png";

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    // Replace the favicon
    head: {
      // Try to change the origin favicon.png file in the
      // root of strapi project if this config don't work.
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ["fr", "de"],
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      colors: {
        primary100: "#f6ecfc",
        primary200: "#e0c1f4",
        primary500: "#ac73e6",
        primary600: "#9736e8",
        primary700: "#8312d1",
        danger700: "#b72b1a",
      },
    },
    // Extend the translations
    translations: {
      fr: {
        "Auth.form.email.label": "test",
        Users: "Utilisateurs",
        City: "CITY (FRENCH)",
        // Customize the label of the Content Manager table.
        Id: "ID french",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },

  bootstrap() {},
};

*/

// export default {
//   config: {
//     locales: ["en"],
//     translations: {
//       en: {
//         "app.components.LeftMenu.navbrand.title": "OTT CMS Dashboard",
//       },
//     },
//     menu: {
//       logo: null,
//     },
//     tutorials: false,
//     notifications: { release: false },
//   },
//   bootstrap(app) {
//     // Configure the admin panel menu
//     app.addMenuLink({
//       to: "/content-manager/collectionType/api::article.article",
//       icon: "⚡",
//       intlLabel: {
//         id: "global.articles",
//         defaultMessage: "Articles",
//       },
//       permissions: [],
//       Component: null,
//     });

//     // Add more links as needed
//   },
// };

// export default {
//   config: {
//     // Keep existing logo, favicon, etc.
//   },
//   bootstrap(app) {
//     // Instead, configure menus here
//     app.menu.addSections([
//       {
//         id: "contentTypes",
//         title: { id: "content-types", defaultMessage: "Content Types" },
//         links: [
//           {
//             title: { id: "articles", defaultMessage: "Articles" },
//             to: "/content-manager/collectionType/api::article.article",
//           },
//           // Add other links here...
//         ],
//       },
//     ]);
//   },
// };

/*
possible admin menu customization
use strapi Menu API
// Keep your existing imports and config
export default {
  config: {
    // Keep existing logo, favicon, etc.

    // Remove the menus configuration from here
  },
  bootstrap(app) {
    // Instead, configure menus here
    app.menu.addSections([
      {
        id: "contentTypes",
        title: { id: "content-types", defaultMessage: "Content Types" },
        links: [
          {
            title: { id: "articles", defaultMessage: "Articles" },
            to: "/content-manager/collectionType/api::article.article",
          },
          // Add other links here...
        ],
      },
    ]);
  },
};

bootstrap(app) {
  // Hide default Content Types menu
  app.menu.setMainContentTypeEntries(['api::article.article',
    'api::author.author',
    'api::bundle.bundle',
    'api::category.category',
    'api::mux-video.mux-video',
    'api::embedded-video.embedded-video',
    'api::user.user']);
}


*/