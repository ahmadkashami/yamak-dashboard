export  const companyRouters= [
  {
    path: '/companies',
    name: 'companies',
    component: () => import('../views/companies/Index.vue'),
    meta: {
      resource: 'Companies',
      action: 'read',
      layout: 'default',
    },
  },
  {
    path: '/companies/:id',
    name: 'company-view',
    component: () => import('../views/companies/View.vue'),
    meta: {
      resource: 'Companies',
      action: 'read',
      layout: 'default',
    },
  },
  {
    path: '/ads',
    name: 'ads',
    component: () => import('../views/advertisements/Index.vue'),
    meta: {
      resource: 'Ads',
      action: 'read',
      layout: 'default',
    },
  }
]
