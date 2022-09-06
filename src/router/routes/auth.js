import guestMiddleware from "../middleware/guest";

export default {
  path: "/auth",
  meta: {
    middleware: [guestMiddleware],
  },
  component: () => import("@/components/layouts/AuthLayout"),
  children: [
    {
      path: "register",
      name: "auth.register",
      component: () => import("@/views/auth/Register"),
    },
    {
      path: "login",
      name: "auth.login",
      component: () => import("@/views/auth/Login"),
    },
    {
      path: "forgot-password",
      name: "auth.forgot-password",
      component: () => import("@/views/auth/ForgotPassword"),
    },
    {
      path: "reset-password/:email",
      name: "auth.reset-password",
      component: () => import("@/views/auth/ResetPassword"),
    },
    {
      path: "verify-email/:token",
      name: "auth.verify-email",
      component: () => import("@/views/auth/VerifyEmail"),
    },
  ],
};
