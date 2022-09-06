/**
 * README
 *
 * Do not add routes here, use file /src/router/routes/index.js.
 * Do not write middlewares here, use folder /src/router/middleware/.
 */

import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

const router = new Router({
  routes,
  mode: "history",
});

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) {
    return context.next;
  }

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  const middlewares = to.matched
    .flatMap((m) => m.meta.middleware)
    .filter((m) => !!m);

  if (!middlewares.length) {
    return next();
  }

  const context = { from, next, router, to };
  const nextMiddleware = nextFactory(context, middlewares, 1);

  return middlewares[0]({ ...context, next: nextMiddleware });
});

export default router;
