import store from "@/store";
import { ROLES } from "@/utils/config/constants";

export default (roles = null) =>
  function ({ to, next }) {
    const user = store.getters["auth/user"];

    if (!user) {
      const redirect = to.path + window.location.search;

      return next({
        name: "auth.login",
        query: { redirect },
      });
    }

    if (roles == null) {
      return next();
    }

    if (typeof roles == "string") {
      roles = [roles];
    }

    for (const role of roles) {
      if (user.role == role) {
        return next();
      }
    }

    const route = user.role == ROLES.ADMIN ? "admin" : "app";
    return next({ name: route });
  };
