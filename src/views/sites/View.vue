<template>
  <div class="card mt-2">
    <div class="card-header">
      Sites

      <RouterLink
        to="/sites/create"
        class="btn btn-sm btn-outline-info float-end"
      >
        Add
      </RouterLink>
    </div>
    <div class="card-body">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Site</th>
            <th scope="col">description</th>
            <th scope="col">created_at</th>
            <th scope="col">updated_at</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="this.sites.length > 0">
          <tr v-for="(site, index) in sites" :key="index">
            <td>{{ site.id }}</td>
            <td>{{ site.name }}</td>
            <td>{{ site.description }}</td>
            <td>{{ site.created_at }}</td>
            <td>{{ site.updated_at }}</td>
            <td class="">
              <div class="d-flex gap-1 float-end">
                <RouterLink
                  :to="{ path: '/sites/' + site.id + '/edit' }"
                  class="btn btn-sm btn-outline-info"
                >
                  Edit
                </RouterLink>

                <button
                  @click="deleteSite(site.id)"
                  class="btn btn-sm btn-outline-danger"
                >
                  Delete
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
</template>

<script>
import axios from "axios";
import { API } from "@/utils";

export default {
  name: "sites",
  data() {
    return { sites: [] };
  },
  mounted() {
    this.getSites();
  },
  methods: {
    getSites() {
      const url = `${API}/sites`;
      axios
        .get(url)
        .then((res) => {
          this.sites = res.data;
          // console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteSite(id) {
      if (confirm("Voulez-vous supprimer ce site?")) {
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
            console.log(res.data);
            this.getSites();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
