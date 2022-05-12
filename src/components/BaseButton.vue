<template>
  <button class="text-white bg-primary rounded py-2.5 px-5 disabled:bg-gray-darker">
    <slot>Base Button</slot>
  </button>
</template>

<script>
  export default {
    name: 'BaseButton',
  };
</script>
