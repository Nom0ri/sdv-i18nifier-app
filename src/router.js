import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
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
    }
  ]
})