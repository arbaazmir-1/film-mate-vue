import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import { auth } from './firebase'
import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage.vue'),
    meta: { requiresAuth: false } // set meta field to false as this is a public page
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
    meta: { requiresAuth: true } // set meta field to true as this page requires authentication
  },
  //404 page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { requiresAuth: true } // set meta field to true as this page requires authentication
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// add global navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (to.name === 'LoginPage' && currentUser) {
    next('/home');
  } else {
    next();
  }
});

// redirect to home page if user is already signed in
router.isReady().then(() => {
  auth.onAuthStateChanged(user => {
    if (user) {
      router.push('/home');
    }
  });
});

export default router
