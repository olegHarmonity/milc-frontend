import authMiddleware from "../middleware/auth";
import { ROLES } from "@/utils/config/constants";

export default {
  path: "/admin",
  meta: {
    middleware: [authMiddleware(ROLES.ADMIN)],
  },
  component: () => import("@/components/layouts/AppLayout.vue"),
  children: [
    {
      path: "",
      redirect: "dashboard",
      name: "admin",
    },
    {
      path: "dashboard",
      name: "admin.dashboard",
      component: () => import("@/views/admin/Dashboard.vue"),
    },
    {
      path: "organisations",
      name: "admin.organisations",
      component: () =>
        import("@/views/admin/organisations/OrganisationsIndex.vue"),
    },
    {
      path: "organisations/:id",
      name: "admin.organisations.view",
      component: () =>
        import("@/views/admin/organisations/OrganisationsView.vue"),
    },
    {
      path: "users",
      name: "admin.users",
      component: () => import("@/views/admin/users/UsersIndex.vue"),
    },
    {
      path: "users/:id",
      name: "admin.users.view",
      component: () => import("@/views/admin/users/UsersView.vue"),
    },
    {
      path: "products",
      name: "admin.products",
      component: () => import("@/views/admin/Products.vue"),
    },
    {
      path: "categories",
      name: "admin.categories",
      component: () => import("@/views/admin/Categories.vue"),
    },
    {
      path: "people",
      name: "admin.people",
      component: () => import("@/views/admin/People.vue"),
    },
    {
      path: "orders",
      name: "admin.orders",
      component: () => import("@/views/admin/Orders.vue"),
    },
    {
      path: "orders/:id",
      name: "admin.orders.view",
      component: () => import("@/views/admin/orders/OrderOverview.vue"),
    },
    {
      path: "feedback",
      name: "admin.feedback",
      component: () => import("@/views/admin/Feedback.vue"),
    },
    {
      path: "settings",
      name: "admin.settings",
      component: () => import("@/views/admin/Settings.vue"),
    },
    {
      path: "contracts/",
      name: "admin.contracts",
      component: () => import("@/views/admin/contracts/ContractsIndex.vue"),
    },
    {
      path: "contracts/:id",
      name: "admin.contracts.view",
      component: () => import("@/views/admin/contracts/ContractsView.vue"),
    },
    {
      path: "contracts/contract-template",
      name: "admin.contracts.template",
      component: () => import("@/views/admin/contracts/ContractsTemplate.vue"),
    },
  ],
};
