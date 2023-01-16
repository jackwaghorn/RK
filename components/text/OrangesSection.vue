<template>
  <div v-if="tab === 'oranges'">

    <prismic-rich-text :field="oranges.data.text_box"></prismic-rich-text>
  </div>
</template>
<script setup>
const props = defineProps(["tab"]);
const { client } = usePrismic();
const { data: oranges } = await useAsyncData("oranges", () =>
  client.getSingle("oranges")
);
</script>
