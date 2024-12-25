import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
// import axios from "axios";
import { API } from "@/utils";

// axios.defaults.baseURL = "https://apiposts.ghalass.com"

export const usePostsStore = defineStore('postsStore', {
    state: () => {
        return {
            errors: {},
        }
    },
    actions: {
        /************ Get all posts ************/
        async getAllPosts() {
            const res = await fetch(`${API}/api/posts`);
            const data = await res.json();
            return data

            // const res = await axios.get(`/api/posts`);
            // return res.data;
        },
        /************* Get a post **************/
        async getPost(post) {
            const res = await fetch(`${API}/api/posts/${post}`);
            const data = await res.json();
            return data.post

            // const res = await axios.get(`/api/posts/${post}`);
            // return res.data;
        },
        /************ Create a post ************/
        async createPost(formData) {
            const res = await fetch(`${API}/api/posts`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            // const res = await axios.post(`/api/posts`, { formData });
            // const data = res.data

            if (data.errors) {
                this.errors = data.errors;
            } else {
                this.errors = {};
                this.router.push({ name: 'home' })
            }
        },
        /************ Delete a post ************/
        async deletePost(post) {
            const authStore = useAuthStore()
            if (authStore.user.id === post.user_id) {
                const res = await fetch(`${API}/api/posts/${post.id}`, {
                    method: 'delete',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    this.router.push({ name: 'home' })
                }
                console.log(data);
            } else {
                console.log('Ce post ne vous appartient pas!');
            }
        },
        /************ Update a post ************/
        async updatePost(post, formData) {
            const authStore = useAuthStore()
            if (authStore.user.id === post.user_id) {
                const res = await fetch(`${API}/api/posts/${post.id}`, {
                    method: 'put',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (data.errors) {
                    this.errors = data.errors;
                } else {
                    this.router.push({ name: "home" });
                    this.errors = {}
                }
            } else {
                console.log('Ce post ne vous appartient pas!');
            }
        },
    },
});