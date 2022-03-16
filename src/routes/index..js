import VueRouter from "vue-router";
import PostComponent from "@/components/body/PostComponent.vue";
import CreatePostComponent from "@/components/body/CreatePostComponent.vue";
import LoginComponent from "@/components/authentication/LoginComponent";
import RegisterComponent from "@/components/authentication/RegisterComponent";
import VerifyEmail from "@/components/authentication/VerifyEmail";
import ResetPassword from '@/components/authentication/ResetPassword'

const routes = [

  // authentiocation
  {
    path: "/sign-in",
    name: "sign-in",
    component: LoginComponent
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: RegisterComponent
  },
  {
    path: "/verify-email", // query email and token
    name: "verify-email",
    component: VerifyEmail
  },
  {
    path: "/on-reset-password",
    name: "on-reset-password",
    component: ResetPassword
  },
  {
    path: "/reset-password", // query email and token
    name: "reset-password",
    component: ResetPassword
  },
  {
    path: "/",
    name: "home",
    component: PostComponent
  },
  {
    path: "/create",
    name: "create",
    component: CreatePostComponent
  },
  {
    path: "/about",
    name: "about",
    component: CreatePostComponent
  }

]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
