/**
 * README
 *
 * Keep this file clean and DO NOT overload it with routes, group routes into seperate files.
 */

import adminRoutes from "./admin";
import appRoutes from "./app";
import authRoutes from "./auth";
import authMiddleware from "../middleware/auth";

const routes = [
  appRoutes,
  authRoutes,
  adminRoutes,

  {
    path: "/",
    name: "home",
    redirect: "app",
    component: () => import("@/components/layouts/AppLayout.vue"),
    meta: {
      middleware: [authMiddleware()],
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () =>
          import("@/views/app/products/ProductsSingleCategory.vue"),
        meta: {
          cleanLayout: true,
        },
      },
    ],
  },
  {
    path: "/404",
    alias: "*",
    name: "not-found",
    component: () => import("../../views/NotFound.vue"),
  },
];

export default routes;
