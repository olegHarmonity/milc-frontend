import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import Upload from "@/components/auth/register/Upload.vue";
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
  icons: {
    values: {
      upload: {
        component: Upload,
      },
    },
  },
  lang: {
    locales: { en, de },
    current: i18n.locale,
    defaultLocale: "en",
  },
});
