<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { getPost, deletePost } = usePostsStore()
const authStore = useAuthStore()
const post = ref(null)
const route = useRoute()

onMounted(async () => (post.value = await getPost(route.params.id)))

</script>

<template>
    <h1>Show</h1>

    <div v-if="post">
        <h3>{{ post.id }}</h3>
        <h4>{{ post.title }}</h4>
        <h5>{{ post.body }}</h5>
        <h6>{{ post.user.name }}</h6>


        <div v-if="authStore.user && authStore.user.id === post.user_id" class="d-flex gap-1">
            <form @submit.prevent="deletePost(post)">
                <button class="btn btn-sm btn-outline-danger">
                    Delete
                </button>
            </form>

            <RouterLink :to="{ name: 'update', params: { id: post.id } }" class="btn btn-sm btn-outline-success">
                Update
            </RouterLink>
        </div>


        <td></td>
    </div>
    <div v-else>
        Post Not Found!
    </div>

</template>