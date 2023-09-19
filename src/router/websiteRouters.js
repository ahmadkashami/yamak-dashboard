export const websiteRouters = [
  {
    path: '/websites',
    name: 'websites',
    component: () => import('../views/websites/Index.vue'),
    meta: {
      resource: 'Websites',
      action: 'read',
      layout: 'default',
    },
  },
  {
    path: '/websites/:websiteId/:companyId',
    name: 'website-view',
    component: () => import('../views/websites/View.vue'),
    meta: {
      resource: 'Websites',
      action: 'read',
      layout: 'default',
    },
  },
]
