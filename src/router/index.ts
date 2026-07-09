import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/pages/home/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list/simple',
      name: 'listSimple',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/bills/Lists/TListBase.vue')
    }
  ]
});

export default router;
