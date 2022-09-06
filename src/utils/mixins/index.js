import Vue from "vue";

import computeds from "./computeds";
import methods from "./methods";
import rule from "./rule";

Vue.mixin(computeds);
Vue.mixin(methods);
Vue.mixin(rule);
