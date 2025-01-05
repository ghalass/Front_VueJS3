<script setup>
const props = defineProps({
  for: String,
  required: Boolean,
});
</script>

<template>
  <label :for="props.for">
    <slot />
    <span v-if="props.required" class="text-danger fst-italic fw-light">*</span>
  </label>
</template>
