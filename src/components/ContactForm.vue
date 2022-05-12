<template>
  <section class="w-full p-4 bg-black rounded xl:p-8 xl:shadow-xl xl:max-w-xl">
    <h1 class="mb-2 text-2xl font-semibold text-primary">Contact Us!</h1>

    <Form :validation-schema="formSchema" ref="form" @submit="submitForm()" class="flex flex-col" :class="{ 'opacity-50': status === 200 }">
      <BaseInput v-model="formData.name" class="w-full mt-2" type="text" label="Name" placeholder="Your Name" name="name"></BaseInput>

      <BaseInput v-model="formData.email" class="w-full mt-2" type="email" label="E-Mail" placeholder="Your E-Mail" name="email"></BaseInput>

      <BaseInput v-model="formData.subject" class="w-full mt-6" type="text" label="Subject" placeholder="eg. I need a quote" name="subject"></BaseInput>

      <BaseAreaInput v-model="formData.message" class="w-full mt-2" type="text" label="Message" placeholder="Your Message" name="message"></BaseAreaInput>

      <BaseButton type="submit" data-test="submit-button" class="w-full mt-4" :disabled="status === 200">Sent</BaseButton>
    </Form>

    <p v-if="status > 200" class="font-medium text-center mt-6text-xs text-primary"> Something went wrong! Try again later...</p>
    <p v-else-if="status === 200" class="mt-6 text-xs font-medium text-center text-secondary"> Success! Thanks for contacting us...</p>
  </section>
</template>

<script>
  import { Form } from 'vee-validate';
  import { object, string } from 'yup';

  import BaseAreaInput from './BaseAreaInput.vue';
  import BaseInput from './BaseInput.vue';
  import BaseButton from './BaseButton.vue';

  export default {
    name: 'ContactForm',
    emits: ['onSubmit'],

    components: {
      Form,
      BaseButton,
      BaseInput,
      BaseAreaInput,
    },

    props: {
      status: {
        type: Number || null,
        default: null,
      },
    },

    data() {
      return {
        formData: {
          name: '',
          email: '',

          subject: '',
          message: '',
        },

        formSchema: object().shape({
          name: string().min(5, 'Must be at least 5 characters').max(50, 'Must be smaller than 50 characters').required('Name is required'),

          email: string().email('Invalid email').required('Email is required'),
          subject: string().max(100, 'Must be smaller than 100 characters'),

          message: string().min(5, 'Must be at least 5 characters').max(500, 'Must be smaller than 500 characters').required('Message is required'),
        }),
      };
    },
    methods: {
      submitForm() {
        this.$emit('onSubmit', this.formData);
      },
    },
  };
</script>
