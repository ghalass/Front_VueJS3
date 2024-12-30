<template>
  <div class="card mt-2">
    <div class="card-header">
      CREATE SITE

      <RouterLink to="/sites" class="btn btn-sm btn-outline-info float-end">
        Liste
      </RouterLink>
    </div>
    <div class="card-body">
      <div class="form-floating mb-3">
        <input
          v-model="model.site.name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': this.errorsList.name !== '' }"
          id="floatingInput"
          placeholder="site name"
        />
        <label for="floatingInput">Site</label>
        <span v-if="this.errorsList.name !== ''" class="text-danger fst-italic">
          {{ this.errorsList.name }}
        </span>
      </div>

      <div class="form-floating mb-3">
        <textarea
          v-model="model.site.description"
          class="form-control"
          :class="{ 'is-invalid': this.errorsList.description !== '' }"
          placeholder="Desc"
          id="floatingTextarea"
        ></textarea>
        <label for="floatingTextarea">Description</label>
        <span
          v-if="this.errorsList.description !== ''"
          class="text-danger fst-italic"
        >
          {{ this.errorsList.description }}
        </span>
      </div>

      <div class="d-flex gap-1 float-end">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          @click="saveSite"
          type="button"
          class="btn btn-sm btn-outline-primary"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "siteCreate",
  data() {
    return {
      errorsList: {
        name: "",
        description: "",
      },
      model: {
        site: {
          name: "",
          description: "",
        },
      },
    };
  },
  methods: {
    saveSite() {
      var mythis = this;
      const url = "http://127.0.0.1:8000/api/sites";

      axios
        .post(url, this.model.site, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.model.site = {
            name: "",
            description: "",
          };
          console.log(res.data);
          mythis.errorsList.name = "";
          mythis.errorsList.description = "";
        })
        .catch((error) => {
          mythis.errorsList.name = "";
          mythis.errorsList.description = "";

          if (error.response) {
            if (error.response.status === 422) {
              // mythis.errorsList = error.response.data.errors;
              if (error.response.data.errors.name) {
                mythis.errorsList.name = error.response.data.errors.name[0];
              }
              if (error.response.data.errors.description) {
                mythis.errorsList.description =
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

          // console.log(mythis.errorsList);
        });
    },
  },
};
</script>
