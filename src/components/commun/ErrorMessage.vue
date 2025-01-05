<script setup>
const props = defineProps({
  error: String,
  api_error: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <span
    v-if="api_error !== '' || error"
    class="text-danger fst-italic fw-light"
  >
    {{ error ?? api_error }}
  </span>
</template>
