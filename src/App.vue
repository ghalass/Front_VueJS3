<script setup>
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";
import { toggleBodyClass } from "./utils";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const authStore = useAuthStore();

const toggleBodyClassHandler = () => {
  toggleBodyClass("toggle-sidebar");
};
</script>

<template>
  <div class="">
    <header id="header" class="header fixed-top d-flex align-items-center">
      <div class="d-flex align-items-center justify-content-between">
        <RouterLink
          :to="{ name: 'home' }"
          class="logo d-flex align-items-center"
        >
          <img src="./assets/img/logo.png" alt="logo" />
          <span class="d-none d-lg-block">APP</span>
        </RouterLink>
        <i
          @click="toggleBodyClassHandler"
          class="bi bi-list toggle-sidebar-btn"
        ></i>
      </div>

      <div class="search-bar">
        <form
          class="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>

      <Navbar />
    </header>

    <Sidebar />

    <main id="main" class="main">
      <div class="pagetitle">
        <h1>Blank Page</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item">Pages</li>
            <li class="breadcrumb-item active">Blank</li>
          </ol>
        </nav>
      </div>

      <section class="section">
        <RouterView />
      </section>
    </main>

    <Footer></Footer>
  </div>

  <!-- <header>
    <nav class="navbar navbar-expand-md bg-body-tertiary shadow-sm">
      <div class="container-fluid">
        <RouterLink :to="{ name: 'home' }" class="navbar-brand">
          APP
        </RouterLink>

        <RouterLink :to="{ name: 'create' }" class="nav-link active">
          New Post
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li v-if="authStore.user" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span>Welcome {{ authStore.user.name }}</span>
              </a>

              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <hr class="dropdown-divider" />
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

  <div class="container-fluid">
    <div class="mt-2">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <RouterLink :to="{ name: 'sites' }" class="nav-link active">
            Sites
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link">
            Types parc
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link">
            Parcs
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link">
            Engins
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link">
            Type lubrifiants
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link">
            Lubrifiants
          </RouterLink>
        </li>
      </ul>
    </div>

    <RouterView />
  </div> -->
</template>
