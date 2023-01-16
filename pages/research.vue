<template>
  <div class="mt-2" v-if="tab === 'research'">
    <div v-for="(project, index) in research.data.body" :key="index">
      <div v-show="updatedIndex === index">
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
const { data: research } = await useAsyncData("research", () =>
  client.getSingle("research")
);
dataStore.updatePrismicData(research.value);

watch(getCurrentObserved, () => {
  updatedIndex.value = getCurrentObserved.value;
});
</script>
<style scoped>
.title {
  font-weight: 600;
}
</style>
