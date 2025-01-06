<script lang="ts" setup>
import { string } from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
setLocale(fr);
import Field from "../../components/form/Field.vue";
</script>

<template>
  <div>
    <h1>Typeparcs</h1>
    <form @submit.prevent="">
      <Field
        label="Email"
        type="email"
        name="email"
        :validator="string().required().email()"
        :validate-on-change="true"
      />

      <Field
        label="Full Name"
        type="text"
        name="fullname"
        :validator="string().required().min(2)"
        :validate-on-change="true"
      />

      <Field
        label="First Name"
        type="text"
        name="Firstname"
        :validator="string().required().min(2)"
      />

      <Field
        label="Password"
        type="password"
        name="password"
        :validator="string().required().min(4)"
        :validate-on-change="true"
      />

      <div class="form-floating">
        <button type="submit" class="btn btn-outline-primary">
          <i class="bi bi-box-arrow-in-right"></i>
          Se connecter
        </button>
      </div>
    </form>
  </div>
</template>
