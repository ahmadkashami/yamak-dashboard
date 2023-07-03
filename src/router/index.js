import { createRouter, createWebHistory } from 'vue-router'
import { canNavigate } from '@/plugins/acl/routeProtection'
import { companyRouters } from '@/router/companyRouters'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/dashboard.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/users/Index.vue'),
      meta: {
        resource: 'Users',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/app-users',
      name: 'app-users',
      component: () => import('../views/app-users/Index.vue'),
      meta: {
        resource: 'AppUsers',
        action: 'read',
        layout: 'default',
      },
    },
    ...companyRouters
    ,
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/services/Index.vue'),
      meta: {
        resource: 'Services',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/account-settings',
      name: 'account-settings',
      component: () => import('../pages/account-settings.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/typography',
      name: 'typography',
      component: () => import('../pages/typography.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/icons',
      name: 'icons',
      component: () => import('../pages/icons.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../pages/cards.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/tables',
      name: 'tables',
      component: () => import('../pages/tables.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/form-layouts',
      name: 'form-layouts',
      component: () => import('../pages/form-layouts.vue'),
      meta: {
        resource: 'Dashboard',
        action: 'read',
        layout: 'default',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
      meta: {
        resource: 'Public',
        layout: 'blank',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register.vue'),
      meta: {
        resource: 'Public',
        layout: 'blank',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../pages/[...all].vue'),
      meta: {
        resource: 'Public',
        layout: 'blank',
      },
    },

  ],
})


router.beforeEach((to, _, next) => {
  const userData = localStorage.getItem('userData')
  const isLoggedIn = userData && localStorage.getItem('accessToken') && localStorage.getItem('userAbility')

  if (!canNavigate(to)) {
    // Redirect to log in if not logged in
    if (!isLoggedIn) return next({ name: 'login', query: { marketplace: to.query.marketplace } })

    // If logged in => not authorized
    return next({ name: 'error' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next('/')
  }

  return next()
})
export default router
