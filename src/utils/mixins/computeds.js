import store from "@/store";
import { ROLES } from "@/utils/config/constants";
import config from "@/utils/config/config";

export default {
  computed: {
    $config() {
      return config;
    },

    $organisation() {
      return store.getters["auth/user"]?.organisation;
    },

    $platformRoute() {
      const user = store.getters["auth/user"];

      if (!user) {
        return { name: "home" };
      }

      return this.$user?.role == ROLES.ADMIN
        ? { name: "admin" }
        : { name: "app" };
    },

    $user() {
      return store.getters["auth/user"];
    },
  },
};
