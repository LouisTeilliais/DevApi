import { LocalStorage, SessionStorage } from 'quasar'

const isAuthenticated = async (to, from) => {
  const isAuthenticated = LocalStorage.getItem('token') || SessionStorage.getItem('token')
  if (!isAuthenticated && to.name !== 'homepage') {
    return { name: 'homepage' }
  } else {
    return { name: 'dashboard' }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'tuto', name: 'tuto', component: () => import('pages/TutoPage.vue') },
      // { path: 'tuto/:id', name: 'tuto-params', component: () => import('src/pages/TutoPage.vue') },
      { path: 'login', name: 'logIn', component: () => import('src/components/Auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('src/components/Auth/RegisterPage.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/components/Dashboard/DashboardPage.vue') }
    ],
    beforeEnter: isAuthenticated
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
