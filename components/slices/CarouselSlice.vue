<template>
  <Swiper
  :modules="[SwiperNavigation]"
    :slidesPerView="1"
    :spaceBetween="0"
    :loop="true"
    :slideToClickedSlide="true"
    :centeredSlides="true"
    class="d-flex justify-content-center align-items-center"
    :navigation="true"
  >
    <SwiperSlide
      v-for="(slide, index) in item.items"
      :key="index"
      class="d-flex justify-content-center align-items-center"
      :id="index"
      ><div
        class="row d-flex justify-content-center align-items-center"
        :style="imageRatio(slide.image1)"
      >
        <div class="col-12 d-flex justify-content-center">
          <img
            :src="slide.image1.url"
            alt=""
            class="img-fluid img-background"
            :height="slide.image1.dimensions.height"
            :width="slide.image1.dimensions.width"
          />
        </div>
        <div class="col-12 d-flex justify-content-start caption">
          {{ slide.image1.alt }}
        </div>
      </div>
    
    </SwiperSlide>

  </Swiper>
</template>

<script>
export default {
  name: "CarouselSlice",

  props: {
    item: Object,
  },
  methods: {
    imageRatio(e) {
      let height = e.dimensions.height;
      let width = e.dimensions.width;
      let ratio = width / height;
      let maxHeight = (window.innerHeight / 100) * 73;

      return {
        "max-height": maxHeight + "px",
        "max-width": maxHeight * ratio + "px",
      };
    },
  },
};
</script>

<style scoped>
.caption {
  color: grey;
  margin-top: 0.2em;
}
.swiper-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-next {
  background-image: url("~/img/shop/arrow-right.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

.swiper-button-next::after {
  display: none;
}
</style>