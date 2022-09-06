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
  adminRoutes,
  appRoutes,
  authRoutes,
  {
    path: "/",
    name: "home",
    component: () => import("../../views/Home.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../../views/Categories.vue"),
    meta: {
      middleware: [authMiddleware()],
    },
  },
  {
    path: "/exchange-building",
    name: "exchangeBuilding",
    component: () => import("../../views/ExchangeBuildingMain.vue"),
  },
  {
    path: "/bank-building",
    name: "bankBuilding",
    component: () => import("../../views/BankBuildingMain.vue"),
  },
  {
    path: "/support-building",
    name: "tower3",
    component: () => import("../../views/Tower3.vue"),
  },
  {
    path: "/agb",
    name: "agb",
    component: () => import("../../views/AGB.vue"),
  },
  {
    path: "/community-building",
    name: "tower3",
    component: () => import("../../views/Community.vue"),
  },
  {
    path: "/datenschutz",
    name: "datenschutz",
    component: () => import("../../views/Datenschutz.vue"),
  },
  {
    path: "/impressum",
    name: "impressum",
    component: () => import("../../views/Impressum.vue"),
  },
  {
    path: "/404",
    alias: "*",
    name: "not-found",
    component: () => import("../../views/NotFound.vue"),
  },
];

export default routes;
