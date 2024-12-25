import { defineStore } from "pinia";
// import axios from "axios";
import { API } from "@/utils";

// axios.defaults.baseURL = "https://apiposts.ghalass.com"

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
                const res = await fetch(`${API}/api/user`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
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
            const res = await fetch(`${API}/api/${apiRoute}`, {
                method: 'post',
                body: JSON.stringify(formData),
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

            // try {
            //     await axios.post(`/api/${apiRoute}`, formData)
            //     this.errors = {};
            //     localStorage.setItem('token', data.token)
            //     this.user = data.user
            //     this.router.push({ name: 'home' })
            // } catch (error) {
            //     console.log(error);
            //     // A 422 status code indicates that the server 
            //     // was unable to process the request because it contains invalid data
            //     if (error.response.data.errors) {
            //         this.errors = error.response.data.errors;
            //         // console.log(error.response.status);
            //     }
            // }
        },
        /****************** Logout user ******************/
        async logout() {
            const res = await fetch(`${API}/api/logout`, {
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