<script setup>
import { useSitesStore } from "@/stores/sites";
const sitesStore = useSitesStore();
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class=""><i class="bi bi-list"></i> liste des sites</div>

      <div class="d-flex gap-2">
        <button
          @click="sitesStore.selectedSite('', 'create')"
          class="btn btn-sm btn-outline-success"
          :class="{
            disabled: sitesStore.processing,
          }"
        >
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>

    <!-- <div class="d-flex gap-1">
      <input
        v-model="search"
        type="text"
        class="form-control form-control-sm"
        placeholder="Chercher..."
        style="width: 200px"
      />
      <button @click="search = ''" class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-arrow-left"></i>
      </button>
    </div> -->
  </div>
</template>
