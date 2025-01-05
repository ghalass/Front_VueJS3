import { defineStore } from "pinia";
import { API } from "@/utils";
import axios from "axios";
import { toast } from "vue3-toastify";

const delay = 2000;

export const useSitesStore = defineStore('sitesStore', {
    state: () => {
        return {
            sites_list: [],
            processing: false,
            operation: '',
            site: {
                id: "",
                name: "",
                description: "",
            },
            api_errors: {
                name: "",
                description: "",
            },
        }
    },
    actions: {
        getAllSites() {
            const url = `${API}/sites`;
            this.processing = true;
            axios
                .get(url)
                .then((res) => {
                    this.sites_list = res.data;
                    this.processing = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        selectedSite(selectedSite, operation) {
            if (operation === "create")
                this.reSetSite();
            else
                this.site = selectedSite

            this.operation = operation;
            this.openModal();
        },
        reSetSite() {
            this.site = {
                id: "",
                name: "",
                description: "",
            };
        }
        ,
        submit() {
            this.processing = true;
            setTimeout(() => {
                switch (this.operation) {
                    case "create":
                        // createSite();
                        this.createSite();
                        break;
                    case "edit":
                        this.updateSite();
                        // updateSite();
                        break;
                    case "delete":
                        this.deleteSite();
                        // deleteSite();
                        break;
                    default:
                        break;
                }
                this.processing = false;
            }, delay);
        },
        createSite() {
            const url = `${API}/sites`;
            axios
                .post(url, this.site, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    this.closeModal();
                    this.reSetSite();
                    this.getAllSites();
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
                    // api_errors.value.name = "";
                    // api_errors.value.description = "";

                    // if (error.response) {
                    //     // 422 : data no valid
                    //     if (error.response.status === 422) {
                    //         if (error.response.data.errors.name) {
                    //             api_errors.value.name = error.response.data.errors.name[0];
                    //         }
                    //         if (error.response.data.errors.description) {
                    //             api_errors.value.description =
                    //                 error.response.data.errors.description[0];
                    //         }
                    //         // 401 : Unauthorized
                    //     } else if (error.response.status === 401) {
                    //         console.log(error.response.data.message);

                    //         api_errors.value.name = error.response.data.message;
                    //     } else {
                    //         console.log(error.response);
                    //     }
                    // } else if (error.request) {
                    //     console.log(error.request);
                    // } else {
                    //     console.log("Error", error.message);
                    // }
                });
        },
        updateSite() {
            const url = `${API}/sites/${this.site.id}`;
            axios
                .put(url, this.site, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    this.closeModal();
                    this.reSetSite();
                    this.getAllSites();
                    toast.success("Modifié avec succès !", {
                        autoClose: 2000,
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                })
                .catch((error) => {
                    // api_errors.value.name = "";
                    // api_errors.value.description = "";

                    // if (error.response) {
                    //     // 422 : data no valid
                    //     console.log(error.response.status);

                    //     if (error.response.status === 422) {
                    //         if (error.response.data.errors.name) {
                    //             api_errors.value.name = error.response.data.errors.name[0];
                    //         }
                    //         if (error.response.data.errors.description) {
                    //             api_errors.value.description =
                    //                 error.response.data.errors.description[0];
                    //         }
                    //         // 401 : Unauthorized
                    //     } else if (error.response.status === 401) {
                    //         console.log(error.response.data.message);

                    //         api_errors.value.name = error.response.data.message;
                    //     } else {
                    //         console.log(error.response);
                    //     }
                    // } else if (error.request) {
                    //     console.log(error.request);
                    // } else {
                    //     console.log("Error", error.message);
                    // }
                });
        },
        deleteSite() {
            const url = `${API}/sites/${this.site.id}`;
            axios
                .delete(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    this.closeModal();
                    this.reSetSite();
                    this.getAllSites();
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
        },
        openModal() {
            const myModal = new bootstrap.Modal(
                document.getElementById("verticalycentered")
            );
            myModal.show();
        },
        closeModal() {
            //   // set default operation to create
            //   operation.value = "create";
            //   // reset form
            //   site.value = {
            //     id: "",
            //     name: "",
            //     description: "",
            //   };
            //   // reset errors
            //   api_errors.value = {
            //     name: "",
            //     description: "",
            //   };
            // close modal
            const myModal = bootstrap.Modal.getInstance(
                document.getElementById("verticalycentered")
            );
            myModal.hide();
            // reset the form, valus and errors
            // resetForm();
        },
    }
})