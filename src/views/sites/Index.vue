<template>
  <div>
    <!-- TABLE -->
    <div class="card">
      <div class="card-header text-uppercase">
        <div class="d-flex justify-content-between">
          <div class=""><i class="bi bi-list"></i> liste des sites</div>

          <div class="d-flex gap-2">
            <button
              @click="selectSite('', 'create')"
              class="btn btn-sm btn-outline-success"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>

        <div class="d-flex gap-1">
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
        </div>
      </div>
      <div class="card-body">
        <div>
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th style="width: 10px">Action</th>
                <!-- <th style="width: 20px">#ID</th> -->
                <th>Site</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody v-if="sites.length > 0">
              <tr v-for="(site, index) in sites" :key="index">
                <td>
                  <div class="d-flex gap-3 float-end mx-2">
                    <i
                      @click="selectSite(site, 'delete')"
                      role="button"
                      class="bi bi-trash text text-sm text-danger pointer-events"
                    ></i>

                    <i
                      @click="selectSite(site, 'edit')"
                      role="button"
                      class="bi bi-pencil text text-sm text-info pointer-events"
                    ></i>
                  </div>
                </td>
                <!-- <td>{{ site.id }}</td> -->
                <td>{{ site.name }}</td>
                <td>{{ site.description }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="6">
                  <span
                    v-if="processing"
                    class="spinner-border spinner-border-sm text-secondary"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Chargement...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <nav aria-label="Page navigation example">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- MODAL -->
    <div
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
              <span v-if="operation === 'create'"> Ajout</span>
              <span v-if="operation === 'delete'"> Suppression </span>
              <span v-if="operation === 'edit'"> Modification </span>
            </h5>
            <button
              @click="closeModal"
              type="button"
              class="btn-close"
              aria-label="Close"
              :class="{ disabled: processing }"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input
                v-model="site.name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.name !== '' }"
                id="floatingInput"
                placeholder="site name"
              />
              <label for="floatingInput">Site</label>
              <span
                v-if="errors.name !== ''"
                class="text-danger fst-italic fw-light"
              >
                {{ errors.name }}
              </span>
            </div>

            <div class="form-floating mb-3">
              <textarea
                v-model="site.description"
                class="form-control"
                :class="{ 'is-invalid': errors.description !== '' }"
                placeholder="Desc"
                id="floatingTextarea"
              ></textarea>
              <label for="floatingTextarea">Description</label>
              <span
                v-if="errors.description !== ''"
                class="text-danger fst-italic fw-light"
              >
                {{ errors.description }}
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="closeModal"
              class="btn btn-sm btn-outline-secondary"
              :class="{ disabled: processing }"
            >
              Annuler
            </button>
            <button
              @click="soumettre"
              type="button"
              class="btn btn-sm"
              :class="{
                'btn-outline-success': operation === 'create',
                'btn-outline-danger': operation === 'delete',
                'btn-outline-info': operation === 'edit',
                disabled: processing,
              }"
            >
              <span
                v-if="processing"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>

              <span v-if="operation === 'create'">
                <i v-if="!processing" class="bi bi-plus-lg"></i> Ajouter</span
              >
              <span v-if="operation === 'delete'">
                <i v-if="!processing" class="bi bi-trash"></i> Supprimer
              </span>
              <span v-if="operation === 'edit'">
                <i v-if="!processing" class="bi bi-floppy"></i> Modifier
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { API } from "@/utils";

const sites = ref([]);
const site = ref({
  id: "",
  name: "",
  description: "",
});
const search = ref("");
const errors = ref({
  name: "",
  description: "",
});
const operation = ref("");
const delay = 2000; // 0.5 seconds
const processing = ref(false);

onMounted(() => {
  processing.value = true;
  setTimeout(() => {
    getSites();
  }, delay);
});

const getSites = () => {
  const url = `${API}/sites`;

  axios
    .get(url)
    .then((res) => {
      sites.value = res.data;
      processing.value = false;
      // console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectSite = (selectedSite, op) => {
  operation.value = op;
  if (op === "create") {
    site.value = {
      id: "",
      name: "",
      description: "",
    };
  } else {
    site.value = selectedSite;
  }
  openModal();
};

const soumettre = () => {
  processing.value = true;
  setTimeout(() => {
    switch (operation.value) {
      case "create":
        createSite();
        break;
      case "edit":
        updateSite();
        break;
      case "delete":
        deleteSite();
        break;
      default:
        break;
    }
    processing.value = false;
  }, delay);
};

const createSite = () => {
  const url = `${API}/sites`;
  axios
    .post(url, site.value, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      site.value = {
        name: "",
        description: "",
      };
      getSites();
      closeModal();
      toast.success("Ajouté avec succès !", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
        // warn info error success
        // position: toast.POSITION.TOP_CENTER,
        // position: toast.POSITION.TOP_LEFT,
        // position: toast.POSITION.BOTTOM_LEFT,
        // position: toast.POSITION.BOTTOM_CENTER,
        // position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .catch((error) => {
      errors.value.name = "";
      errors.value.description = "";

      if (error.response) {
        // 422 : data no valid
        if (error.response.status === 422) {
          if (error.response.data.errors.name) {
            errors.value.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.description) {
            errors.value.description =
              error.response.data.errors.description[0];
          }
          // 401 : Unauthorized
        } else if (error.response.status === 401) {
          console.log(error.response.data.message);

          errors.value.name = error.response.data.message;
        } else {
          console.log(error.response);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
};

const updateSite = () => {
  const url = `${API}/sites/${site.value.id}`;

  axios
    .put(url, site.value, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      site.value = {
        name: "",
        description: "",
      };
      getSites();
      closeModal();
      toast.success("Modifié avec succès !", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
        // warn info error success
        // position: toast.POSITION.TOP_CENTER,
        // position: toast.POSITION.TOP_LEFT,
        // position: toast.POSITION.BOTTOM_LEFT,
        // position: toast.POSITION.BOTTOM_CENTER,
        // position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .catch((error) => {
      errors.value.name = "";
      errors.value.description = "";

      if (error.response) {
        // 422 : data no valid
        console.log(error.response.status);

        if (error.response.status === 422) {
          if (error.response.data.errors.name) {
            errors.value.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.description) {
            errors.value.description =
              error.response.data.errors.description[0];
          }
          // 401 : Unauthorized
        } else if (error.response.status === 401) {
          console.log(error.response.data.message);

          errors.value.name = error.response.data.message;
        } else {
          console.log(error.response);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
};

const deleteSite = () => {
  const url = `${API}/sites/${site.value.id}`;
  axios
    .delete(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      getSites();
      closeModal();
      toast.info("Supprimé avec succès !", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
        // warn info error success
        // position: toast.POSITION.TOP_CENTER,
        // position: toast.POSITION.TOP_LEFT,
        // position: toast.POSITION.BOTTOM_LEFT,
        // position: toast.POSITION.BOTTOM_CENTER,
        // position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const openModal = () => {
  const myModal = new bootstrap.Modal(
    document.getElementById("verticalycentered")
  );
  myModal.show();
};

const closeModal = () => {
  // set default operation to create
  operation.value = "create";
  // reset form
  site.value = {
    id: "",
    name: "",
    description: "",
  };
  // reset errors
  errors.value = {
    name: "",
    description: "",
  };
  // close modal
  const myModal = bootstrap.Modal.getInstance(
    document.getElementById("verticalycentered")
  );
  myModal.hide();
};
</script>
