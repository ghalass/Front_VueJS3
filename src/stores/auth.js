import { defineStore } from "pinia";
import { API } from "@/utils";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            errors: {},
        }
    },
    actions: {
        /************ Get Authenticated user ************/
        async getUser() {
            if (localStorage.getItem('token')) {
                const res = await fetch(`${API}/user`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json()
                if (res.ok) {
                    this.user = data
                }
            }
        },
        /************ Login Or Register user ************/
        async authenticate(apiRoute, formData) {
            const res = await fetch(`${API}/${apiRoute}`, {
                method: 'post',
                body: JSON.stringify(formData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            if (data.errors) {
                this.errors = data.errors;
            } else {
                this.errors = {};
                localStorage.setItem('token', data.token)
                this.user = data.user
                this.router.push({ name: 'home' })
            }
        },
        /****************** Logout user ******************/
        async logout() {
            const res = await fetch(`${API}/logout`, {
                method: 'post',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                this.user = null
                this.errors = {};
                localStorage.removeItem('token')
                this.router.push({ name: 'home' })
            }
        },
    },
});