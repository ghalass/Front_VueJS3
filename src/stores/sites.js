import { defineStore } from "pinia";
import { API } from "@/utils";

export const useSitesStore = defineStore('sitesStore', {
    state: () => {
        return {
            errors: {}
        }
    },
    actions: {
        /************ Get all sites ************/
        async getAllSites() {
            const res = await fetch(`${API}/api/sites`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            return data
        },
    }
})