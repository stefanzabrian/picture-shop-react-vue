import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import LoginView from "@/views/LoginView.vue";
import AboutView from "@/views/AboutView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CreatePictureView from "@/views/picture/CreatePictureView.vue";
import AllPictureView from "@/views/picture/AllPictureView.vue";
import SinglePictureView from "@/views/picture/SinglePictureView.vue";
import EditPictureView from "@/views/picture/EditPictureView.vue";
import ViewClientDetails from "@/views/user-client/ViewClientDetails.vue";
import VerifyIdentityView from "@/views/user-client/VerifyIdentityView.vue";
import UpdatePasswordView from "@/views/user-client/UpdatePasswordView.vue";
import AllOrderView from "@/views/order/AllOrderView.vue";
import ShoppingCartView from "@/views/shopping-cart/ShoppingCartView.vue";
import UserOrdersView from "@/views/order/UserOrdersView.vue";
import ForgotPasswordView from "@/views/user-client/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/user-client/ResetPasswordView.vue";
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
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/picture/create",
      name: "CreatePicture",
      component: CreatePictureView,
    },
    {
      path: "/picture/all",
      name: "AllPicture",
      component: AllPictureView,
    },
    {
      path: "/picture/:id",
      name: "single-picture-view",
      component: SinglePictureView,
    },
    {
      path: "/picture/edit/:id",
      name: "edit-picture-view",
      component: EditPictureView,
    },
    {
      path: "/user/view-client",
      name: "view-client-details",
      component: ViewClientDetails,
    },
    {
      path: "/user/verify-identity",
      name: "verify-current-password",
      component: VerifyIdentityView,
    },
    {
      path: "/user/update-password",
      name: "update-password",
      component: UpdatePasswordView,
      props: (route) => ({ token: route.query.token }),
      beforeEnter: (to, from, next) => {
        const passToken = localStorage.getItem("passToken");
        const tokenFromRoute = to.query.token;
        if (passToken === tokenFromRoute) {
          // If passToken matches the token from the route, proceed to ChangePasswordView
          next();
        } else {
          // If passToken does not match, redirect to some other route or display an error
          alert("Not Allowed!");
          next("/"); // Redirect to some other route
        }
      },
    },
    {
      path: "/user/reset-password",
      name: "resset-password",
      component: ResetPasswordView,
      props: (route) => ({ token: route.query.token }),
      beforeEnter: (to, from, next) => {
        const passToken = localStorage.getItem("passToken");
        const tokenFromRoute = to.query.token;
        if (passToken === tokenFromRoute) {
          // If passToken matches the token from the route, proceed to ChangePasswordView
          next();
        } else {
          // If passToken does not match, redirect to some other route or display an error
          alert("Not Allowed!");
          next("/"); // Redirect to some other route
        }
      },
    },
    {
      path: "/user/forgot-password",
      name: "request-forgot-password",
      component: ForgotPasswordView,
    },
    {
      path: "/order/all",
      name: "all-orders",
      component: AllOrderView,
    },
    {
      path: "/shopping-cart",
      name: "shopping-cart",
      component: ShoppingCartView,
    },
    {
      path: "/user/all-orders",
      name: "user-orders",
      component: UserOrdersView,
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login", "/register", "/user/forgot-password","/user/reset-password"];
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
