<template>
  <div class="row">
    <!-- TABLE -->
    <div class="col-sm-8">
      <div class="card mt-2">
        <div class="card-header text-uppercase">
          <i class="bi bi-list"></i>
          liste des sites

          <!-- <RouterLink
          to="/sites/create"
          class="btn btn-sm btn-outline-info float-end"
        >
          Add
        </RouterLink> -->

          <button
            @click="selectSite(site, 'create')"
            class="btn btn-sm btn-outline-info float-end"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        <div class="card-body">
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Site</th>
                <th scope="col">description</th>
                <!-- <th scope="col">created_at</th>
              <th scope="col">updated_at</th> -->
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-if="sites.length > 0">
              <tr v-for="(site, index) in sites" :key="index">
                <td>{{ site.id }}</td>
                <td>{{ site.name }}</td>
                <td>{{ site.description }}</td>
                <!-- <td>{{ site.created_at }}</td>
              <td>{{ site.updated_at }}</td> -->
                <td class="">
                  <div class="d-flex gap-1 float-end">
                    <!-- <RouterLink
                    :to="{ path: '/sites/' + site.id + '/edit' }"
                    class="btn btn-sm btn-outline-info"
                  >
                    Edit
                  </RouterLink> -->

                    <!-- <button
                    @click="deleteSite(site.id)"
                    class="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button> -->

                    <button
                      @click="selectSite(site, 'edit')"
                      class="btn btn-sm btn-outline-info"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      @click="selectSite(site, 'delete')"
                      class="btn btn-sm btn-outline-danger"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="6">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- CRUD CARD -->
    <div class="col-sm-4">
      <div v-if="operation !== ''" class="card mt-2">
        <div class="card-header text-uppercase">
          <i class="bi bi-align-self-start"></i>
          créer/modifier un SITE
        </div>

        <!-- EDIT/CREATE -->
        <div class="card-body">
          <div v-if="operation !== 'delete'">
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
              <span v-if="errors.name !== ''" class="text-danger fst-italic">
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
                class="text-danger fst-italic"
              >
                {{ errors.description }}
              </span>
            </div>

            <div class="d-flex gap-1 float-end">
              <!-- <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button> -->

              <button
                @click="selectSite(site, '')"
                class="btn btn-sm btn-outline-success"
              >
                Annuler
              </button>
              <button
                @click="save"
                type="button"
                class="btn btn-sm btn-outline-primary"
              >
                <i class="bi bi-floppy"></i>
                Save
              </button>
            </div>
          </div>

          <!-- SUPPRSSION -->
          <div v-else>
            <div class="">
              <h6 class="text-danger d-inline">
                <i class="bi bi-trash"></i> Voulez-vous supprimer le site
                <span class="text-bg-info px-2">{{ site.name }}</span> ?
              </h6>
            </div>
            <div class="d-flex gap-2 mt-1">
              <button
                @click="selectSite(site, '')"
                class="btn btn-sm btn-outline-success"
              >
                Non
                <i class="bi bi"></i>
              </button>
              <button
                @click="deleteSite(site.id)"
                class="btn btn-sm btn-outline-danger"
              >
                <i class="bi bi-trash"></i>
                Oui
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { API } from "@/utils";
import axios from "axios";

import { onMounted, ref } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const sites = ref([]);
const site = ref({
  id: "",
  name: "",
  description: "",
});
const errors = ref({
  name: "",
  description: "",
});
const operation = ref("");

onMounted(() => {
  getSites();
});

const getSites = () => {
  const url = `${API}/sites`;
  axios
    .get(url)
    .then((res) => {
      sites.value = res.data;
      // console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectSite = (selectedSite, op) => {
  operation.value = op;
  if (op !== "") {
    site.value = selectedSite;
  } else {
    site.value = {
      name: "",
      description: "",
    };
  }
};

const save = () => {
  if (site.value.id === "") createSite();
  else updateSite();
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
      errors.value.name = "";
      errors.value.description = "";
      selectSite(site, "");
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
        if (error.response.status === 422) {
          if (error.response.data.errors.name) {
            errors.value.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.description) {
            errors.value.description =
              error.response.data.errors.description[0];
          }
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
      errors.value.name = "";
      errors.value.description = "";
      selectSite(site, "");

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
        if (error.response.status === 422) {
          if (error.response.data.errors.name) {
            errors.value.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.description) {
            errors.value.description =
              error.response.data.errors.description[0];
          }
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

const deleteSite = (id) => {
  const url = `${API}/sites/${id}`;
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
      selectSite(site, "");
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
</script>
