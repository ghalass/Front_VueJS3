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
      <div class="card-footer">ListPagniation</div>
    </div>

    <!-- MODAL -->
    <Modal />
    <!-- <div
      class="modal fade"
      id="verticalycentered"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <span v-if="sitesStore.operation === 'create'"> Ajout</span>
              <span v-if="sitesStore.operation === 'delete'">
                Suppression
              </span>
              <span v-if="sitesStore.operation === 'edit'"> Modification </span>
            </h5>
            <button
              @click="sitesStore.closeModal"
              type="button"
              class="btn-close"
              aria-label="Close"
              :class="{ disabled: sitesStore.processing }"
            ></button>
          </div>
          <form @submit="submitForm">
            <div class="modal-body">
              <div class="form-floating mb-3">
                <Field
                  name="name"
                  v-model="sitesStore.site.name"
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': api_errors.name !== '' || errors.name,
                  }"
                  id="floatingInput"
                  placeholder="site name"
                />
                <label for="floatingInput">Site</label>
                <span
                  v-if="api_errors.name !== '' || errors.name"
                  class="text-danger fst-italic fw-light"
                >
                  {{ errors.name ?? api_errors.name }}
                </span>
              </div>

              <div class="form-floating mb-3">
                <Field
                  as="textarea"
                  name="description"
                  v-model="sitesStore.site.description"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      api_errors.description !== '' || errors.description,
                  }"
                  placeholder="Desc"
                  id="floatingTextarea"
                  rows="4"
                  style="height: 100%"
                />
                <label for="floatingTextarea">Description</label>
                <span
                  v-if="api_errors.description !== '' || errors.description"
                  class="text-danger fst-italic fw-light"
                >
                  {{ errors.description ?? api_errors.description }}
                </span>
              </div>
            </div>
            <div class="modal-footer">
              <button
                @click="sitesStore.closeModal"
                type="button"
                class="btn btn-sm btn-outline-secondary"
                :class="{ disabled: sitesStore.processing }"
                aria-label="Close"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="btn btn-sm"
                :class="{
                  'btn-outline-success': sitesStore.operation === 'create',
                  'btn-outline-danger': sitesStore.operation === 'delete',
                  'btn-outline-info': sitesStore.operation === 'edit',
                  disabled: sitesStore.processing,
                }"
              >
                <span
                  v-if="sitesStore.processing"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>

                <span v-if="sitesStore.operation === 'create'">
                  <i v-if="!sitesStore.processing" class="bi bi-plus-lg"></i>
                  Ajouter</span
                >
                <span v-if="sitesStore.operation === 'delete'">
                  <i v-if="!sitesStore.processing" class="bi bi-trash"></i>
                  Supprimer
                </span>
                <span v-if="sitesStore.operation === 'edit'">
                  <i v-if="!sitesStore.processing" class="bi bi-floppy"></i>
                  Modifier
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { useSitesStore } from "@/stores/sites";
const sitesStore = useSitesStore();

//#region 'IMPORTS'
import "vue3-toastify/dist/index.css";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import ListView from "./ListView.vue";
import ListHeader from "./ListHeader.vue";
import { ref } from "vue";
import Modal from "./Modal.vue";
setLocale(fr);
//#endregion

//#region 'VALIDATION'
// Define the form validation schema
// const schema = yup.object().shape({
//   name: yup.string().required().min(2),
//   description: yup.string().required().min(2),
// });

// // Use the useForm hook for validation
// const { errors, handleSubmit, resetForm, setErrors } = useForm({
//   validationSchema: schema,
// });

// // Handle form submission
// const submitForm = handleSubmit((values) => {
//   soumettre();
// });
//#endregion

//#region 'VARIABLES'
// const delay = 2000; // 0.5 seconds
// const processing = ref(false);

// const api_errors = ref({
//   name: "",
//   description: "",
// });
//#endregion

//#region 'METHODS'
// const soumettre = () => {
//   // processing.value = true;
//   sitesStore.processing = true;
//   setTimeout(() => {
//     switch (sitesStore.operation) {
//       case "create":
//         // createSite();
//         sitesStore.createSite();
//         break;
//       case "edit":
//         sitesStore.updateSite();
//         // updateSite();
//         break;
//       case "delete":
//         sitesStore.deleteSite();
//         // deleteSite();
//         break;
//       default:
//         break;
//     }
//     // processing.value = false;
//     sitesStore.processing = false;
//   }, delay);
// };
//#endregion
</script>
