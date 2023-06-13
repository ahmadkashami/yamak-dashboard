const themeRouter=[
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
      resource: 'Tables',
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
  }
]

export default themeRouter
