<script setup>
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const { errors } = storeToRefs(usePostsStore());
const { createPost } = usePostsStore()

const formData = reactive({
    title: '',
    body: '',
});

</script>

<template>
    <main class="container mt-5" style="max-width: 450px;">
        <h1 class="text-center">Create a new post</h1>
        <form @submit.prevent="createPost(formData)">

            <div class="form-floating mb-2">
                <input v-model="formData.title" type="text" class="form-control" id="floatingInputTitle"
                    placeholder="Title" :class="{ 'is-invalid': errors.title }">
                <label for="floatingInputTitle">Title</label>
                <p v-if="errors.title" class="text-danger text-sm fst-italic"><small>{{ errors.title[0] }}</small></p>
            </div>

            <div class="form-floating mb-2">
                <textarea v-model="formData.body" class="form-control" id="floatingTextareaBody" style="height: 100px"
                    placeholder="Post body" :class="{ 'is-invalid': errors.body }"></textarea>
                <label for="floatingTextareaBody">Post body</label>
                <p v-if="errors.body" class="text-danger text-sm fst-italic"><small>{{ errors.body[0] }}</small>
                </p>
            </div>

            <div class="form-floating d-grid mb-2">
                <button class="btn btn-outline-primary">
                    Create
                </button>
            </div>

        </form>
    </main>
</template>