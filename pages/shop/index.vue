<template>
  <div v-if="tab === 'shop'">This is my shop</div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
const dataStore = useDataStore();
const props = defineProps(["tab"]);

const { client } = usePrismic();
const { data: products } = await useAsyncData("products", () =>
  client.getAllByType("product")
);
dataStore.updatePrismicData(products.value);
</script>
