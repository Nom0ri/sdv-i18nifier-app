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
    },
    {
      path: '/howto',
      name: 'HowTo',
      component: () => import('./views/IntructionsPage.vue')
    },
    {
      path: '/quests',
      name: 'Quests',
      component: () => import('./views/QuestPage.vue')
    },
    {
      path: '/movies',
      name: 'Movies',
      component: () => import('./views/MoviePage.vue')
    },
    {
      path: '/objects',
      name: 'Objects',
      component: () => import('./views/ObjectPage.vue')
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('./views/RecipePage.vue')
    },
    {
      path: '/gift',
      name: 'Gift',
      component: () => import('./views/GiftPage.vue')
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import('./views/ConfigPage.vue')
    },
        {
      path: '/furniture',
      name: 'Furniture',
      component: () => import('./views/FurniturePage.vue')
    },
  ]
});