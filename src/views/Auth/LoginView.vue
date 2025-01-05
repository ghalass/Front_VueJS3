<script setup>
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = {}));
</script>

<template>
  <main class="container mt-5" style="max-width: 450px">
    <h1 class="text-center">S'authentifier</h1>
    <form @submit.prevent="authenticate('login', formData)">
      <div class="form-floating mb-2">
        <input
          v-model="formData.email"
          type="email"
          class="form-control"
          id="floatingInputEmail"
          placeholder="Email"
        />
        <label for="floatingInputEmail">
          <i class="bi bi-envelope"></i> Email</label
        >
        <p v-if="errors.email" class="text-danger text-sm fst-italic">
          <small>{{ errors.email[0] }}</small>
        </p>
      </div>

      <div class="form-floating mb-2">
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Mot de passe"
        />
        <label for="floatingPassword"
          ><i class="bi bi-key"></i> Mot de passe</label
        >
        <p v-if="errors.password" class="text-danger text-sm fst-italic">
          <small>{{ errors.password[0] }}</small>
        </p>
      </div>

      <div class="form-floating d-grid mb-2">
        <button class="btn btn-outline-primary">
          <i class="bi bi-box-arrow-in-right"></i>
          Se connecter
        </button>
      </div>

      <p>
        Vous n'avez pas un compte?
        <RouterLink :to="{ name: 'register' }"> Register </RouterLink>
      </p>
      <p>
        Allez à la page d'acceuil
        <RouterLink :to="{ name: 'home' }"> Home </RouterLink>
      </p>
    </form>
  </main>
</template>
