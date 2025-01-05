import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import CreateView from '@/views/Posts/CreateView.vue'
import ShowView from '@/views/Posts/ShowView.vue'
import UpdateView from '@/views/Posts/UpdateView.vue'
// CONFIGS
import SitesView from '@/views/Sites/Index.vue'
import TypeparcsView from '@/views/Typeparcs/Index.vue'
import ParcsView from '@/views/Parcs/Index.vue'

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
      meta: { guest: true, layout: 'LayoutAdmin' },
    }, {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true, layout: 'LayoutAdmin' },
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
    },

    // CONFIGS
    {
      path: '/configs/sites',
      name: 'sites',
      component: SitesView,
      meta: { auth: true },
    }, {
      path: '/configs/typeparcs',
      name: 'typeparcs',
      component: TypeparcsView,
      // meta: { auth: true },
    }, {
      path: '/configs/parcs',
      name: 'parcs',
      component: ParcsView,
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
