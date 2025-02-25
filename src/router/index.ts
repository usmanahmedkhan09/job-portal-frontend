import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public-layout',
      component: () => import('@/Layout/PublicLayout.vue'),
      redirect: '/home',
      children: [
        { path: '/home', name: 'home', component: () => import('@/views/Home.vue') },
        { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
        // {path : 'register', name: 'Register', component: () => import('@/views/Register.vue')},
        { path: '/public-profile', name: 'public-profile', component: () => import('@/views/Users/PublicProfile.vue') },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'Dashboard', component: () => import('@/views/Dashboard.vue') },
      ]
    },
    {
      path: '/user-list',
      name: 'users',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'user-list', component: () => import('@/views/Users/Index.vue') },
        { path: '/create-user', name: 'create-user', component: () => import('@/views/Users/Form.vue') },
        { path: '/user-details/:id', name: 'user-details', component: () => import('@/views/Users/Show.vue') },
        { path: '/update-user/:id', name: 'update-user', component: () => import('@/views/Users/Form.vue') },
      ],
    },
    {
      path: '/permission-list',
      name: 'permission-list',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'permissions', component: () => import('@/views/Permissions/Index.vue') },
        { path: '/permission-create', name: 'permission-create', component: () => import('@/views/Permissions/Form.vue') },
        { path: '/permission-update/:id', name: 'permission-update', component: () => import('@/views/Permissions/Form.vue') },
        { path: '/permission-details/:id', name: 'permission-details', component: () => import('@/views/Permissions/Show.vue') },
      ],
    },
    {
      path: '/roles-list',
      name: 'roles-list',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'roles', component: () => import('@/views/Roles/Index.vue') },
        { path: '/create-role', name: 'create-role', component: () => import('@/views/Roles/Form.vue') },
        { path: '/update-role/:id', name: 'role-create', component: () => import('@/views/Roles/Form.vue') },
        { path: '/role-details/:id', name: 'role-details', component: () => import('@/views/Roles/Show.vue') },
      ]
    },
    {
      path: '/jobs-list',
      name: 'jobs-list',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'jobs', component: () => import('@/views/Jobs/Index.vue') },
        { path: '/create-job', name: 'create-job', component: () => import('@/views/Jobs/Form.vue') },
        { path: '/update-job/:id', name: 'job-create', component: () => import('@/views/Jobs/Form.vue') },
        { path: '/job-details/:id', name: 'job-details', component: () => import('@/views/Jobs/Show.vue') },
      ]
    },
    {
      path: '/job-categories',
      name: 'job-categories-list',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'job-categories', component: () => import('@/views/JobsCategories/Index.vue') },
        { path: '/add-job-category', name: 'add-job-category', component: () => import('@/views/JobsCategories/Form.vue') },
        { path: '/update-job-category/:id', name: 'update-job-category', component: () => import('@/views/JobsCategories/Form.vue') },
        { path: '/job-category-details/:id', name: 'job-category-details', component: () => import('@/views/JobsCategories/Show.vue') },
      ]
    },
    {
      path: '/jobs-applications-list',
      name: 'jobs-applications',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'jobs-applications-list', component: () => import('@/views/JobApplications/Index.vue') },
      ]
    },
    {
      path: '/companies-list',
      name: 'companies',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'companies-list', component: () => import('@/views/Companies/Index.vue') },
        { path: '/create-company', name: 'create-company', component: () => import('@/views/Companies/Form.vue') },
      ]
    },
    {
      path: '/company-users-list',
      name: 'users-companies',
      meta: { requiresAuth: true }, // Requires authentication
      component: () => import('@/Layout/MainLayout.vue'),
      children: [
        { path: '', name: 'company-users-list', component: () => import('@/views/Companies/Users/Index.vue') },
        { path: '/create-company-users', name: 'create-company-users', component: () => import('@/views/Companies/Users/Form.vue') },
      ]
    },
  ],
})

export default router
