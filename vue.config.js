module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/overrides.scss";`,
      },
    },
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: undefined,
      fallbackLocale: undefined,
      localeDir: undefined,
      enableInSFC: undefined,
      enableBridge: undefined,
    },
  },
};
