import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

console.log(routes)

const router = createRouter({
  history: createWebHistory(
    import.meta.env.MODE == "development" ? "" : "/lowCode/"
  ),
  routes,
});

export default router;
