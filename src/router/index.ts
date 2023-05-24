import { appStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

console.log(routes)

const router = createRouter({
  history: createWebHistory(
    import.meta.env.MODE == "development" ? "" : "/lowCode/"
  ),
  routes,
});

router.beforeEach((to,from) => {
  const { isLogin } = appStore.user;
  if (to.path != '/login' && !isLogin) {
    return {
      path:"/login"
    }
  } else if (to.path == "/login" && isLogin) {
    // router.back()
  }
})

export default router;
