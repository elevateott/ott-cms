import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import pluginPermissions from './permissions';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `/plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: getTranslation('Common.plugin-title'),
        defaultMessage: 'Mux Video Uploader',
      },
      // Use the mainRead permission which should be the plugin-level access permission
      permissions: [pluginPermissions.mainRead],
      Component: async () => {
        const component = await import('./pages/App');
        return component.default;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    // Handle potential issues with empty locales
    if (!locales || !Array.isArray(locales) || locales.length === 0) {
      return []; // Return empty array if locales are not properly defined
    }

    try {
      const importedTranslations = await Promise.all(
        locales.map((locale) => {
          return import(`./translations/${locale}.json`)
            .then(({ default: data }: { default: Record<string, string> }) => {
              // Transform the data to match Strapi's expected format
              const transformedData = Object.keys(data || {}).reduce((acc, current) => {
                acc[`${PLUGIN_ID}.${current}`] = data[current];
                return acc;
              }, {} as Record<string, string>);

              return {
                data: transformedData,
                locale,
              };
            })
            .catch(() => {
              return {
                data: {}, // Empty object for failed imports
                locale,
              };
            });
        })
      );

      return importedTranslations;
    } catch (error) {
      console.error('Error loading translations:', error);
      return []; // Return empty array on error
    }
  },
};
