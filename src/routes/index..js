import VueRouter from "vue-router";
import PostComponent from "../components/body/PostComponent copy.vue";
import CreatePostComponent from "../components/body/CreatePostComponent.vue";
import LoginComponent from "../components/authentication/LoginComponent";
import RegisterComponent from "../components/authentication/RegisterComponent";

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
    path: "/",
    name: "home",
    component: PostComponent
  },
  {
    path: "/create",
    name: "create",
    component: CreatePostComponent
  }

]

const router = new VueRouter({
  mode: "history",
  routes
})  

export default router