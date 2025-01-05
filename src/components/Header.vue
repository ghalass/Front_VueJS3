<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <RouterLink :to="{ name: 'home' }" class="logo d-flex align-items-center">
        <img src="@/assets/img/logo.png" alt="logo" />
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
</template>

<script setup>
import { toggleBodyClass } from "@/utils";
import Navbar from "@/components/Navbar.vue";

const toggleBodyClassHandler = () => {
  toggleBodyClass("toggle-sidebar");
};
</script>
