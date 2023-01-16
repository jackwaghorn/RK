<template>
  <div class="container-fluid pt-5">
    <Swiper
      :slidesPerView="1"
      :spaceBetween="0"
      :loop="true"
      class="d-flex justify-content-center align-items-center"
      :navigation="true"
    >
      <SwiperSlide
        v-for="(slide, index) in product.data.gallery"
        :key="index"
        class="
          image-slide
          d-flex
          justify-content-center
          flex-column
          align-items-center
        "
        :id="index"
      >
        <div
        
          class="image-wrapper d-flex align-items-center"
        >
          <img
            :data-src="slide.image1.url"
            alt=""
            class="img-fluid lazyload"
            :height="slide.image1.dimensions.height"
            :width="slide.image1.dimensions.width"
          />
        </div>
        <div class="caption align-self-start pt-1">{{ slide.image1.alt }}</div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper";
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
import "swiper/css";
import "swiper/css/navigation";
const dataStore = useDataStore();
const { getPrismicData } = storeToRefs(dataStore);

SwiperCore.use([Navigation]);

const product = ref();
product.value = getPrismicData.value;


function imageRatio(e) {
  let height = e.dimensions.height;
  let width = e.dimensions.width;
  let ratio = width / height;
  let maxHeight = (window.innerHeight / 100) * 85;

  return {
    "max-height": maxHeight + "px",
    "max-width": maxHeight * ratio + "px",
  };
}

</script>
<style scoped>
.image-wrapper {
  transform:scale(1);
}
</style>