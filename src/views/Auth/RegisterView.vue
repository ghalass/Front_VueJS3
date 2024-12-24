<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

onMounted(() => errors.value = {})

</script>

<template>
    <main class="container mt-5" style="max-width: 450px;">
        <h1 class="text-center">Register a new account</h1>
        <form @submit.prevent="authenticate('register', formData)">

            <div class="form-floating mb-2">
                <input v-model="formData.name" type="text" class="form-control" id="floatingInputName"
                    placeholder="Nom">
                <label for="floatingInputName">Nom</label>
                <p v-if="errors.name" class="text-danger text-sm fst-italic"><small>{{ errors.name[0] }}</small></p>
            </div>

            <div class="form-floating mb-2">
                <input v-model="formData.email" type="email" class="form-control" id="floatingInputEmail"
                    placeholder="Email">
                <label for="floatingInputEmail">Email</label>
                <p v-if="errors.email" class="text-danger text-sm fst-italic"><small>{{ errors.email[0] }}</small></p>
            </div>

            <div class="form-floating mb-2">
                <input v-model="formData.password" type="password" class="form-control" id="floatingPassword"
                    placeholder="Mot de passe">
                <label for="floatingPassword">Mot de passe</label>
                <p v-if="errors.password" class="text-danger text-sm fst-italic"><small>{{ errors.password[0] }}</small>
                </p>
            </div>

            <div class="form-floating mb-2">
                <input v-model="formData.password_confirmation" type="password" class="form-control"
                    id="floatingPasswordConfirmation" placeholder="Confirmation mot de passe">
                <label for="floatingPasswordConfirmation">Confirmation Mot de passe</label>
            </div>

            <div class="form-floating d-grid mb-2">
                <button class="btn btn-outline-primary">Register</button>
            </div>

        </form>
    </main>
</template>
