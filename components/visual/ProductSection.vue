<template>
  <div class="container-fluid pt-5 mt-2 mt-md-0">
    <UiProductDetails class="d-block d-md-none" />
    <Swiper
      v-if="dataFetched"
      :slidesPerView="1"
      :spaceBetween="0"
      :loop="true"
      class="d-flex justify-content-center align-items-center"
      :navigation="true"
    >
      <SwiperSlide
        v-for="(slide, index) in getProductData.data.gallery"
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
        <div class="image-wrapper d-flex align-items-center">
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
const { getProductData } = storeToRefs(dataStore);

SwiperCore.use([Navigation]);

const product = ref();

const dataFetched = ref(false);
// if (getProductData.value.data) {

//   product.value = getProductData.value.data.gallery;
//   dataFetched.value = true;
// }
//   console.log(getProductData.value)

dataStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    after(() => {
      if (name === "updateProductData") {
        product.value = getProductData.value.data.gallery;
        dataFetched.value = true;
      }
    });
  }
);

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
  transform: scale(1);
}
</style>