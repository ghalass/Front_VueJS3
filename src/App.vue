<script setup>
import LayoutAdmin from "@/components/LayoutAdmin.vue";
</script>

<template>
  <LayoutAdmin v-if="!$route.meta.layout">
    <RouterView />
  </LayoutAdmin>
  <div v-else>
    <RouterView />
  </div>
</template>
