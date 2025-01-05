import { defineStore } from "pinia";
import { API } from "@/utils";
import axios from "axios";
import { toast } from "vue3-toastify";

const delay = 500;

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
            reset_form: false,
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
                this.reset()
            else
                this.site = selectedSite

            this.operation = operation;
            this.openModal();
        },
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
                    this.reset()
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
                    this.api_errors.name = "";
                    this.api_errors.description = "";

                    if (error.response) {
                        // 422 : data no valid
                        if (error.response.status === 422) {
                            if (error.response.data.errors.name) {
                                this.api_errors.name = error.response.data.errors.name[0];
                            }
                            if (error.response.data.errors.description) {
                                this.api_errors.description =
                                    error.response.data.errors.description[0];
                            }
                            // 401 : Unauthorized
                        } else if (error.response.status === 401) {
                            console.log(error.response.data.message);

                            this.api_errors.name = error.response.data.message;
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
                    this.reset()
                    this.getAllSites();
                    toast.success("Modifié avec succès !", {
                        autoClose: 2000,
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                })
                .catch((error) => {
                    this.api_errors.name = "";
                    this.api_errors.description = "";

                    if (error.response) {
                        // 422 : data no valid
                        console.log(error.response.status);

                        if (error.response.status === 422) {
                            if (error.response.data.errors.name) {
                                this.api_errors.name = error.response.data.errors.name[0];
                            }
                            if (error.response.data.errors.description) {
                                this.api_errors.description =
                                    error.response.data.errors.description[0];
                            }
                            // 401 : Unauthorized
                        } else if (error.response.status === 401) {
                            console.log(error.response.data.message);

                            this.api_errors.name = error.response.data.message;
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
                    this.reset()
                    this.getAllSites();
                    toast.info("Supprimé avec succès !", {
                        autoClose: 2000,
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        openModal() {
            this.reset_form = true;
            const myModal = new bootstrap.Modal(
                document.getElementById("verticalycentered")
            );
            myModal.show();
        },
        closeModal() {
            // close modal
            const myModal = bootstrap.Modal.getInstance(
                document.getElementById("verticalycentered")
            );
            myModal.hide();
            this.reset()
        },
        reset() {
            this.operation = "create";
            // reset the form, valus and errors
            this.reset_form = false;
            // reset errors
            this.api_errors = {
                name: "",
                description: "",
            };
            // reset form
            this.site = {
                id: "",
                name: "",
                description: "",
            };
        }
    }
})