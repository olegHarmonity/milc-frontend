import Vue from "vue";
import Vuex from "vuex";

import admin from "./admin";
import auth from "./auth";
import contracts from "./contracts";
import emails from "./emails";
import feedback from "./feedback";
import files from "./files";
import mediahub from "./mediahub";
import messages from "./messages";
import movieContentTypes from "./movieContentTypes";
import movieFormats from "./movieFormats";
import movieGenres from "./movieGenres";
import movieRights from "./movieRights";
import notifications from "./notifications";
import orders from "./orders";
import organisations from "./organisations";
import organisationTypes from "./organisationTypes";
import people from "./people";
import products from "./products";
import users from "./users";
import cart from "./cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    auth,
    contracts,
    emails,
    feedback,
    files,
    mediahub,
    messages,
    movieContentTypes,
    movieFormats,
    movieGenres,
    movieRights,
    notifications,
    orders,
    organisations,
    organisationTypes,
    people,
    products,
    users,
    cart,
  },
});
