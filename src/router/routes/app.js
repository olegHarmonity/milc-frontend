import authMiddleware from "../middleware/auth";
// import { ROLES } from "@/utils/config/constants";

export default {
  path: "/app",
  meta: {
    middleware: [authMiddleware()],
  },
  component: () => import("@/components/layouts/AppLayout.vue"),
  children: [
    {
      path: "",
      redirect: "products",
      name: "app",
    },
    {
      path: "products",
      component: () => import("@/views/app/Products.vue"),
      children: [
        {
          path: "",
          name: "app.products",
          component: () => import("@/views/app/products/ProductList.vue"),
        },
        {
          path: "add",
          name: "app.products.add",
          component: () => import("@/views/app/products/ProductAdd.vue"),
        },
        {
          path: "edit/:id",
          name: "app.products.edit",
          component: () => import("@/views/app/products/ProductEdit.vue"),
        },
        {
          path: ":id",
          name: "app.products.view",
          component: () => import("@/views/app/products/Product.vue"),
          meta: {
            cleanLayout: true,
          },
        },
        {
          path: "category/:id",
          name: "app.products.category",
          component: () =>
            import("@/views/app/products/ProductsSingleCategory.vue"),
          meta: {
            cleanLayout: true,
          },
        },
      ],
    },
    {
      path: "orders",
      name: "app.orders",
      component: () => import("@/views/app/Orders.vue"),
    },
    {
      path: "orders/:id",
      name: "app.orders.view",
      component: () => import("@/views/app/orders/OrderOverview.vue"),
    },
    {
      path: "settings",
      name: "app.settings",
      component: () => import("@/views/app/Settings.vue"),
    },
    {
      path: "users",
      name: "app.users",
      component: () => import("@/views/app/Users.vue"),
    },
    {
      path: "saved-products",
      name: "app.savedProducts",
      component: () => import("@/views/app/SavedProducts.vue"),
    },
    {
      path: "organisation/:id",
      name: "app.organisation",
      component: () =>
        import("@/views/app/organisations/OrganisationsView.vue"),
      meta: {
        cleanLayout: true,
      },
    },
    {
      path: "checkout/:number",
      name: "app.checkout",
      component: () => import("@/views/app/Checkout.vue"),
      meta: {
        cleanLayout: true,
      },
      props: true,
    },
    {
      path: "checkout/:number/paypal-callback",
      component: () => import("@/views/app/checkout/PaypalCallback.vue"),
      meta: {
        cleanLayout: true,
      },
    },
    {
      path: "checkout/:number/paypal-callback/cancel",
      component: () => import("@/views/app/checkout/PaypalCallback.vue"),
      meta: {
        cleanLayout: true,
      },
      props: {
        cancel: true,
      },
    },
    {
      path: "messages",
      name: "app.messages",
      component: () => import("@/views/app/Messages.vue"),
    },
    {
      path: "contracts/",
      name: "app.contracts",
      component: () => import("@/views/app/contracts/ContractsIndex.vue"),
    },
    {
      path: "contracts/:id",
      name: "app.contracts.view",
      component: () => import("@/views/app/contracts/ContractsView.vue"),
    },
    {
      path: "contracts/contract-template",
      name: "app.contracts.template",
      component: () => import("@/views/app/contracts/ContractsTemplate.vue"),
    },
    {
      path: "notifications",
      name: "app.notifications",
      component: () => import("@/views/app/Notifications.vue"),
    },
  ],
};
