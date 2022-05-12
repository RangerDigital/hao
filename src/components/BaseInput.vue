<template>
  <div>
    <label class="block text-sm font-medium text-white" :for="name"> {{ label }}</label>

    <input
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="w-full p-2.5 mt-2 text-sm font-medium text-white bg-gray-darker rounded placeholder-gray-dark"
    />
    <p v-if="errorMessage" class="mt-2 text-xs font-medium text-primary">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
  import { toRef } from 'vue';
  import { useField } from 'vee-validate';

  export default {
    name: 'BaseInput',
    emits: ['update:modelValue'],

    props: {
      label: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },

      // Optional
      modelValue: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        required: false,
        default: 'text',
      },

      placeholder: {
        type: String,
        required: false,
      },
    },

    watch: {
      inputValue(newValue) {
        if (newValue === this.modelValue) {
          return;
        }

        this.$emit('update:modelValue', newValue);
      },
    },

    setup(props) {
      const name = toRef(props, 'name');

      const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
        meta,
      } = useField(name, undefined, {
        initialValue: props.modelValue,
      });

      return {
        handleChange,
        handleBlur,
        errorMessage,
        inputValue,
        meta,
      };
    },
  };
</script>
