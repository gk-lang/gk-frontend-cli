import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('../views/SelectTemplate.vue'),
    },
    {
      path: '/selectTemplate',
      name: 'selectTemplate',
      component: () => import('../views/SelectTemplate.vue'),
    },
    {
      path: '/selectDirectory',
      name: 'selectDirectory',
      component: () => import('../views/SelectDirectory.vue'),
    },
    {
      path: '/inputProject',
      name: 'inputProject',
      component: () => import('../views/InputProject.vue'),
    },
  ],
})

export default router
