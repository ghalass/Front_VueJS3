<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <RouterLink
          :to="{ name: 'home' }"
          class="nav-link"
          :class="{ collapsed: $route.path !== '/' }"
        >
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </RouterLink>
      </li>
      <!-- End Dashboard Nav -->

      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ collapsed: !$route.path.startsWith('/configs') }"
          data-bs-target="#components-nav"
          data-bs-toggle="collapse"
          href="#"
        >
          <i class="bi bi-menu-button-wide"></i><span>Configs</span
          ><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul
          id="components-nav"
          class="nav-content collapse"
          :class="{ show: $route.path.startsWith('/configs') }"
          data-bs-parent="#sidebar-nav"
        >
          <li>
            <RouterLink
              :to="{ name: 'sites' }"
              :class="{ active: $route.path === '/configs/sites' }"
            >
              <i class="bi bi-circle"></i><span>Sites</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'typeparcs' }"
              :class="{ active: $route.path === '/configs/typeparcs' }"
            >
              <i class="bi bi-circle"></i><span>Typeparcs</span>
            </RouterLink>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <a
          class="nav-link collapsed"
          data-bs-target="#icons-nav"
          data-bs-toggle="collapse"
          href="#"
        >
          <i class="bi bi-gem"></i><span>Icons</span
          ><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul
          id="icons-nav"
          class="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          <li>
            <a href="#">
              <i class="bi bi-circle"></i><span>Bootstrap Icons</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="bi bi-circle"></i><span>Remix Icons</span>
            </a>
          </li>
          <li>
            <a href="#"> <i class="bi bi-circle"></i><span>Boxicons</span> </a>
          </li>
        </ul>
      </li>
      <!-- End Icons Nav -->

      <li class="nav-heading">Pages</li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <i class="bi bi-person"></i>
          <span>Profile</span>
        </a>
      </li>
      <!-- End Profile Page Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="#">
          <i class="bi bi-envelope"></i>
          <span>Contact</span>
        </a>
      </li>
      <!-- End Contact Page Nav -->

      <li class="nav-item">
        <!-- <a class="nav-link collapsed" href="pages-register.html">
          <i class="bi bi-card-list"></i>
          <span>Register</span>
        </a> -->

        <RouterLink
          :to="{ name: 'register' }"
          class="nav-link"
          :class="{ collapsed: $route.path !== '/register' }"
        >
          <i class="bi bi-card-list"></i>
          <span>Register</span>
        </RouterLink>
      </li>
      <!-- End Register Page Nav -->

      <li class="nav-item">
        <RouterLink
          :to="{ name: 'login' }"
          class="nav-link"
          :class="{ collapsed: $route.path !== '/login' }"
        >
          <i class="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </RouterLink>
      </li>
      <!-- End Login Page Nav -->
    </ul>
  </aside>
</template>
