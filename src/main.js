/**
 * README
 *
 * Keep this file clean, and seperate plugins configuration into different files.
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import "./utils/mixins";
import "./plugins/components.js";
import "./plugins/mask";
import "./plugins/toast";
import "./plugins/vue-debounce";
import "./plugins/vue-apexchart";

Vue.config.productionTip = false;

store.dispatch("auth/user").finally(() => {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
  }).$mount("#app");
});
