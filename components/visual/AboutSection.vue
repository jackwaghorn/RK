<template>
  <div class="container-fluid pt-5 mt-2 mt-md-0">
    <div class="row">
      <div class="col-12 d-block d-md-none">
        <prismic-rich-text
          :field="getPrismicData.data.about"
        ></prismic-rich-text>
      </div>
      <div
        v-for="(image, index) in getPrismicData.data.gallery"
        :key="index"
        class="col-12 pb-5 d-flex justify-content-center"
      >
        <img class="img-fluid lazyload" :data-src="image.image.url" alt="" />
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

