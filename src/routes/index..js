import VueRouter from 'vue-router';
import PostComponent from '@/components/body/PostComponent.vue';
import CreatePostComponent from '@/components/body/CreatePostComponent.vue';
import LoginComponent from '@/components/authentication/LoginComponent';
import RegisterComponent from '@/components/authentication/RegisterComponent';
import VerifyEmail from '@/components/authentication/VerifyEmail';
import ResetPassword from '@/components/authentication/ResetPassword';
import AccountService from '@/services/AccountService';

const routes = [

  // authentiocation
  {
    path: '/sign-in',
    name: 'sign-in',
    component: LoginComponent
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: RegisterComponent,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/verify-email', // query email and token
    name: 'verify-email',
    component: VerifyEmail,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/on-reset-password',
    name: 'on-reset-password',
    component: ResetPassword,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/reset-password', // query email and token
    name: 'reset-password',
    component: ResetPassword,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: PostComponent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePostComponent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: CreatePostComponent,
    meta: {
      requiresAuth: true
    }
  }

];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    new AccountService().getCurrent().then(() => {
      next();
    }).catch(() => {
      next({
        path: '/sign-in',
      });
    });
  } else {
    next();
  }
});

export default router;
