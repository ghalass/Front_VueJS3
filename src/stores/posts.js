import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { API } from "@/utils";

export const usePostsStore = defineStore('postsStore', {
    state: () => {
        return {
            errors: {},
        }
    },
    actions: {
        /************ Get all posts ************/
        async getAllPosts() {
            const res = await fetch(`${API}/posts`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            return data
        },
        /************* Get a post **************/
        async getPost(post) {
            const res = await fetch(`${API}/posts/${post}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            return data.post
        },
        /************ Create a post ************/
        async createPost(formData) {
            const res = await fetch(`${API}/posts`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
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
                const res = await fetch(`${API}/posts/${post.id}`, {
                    method: 'delete',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
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
                const res = await fetch(`${API}/posts/${post.id}`, {
                    method: 'put',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
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