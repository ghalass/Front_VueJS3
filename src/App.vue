<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore()

</script>

<template>

  <header>
    <nav class="navbar navbar-expand-md bg-body-tertiary shadow-sm">
      <div class="container-fluid">

        <RouterLink :to="{ name: 'home' }" class="navbar-brand">
          APP
        </RouterLink>

        <RouterLink :to="{ name: 'create' }" class="nav-link active">
          New Post
        </RouterLink>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">

              <RouterLink :to="{ name: 'home' }" class="nav-link active">
                Home
              </RouterLink>

            </li> -->
            <li v-if="authStore.user" class="nav-item dropdown">

              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <span>Welcome {{ authStore.user.name }}</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li>

                  <form @submit.prevent="authStore.logout">
                    <button class="dropdown-item">Logout</button>
                  </form>

                </li>
              </ul>

            </li>
            <div v-else class="d-flex gap-1">
              <RouterLink :to="{ name: 'login' }" class="nav-link">
                Login
              </RouterLink>
              <RouterLink :to="{ name: 'register' }" class="nav-link">
                Register
              </RouterLink>
            </div>
          </ul>

        </div>
      </div>
    </nav>

  </header>

  <div class="container">
    <RouterView />
  </div>

</template>