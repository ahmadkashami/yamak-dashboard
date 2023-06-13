import { createRouter, createWebHistory } from 'vue-router'
import { canNavigate } from '@/plugins/acl/routeProtection'
import themeRouter from '@/router/theme-router'

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
    ...themeRouter,
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
