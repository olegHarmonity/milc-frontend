import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const files = require.context("../locales/", false, /\.js$/);
const messages = {};

files.keys().forEach((key) => {
  messages[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

// const languages = Object.keys(messages);

export default new VueI18n({
  locale:
    process.env.VUE_APP_I18N_LOCALE || navigator.language.split("-")[0] || "en",
  fallbackLocale: "en",
  messages,
  silentFallbackWarn: true,
});
