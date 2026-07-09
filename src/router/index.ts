import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/HomePage.vue')
    },
    {
      path: '/list/simple',
      name: 'listSimple',
      component: () => import('@/pages/bills/Lists/TListBase.vue')
    },
    {
      path: '/list/table',
      name: 'listTable',
      component: () => import('@/pages/bills/Lists/TListTable.vue')
    },
    {
      path: '/view/form',
      name: 'viewForm',
      component: () => import('@/pages/bills/Views/TForm.vue')
    },
    {
      path: '/view/detail',
      name: 'viewDetail',
      component: () => import('@/pages/bills/Views/TDetail.vue')
    },
    {
      path: '/biz/contract',
      name: 'bizContract',
      component: () => import('@/pages/bills/Biz/TContract.vue')
    },
    {
      path: '/biz/process-design',
      name: 'bizProcessDesign',
      component: () => import('@/pages/bills/Biz/TProcessDesign.vue')
    },
    {
      path: '/report/sales',
      name: 'reportSales',
      component: () => import('@/pages/bills/Report/TSalesReport.vue')
    },
    {
      path: '/report/products',
      name: 'reportProducts',
      component: () => import('@/pages/bills/Report/TProductsReport.vue')
    },
    {
      path: '/report/analysis',
      name: 'reportAnalysis',
      component: () => import('@/pages/bills/Report/TAnalysisReport.vue')
    },
    {
      path: '/sys/org/organization',
      name: 'sysOrgOrganization',
      component: () => import('@/pages/bills/Sys/TOrganization.vue')
    },
    {
      path: '/sys/org/employee',
      name: 'sysOrgEmployee',
      component: () => import('@/pages/bills/Sys/TEmployee.vue')
    },
    {
      path: '/sys/org/users',
      name: 'sysOrgUsers',
      component: () => import('@/pages/bills/Sys/TUsers.vue')
    },
    {
      path: '/sys/org/reminder',
      name: 'sysOrgReminder',
      component: () => import('@/pages/bills/Sys/TReminder.vue')
    },
    {
      path: '/sys/log/audit',
      name: 'sysLogAudit',
      component: () => import('@/pages/bills/Sys/TLogAudit.vue')
    },
    {
      path: '/sys/profile/user',
      name: 'sysProfileUser',
      component: () => import('@/pages/bills/Sys/TUserProfile.vue')
    }
  ]
});

export default router;