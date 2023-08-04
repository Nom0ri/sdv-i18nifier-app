import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory('/sdv-i18nifier-app'),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('./views/HomePage.vue')
    },
    {
      path: '/dialogues',
      name: 'Dialogues',
      component: () => import('./views/DialoguePage.vue')
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('./views/EventPage.vue')
    }
  ]
});