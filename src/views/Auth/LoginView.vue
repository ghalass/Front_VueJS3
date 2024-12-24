<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
    email: '',
    password: '',
});

onMounted(() => errors.value = {})

</script>

<template>
    <main class="container mt-5" style="max-width: 450px;">
        <h1 class="text-center">Login to your account</h1>
        <form @submit.prevent="authenticate('login', formData)">

            <div class="form-floating mb-2">
                <input v-model="formData.email" type="email" class="form-control" id="floatingInputEmail">
                <label for="floatingInputEmail">Email</label>
                <p v-if="errors.email" class="text-danger text-sm fst-italic"><small>{{ errors.email[0] }}</small></p>
            </div>

            <div class="form-floating mb-2">
                <input v-model="formData.password" type="password" class="form-control" id="floatingPassword">
                <label for="floatingPassword">Mot de passe</label>
                <p v-if="errors.password" class="text-danger text-sm fst-italic"><small>{{ errors.password[0] }}</small>
                </p>
            </div>

            <div class="form-floating d-grid mb-2">
                <button class="btn btn-outline-primary">Login</button>
            </div>

        </form>
    </main>
</template>
