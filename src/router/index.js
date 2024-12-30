import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import CreateView from '@/views/Posts/CreateView.vue'
import ShowView from '@/views/Posts/ShowView.vue'
import UpdateView from '@/views/Posts/UpdateView.vue'
import SitesView from '@/views/sites/Index.vue'
import SitesCreate from '@/views/sites/Create.vue'
import SitesEdit from '@/views/sites/Edit.vue'
import SitesDelete from '@/views/sites/Delete.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }, {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true },
    }, {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true },
    }, {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true },
    }, {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { auth: true },
    }, {
      path: '/posts/:id',
      name: 'show',
      component: ShowView,
      meta: { auth: true },
    }, {
      path: '/posts/update/:id',
      name: 'update',
      component: UpdateView,
      meta: { auth: true },
    }, {
      path: '/sites',
      name: 'sites',
      component: SitesView,
      // meta: { auth: true },
    }, {
      path: '/sites/create',
      name: 'sitesCreate',
      component: SitesCreate,
      // meta: { auth: true },
    }, {
      path: '/sites/:id/edit',
      name: 'sitesEdit',
      component: SitesEdit,
      // meta: { auth: true },
    }, {
      path: '/sites/:id/delete',
      name: 'sitesDelete',
      component: SitesDelete,
      // meta: { auth: true },
    },
  ],
})

router.beforeEach(async (to, from) => {

  const authStore = useAuthStore()
  await authStore.getUser()

  if (authStore.user && to.meta.guest) {
    return { name: 'home' }
  }

  if (!authStore.user && to.meta.auth) {
    return { name: 'login' }
  }
})

export default router
