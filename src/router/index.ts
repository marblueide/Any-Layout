import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.MODE == "development" ? "" : "/Any-Layout"
  ),
  routes,
});

export default router;
