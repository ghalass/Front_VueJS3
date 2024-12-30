<template>
  <div class="card mt-2">
    <div class="card-header">
      EDIT SITE

      <RouterLink to="/sites" class="btn btn-sm btn-outline-info float-end">
        Liste
      </RouterLink>
    </div>
    <div class="card-body">
      <p class="text-danger">Voulez-vous supprimer ce site?</p>
      <p>{{ model.site.name }}</p>

      <div class="d-flex gap-1 float-end">
        <button
          @click="deleteSite"
          type="button"
          class="btn btn-sm btn-outline-danger"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "@/utils";
export default {
  name: "siteEdit",
  data() {
    return {
      siteId: "",
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
  mounted() {
    const id = this.$route.params.id;
    this.siteId = id;
    this.getSite(id);
  },
  methods: {
    getSite(id) {
      var mythis = this;
      const url = `${API}/sites/${id}`;

      axios
        .get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.model.site = res.data.site;
          // console.log(this.model.site);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              console.log(error.response.data.message);
              alert(error.response.data.message);
            } else {
              console.log(error.response);
            }
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    deleteSite() {
      var mythis = this;
      const url = `${API}/sites/${this.siteId}`;

      axios
        .delete(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
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
