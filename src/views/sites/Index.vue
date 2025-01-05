<script setup>
//#region 'IMPORTS'
import ListView from "./ListView.vue";
import ListHeader from "./ListHeader.vue";
import Modal from "./Modal.vue";
//#endregion
</script>

<template>
  <div>
    <!-- TABLE -->
    <div class="card">
      <div class="card-header text-uppercase">
        <ListHeader />
      </div>
      <div class="card-body">
        <ListView />
      </div>
      <!-- PAGINATION -->
      <div class="card-footer">ListPagniation</div>
    </div>
    <!-- MODAL -->
    <Modal />
  </div>
</template>
