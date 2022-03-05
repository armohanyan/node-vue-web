import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router';
import router from "./routes/index.";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vuelidate from 'vuelidate';
import store from "./store";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);  
Vue.use(VueRouter);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  store, 
  router,
  render: h => h(App),
}).$mount('#app')
