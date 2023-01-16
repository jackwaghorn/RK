<template>
  <div>
    <prismic-rich-text :field="about.data.about"></prismic-rich-text>
  </div>
</template>
<script setup>
const props = defineProps(["tab"]);
const { client } = usePrismic();
const { data: about } = await useAsyncData("data", () =>
  client.getSingle("about")
);
</script>
