import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import en from "vuetify/es5/locale/en";
import de from "vuetify/es5/locale/de";
import i18n from "./i18n";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: { customProperties: true },
    themes: {
      dark: {
        primary: "#630E17",
        secondary: "#2B2E34",
      },
    },
  },
  lang: {
    locales: { en, de },
    current: i18n.locale,
    defaultLocale: "en",
  },
});
