<template>
  <main class="flex items-center justify-center w-screen min-h-screen bg-black">
    <ContactForm :status="status" @onSubmit="submitContactForm"></ContactForm>
  </main>
</template>

<script>
  import ContactService from './services/ContactService';
  import ContactForm from './components/ContactForm.vue';

  export default {
    name: 'App',
    components: {
      ContactForm,
    },

    data() {
      return {
        status: null,
      };
    },
    methods: {
      submitContactForm(formData) {
        ContactService.createMessage(formData)
          .then(() => {
            this.status = 200;
          })
          .catch(() => {
            this.status = 400;
          });
      },
    },
  };
</script>
