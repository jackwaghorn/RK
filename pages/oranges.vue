<template>
  <div v-if="tab === 'oranges'">
    <prismic-rich-text :field="oranges.data.text_box"></prismic-rich-text>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
const dataStore = useDataStore();
const { getCurrentObserved } = storeToRefs(dataStore);
const props = defineProps(["tab"]);
const { client } = usePrismic();
const { data: oranges } = await useAsyncData("oranges", () =>
  client.getSingle("oranges")
);
dataStore.updatePrismicData(oranges.value);
</script>
