<template>
  <div class="container-fluid pt-5">
    <div class="row">
      <div
        v-for="(image, index) in getPrismicData.data.gallery"
        :key="index"
        class="col-12 pb-5 d-flex justify-content-center"
      >
        <img class="img-fluid" :src="image.image.url" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
const dataStore = useDataStore();
const { getPrismicData } = storeToRefs(dataStore);
</script>

