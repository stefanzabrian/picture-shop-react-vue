import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import AboutView from "@/views/AboutView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  // if auth is required and the user is not logged in
  if ((authRequired && !auth.user) || (authRequired && !auth.token)) {
    // redirect to login
    return auth.logout();
  }
 
  // i want to verify if back end sends any json that contains "JWT was expired or incorrect" into the 
  // JSON at value of field "message" 
  // an example or response {"timestamp":1705663159969,"message":"JWT was expired or incorrect","details":"JWT validation failed"}
  // and if so i want to perform auth.logout(); 
  // how do i do that  here ???



});


export default router;
