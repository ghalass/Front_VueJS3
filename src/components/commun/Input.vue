template
<script setup>
import { Field } from "vee-validate";

const props = defineProps({
  id: String,
  modelValue: [String, Number],
  name: String,
  invalid: Boolean,
  as: {
    type: String,
    default: "input",
  },
  type: {
    type: String,
    default: "text",
  },
});
const emit = defineEmits(["updated:modelValue"]);
</script>
<template>
  <Field
    :as="props.as"
    :id="props.id"
    :name="props.name"
    :type="props.type"
    :value="props.modelValue"
    @input="($event) => emit('updated:modelValue', $event.target.value)"
    :class="['form-control', props.invalid ? 'is-invalid' : '']"
  />
</template>
