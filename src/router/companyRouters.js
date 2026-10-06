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
  },
  {
    path: '/onboardings',
    name: 'onboardings',
    component: () => import('../views/onboardings/Index.vue'),
    meta: {
      resource: 'Onboarding',
      action: 'read',
      layout: 'default',
    },
  },
  {
    path: '/onboardings/:id',
    name: 'onboarding-view',
    component: () => import('../views/onboardings/View.vue'),
    meta: {
      resource: 'Onboarding',
      action: 'read',
      layout: 'default',
    },
  },
]
