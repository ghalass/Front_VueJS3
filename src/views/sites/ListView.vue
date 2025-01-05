<script setup>
import { onMounted } from "vue";
import { useSitesStore } from "@/stores/sites";
const sitesStore = useSitesStore();

onMounted(() => {
  sitesStore.getAllSites();
});
</script>

<template>
  <table class="table table-sm table-hover">
    <thead>
      <tr>
        <th style="width: 10px">Action</th>
        <th>Site</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody v-if="sitesStore.sites_list.length > 0">
      <tr v-for="(site, index) in sitesStore.sites_list" :key="index">
        <td>
          <div class="d-flex gap-3 float-end mx-2">
            <i
              @click="sitesStore.selectedSite(site, 'delete')"
              role="button"
              class="bi bi-trash text text-sm text-danger pointer-events"
            ></i>

            <i
              @click="sitesStore.selectedSite(site, 'edit')"
              role="button"
              class="bi bi-pencil text text-sm text-info pointer-events"
            ></i>
          </div>
        </td>
        <td>{{ site.name }}</td>
        <td>{{ site.description }}</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr class="text-center">
        <td colspan="6">
          <span
            v-if="sitesStore.processing"
            class="spinner-border spinner-border-sm text-secondary"
            role="status"
            aria-hidden="true"
          ></span>
          Chargement...
        </td>
      </tr>
    </tbody>
  </table>
</template>
