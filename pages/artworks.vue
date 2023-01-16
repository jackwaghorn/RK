<template>
  <div v-if="tab === 'artworks'">
    <prismic-rich-text :field="artworks.data.text_box"></prismic-rich-text>
  </div>
</template>
<script setup>
const props = defineProps(["tab"]);
import { useDataStore } from "~/stores/store";
const dataStore = useDataStore();
const { client } = usePrismic();
const { data: artworks } = await useAsyncData("artworks", () =>
  client.getSingle("artworks")
);
dataStore.updatePrismicData(artworks.value);
</script>
