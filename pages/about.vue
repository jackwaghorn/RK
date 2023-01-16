<template>
  <div v-if="tab === 'about'">
    <prismic-rich-text :field="about.data.about"></prismic-rich-text>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
const dataStore = useDataStore();
const props = defineProps(["tab"]);

const happyDays = ref("");

const { client } = usePrismic();
const { data: about } = await useAsyncData("data", () =>
  client.getSingle("about")
);

dataStore.updatePrismicData(about.value);
</script>
