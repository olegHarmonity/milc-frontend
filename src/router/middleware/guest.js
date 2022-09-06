import store from "@/store";
import { ROLES } from "@/utils/config/constants";

export default function ({ next, router }) {
  const user = store.getters["auth/user"];

  if (user) {
    const route = user.role == ROLES.ADMIN ? "admin" : "app";
    return router.replace({ name: route });
  }

  return next();
}
