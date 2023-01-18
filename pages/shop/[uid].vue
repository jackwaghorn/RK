<template>
  <div><UiProductDetails v-if="tab === 'shop'" /></div>
</template>

<script setup>
const props = defineProps(["tab"]);
</script>

