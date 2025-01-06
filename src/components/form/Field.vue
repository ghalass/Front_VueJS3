<script lang="ts" setup>
import { useField } from "vee-validate";
import { StringSchema } from "yup";
import { computed, ref, toRef } from "vue";
import { v4 as uuidv4 } from "uuid";

interface Props {
  label: string;
  type: "text" | "email" | "password";
  name: string;
  validator?: StringSchema<string> | undefined;
  initialValue?: string | null;
  validateOnChange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  validator: undefined,
  initialValue: null,
  validateOnChange: false,
});

const createUniqueId = computed(() => {
  return `input-${uuidv4()}`;
});

const validateOnChange = toRef(props, "validateOnChange");

const { value, errorMessage, validate } = useField(
  props.name,
  props.validator,
  {
    initialValue: props.initialValue,
    validateOnValueUpdate: validateOnChange.value,
  }
);

const labelClass = ref("");
const inputClass = ref("");

async function handleBlur() {
  if (!validateOnChange.value) {
    const { valid } = await validate();
    if (valid) {
      labelClass.value = "text-success";
      inputClass.value = "is-valid";
    } else {
      labelClass.value = "text-danger";
      inputClass.value = "is-invalid ";
    }
  }
}

async function handleInput() {
  if (validateOnChange.value) {
    const { valid } = await validate();
    if (valid) {
      labelClass.value = "text-success";
      inputClass.value = "is-valid";
    } else {
      labelClass.value = "text-danger";
      inputClass.value = "is-invalid ";
    }
  }
}
</script>
<!--  :class="[inputClass, { 'is-invalid': errorMessage }]" -->
<template>
  <div class="form-floating mb-2">
    <input
      v-model="value"
      :type="props.type"
      :name="props.name"
      :class="[inputClass, 'form-control']"
      :id="createUniqueId"
      :placeholder="props.name"
      @blur="handleBlur"
      @input="handleInput"
    />
    <label :for="createUniqueId" :class="labelClass">
      {{ props.label }}
    </label>
    <small v-if="errorMessage" class="text-danger text-sm fst-italic">
      {{ errorMessage.replace("this", "Ce champs") }}
    </small>
  </div>
</template>
