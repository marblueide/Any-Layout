import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHistory(
    // import.meta.env.MODE == "development" ? "" : "/Any-Layout"
    import.meta.env.MODE == "development" ? "" : "/lowCode/"
  ),
  routes,
});

export default router;
