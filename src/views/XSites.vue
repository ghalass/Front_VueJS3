<script setup>
import ModalComponent from "@/components/ModalComponent.vue";
import { useSitesStore } from "@/stores/sites";
import { Modal } from "bootstrap";
import { onMounted, ref } from "vue";

const { getAllSites } = useSitesStore();
const sites = ref([]);

onMounted(async () => {
  sites.value = await getAllSites();
});

/***MODAL */
const showPopup = () => {
  const myModal = new Modal(document.getElementById("staticBackdrop"));
  myModal.show();
};

const doSomthing = () => {
  console.log("doSomthing function start");
  const myModal = Modal.getInstance(document.getElementById("staticBackdrop"));
  myModal.hide();
};

/** */
const modalProps = ref({
  title: "",
  op: "",
});
</script>

<template>
  <main>
    <!-- MODAL -->
    <ModalComponent @dosomething-click="doSomthing" :modalProps="modalProps">
      <div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
      </div>
    </ModalComponent>

    <!-- TABLE -->
    <h1>Sites <i class="bi bi-3-circle"></i></h1>
    <div v-if="sites.length > 0">
      <table class="table table-hover table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Site</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="site in sites" :key="site.id">
            <td>{{ site.id }}</td>
            <td>{{ site.name }}</td>
            <td class="d-flex justify-content-end gap-1">
              <button
                @click="showPopup"
                type="button"
                class="btn btn-sm btn-outline-secondary"
              >
                E
              </button>

              <button class="btn btn-sm btn-outline-danger">D</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucun post n'est trouvé!</p>
    </div>

    <!-- Modal -->
  </main>
</template>
