import VueRouter from "vue-router";
import PostComponent from "../components/body/PostComponent copy.vue";
import CreatePostComponent from "../components/body/CreatePostComponent.vue";
import LoginComponent from "../components/authentication/LoginComponent";

const routes = [
  
  // authentiocation
  {
    path: "/login",
    name: "login",
    component: LoginComponent
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
]

const router = new VueRouter({
  mode: "history",
  routes
})  

export default router