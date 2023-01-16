<template>
  <div class="mt-2" v-if="tab === 'editorial'">
    <div v-for="(project, index) in editorial.data.body" :key="index">
      <div v-if="updatedIndex === index">
        <div class="title mb-2">
          {{ project.primary.title[0].text }}
        </div>
        <prismic-rich-text
          :field="project.primary.description"
        ></prismic-rich-text>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
const dataStore = useDataStore();
const { getCurrentObserved } = storeToRefs(dataStore);
const updatedIndex = ref(0);

const props = defineProps(["tab"]);
const { client } = usePrismic();
const { data: editorial } = await useAsyncData("editorial", () =>
  client.getSingle("editorial")
);

dataStore.updatePrismicData(editorial.value);
watch(getCurrentObserved, () => {
  updatedIndex.value = getCurrentObserved.value;
});
</script>
<style scoped>
.title {
  font-weight: 600;
}
</style>
