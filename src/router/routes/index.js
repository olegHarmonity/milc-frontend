/**
 * README
 *
 * Keep this file clean and DO NOT overload it with routes, group routes into seperate files.
 */

import adminRoutes from "./admin";
import appRoutes from "./app";
import authRoutes from "./auth";
// import authMiddleware from "../middleware/auth";

const routes = [
  adminRoutes,
  appRoutes,
  authRoutes,
  {
    path: "/",
    name: "home",
    component: () => import("../../views/Categories.vue"),
    // meta: {
    //   middleware: [authMiddleware()],
    // },
  },
  {
    path: "/404",
    alias: "*",
    name: "not-found",
    component: () => import("../../views/NotFound.vue"),
  },
];

export default routes;
