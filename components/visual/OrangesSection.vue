<template>
  <div class="container-fluid pt-5 mt-2 mt-md-0 mb-5 mb-md-0">
    <div v-show="!showGallery" class="row">
      <div v-show="video.video_id" class="col-12 mb-5">
        <div class="plyr__video-embed" id="player">
          <iframe
            :src="`https://player.vimeo.com/video/${video.video_id}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          ></iframe>
        </div>
      </div>
      <!-- Left -->
      <div class="col-md-6 col-12 pe-md-3">
        <div
          @click="displayGallery(image)"
          v-for="(image, index) in orderedArtworks.left"
          :key="index"
          class="col-12 gallery-item"
        >
          <img
            data-expand="-30"
            :src="`${image.image.url}?&q=0?fit=clip&h=80&w=80`"
            class="img-fluid lazyload blur-up"
            :height="image.image.dimensions.height"
            :width="image.image.dimensions.width"
            :data-src="image.image.url"
            alt="image.image.alt"
          />
          <div class="col-12 pb-3 pt-1 caption">{{ image.image.alt }}</div>
        </div>
      </div>

      <div class="col-md-6 col-12 ps-md-3">
        <div
          @click="displayGallery(image)"
          v-for="(image, index) in orderedArtworks.right"
          :key="index"
          class="col-12 gallery-item"
        >
          <img
            data-expand="-30"
            :src="`${image.image.url}?&q=0?fit=clip&h=80&w=80`"
            class="img-fluid lazyload blur-up"
            :height="image.image.dimensions.height"
            :width="image.image.dimensions.width"
            :data-src="image.image.url"
            alt="image.image.alt"
          />

          <div class="col-12 pb-3 pt-1 caption">{{ image.image.alt }}</div>
        </div>
      </div>
    </div>

    <div
      class="custom-swiper-container"
      :class="[showGallery ? 'open-swiper-container' : '']"
    >
      <Swiper
        @swiper="onSwiper"
        :speed="swiperSpeed"
        :slidesPerView="1"
        :spaceBetween="0"
        :loop="true"
        class="d-flex justify-content-center align-items-center"
        :navigation="true"
      >
        <div @click="mySwiper.slideNext()" class="swiper-button-next"></div>
        <div @click="mySwiper.slidePrev()" class="swiper-button-prev"></div>
        <img
          @click="clickCross()"
          class="close-cross"
          src="~/assets/img/cross.png"
          alt=""
        />
        <SwiperSlide
          v-for="(slide, index) in images"
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
            :style="[
              imageRatio(slide.image),
              showGallery ? 'transform:scale(1)' : '',
            ]"
            class="image-wrapper d-flex align-items-center"
          >
            <img
              data-expand="-30"
              :src="`${slide.image.url}?&q=0?fit=clip&h=80&w=80`"
              :data-src="slide.image.url"
              alt=""
              class="img-fluid lazyload blur-up"
              :height="slide.image.dimensions.height"
              :width="slide.image.dimensions.width"
            />
          </div>
          <div class="caption align-self-start pt-1">{{ slide.image.alt }}</div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const dataStore = useDataStore();
const { getPrismicData } = storeToRefs(dataStore);

SwiperCore.use([Navigation]);

const images = ref([]);
const showGallery = ref(false);
const firstSlide = ref(0);
const orderedArtworks = ref({ left: [], right: [] });
const swiperSpeed = ref(300);
const video = ref([]);

video.value = getPrismicData.value.data.video;
images.value = getPrismicData.value.data.gallery;
onMounted(() => {
  layout();
});

function layout() {
  for (let i = 0; i < images.value.length; i++) {
    if (i % 2 == 0) {
      orderedArtworks.value.left.push(images.value[i]);
    } else {
      orderedArtworks.value.right.push(images.value[i]);
    }
  }

  const player = new Plyr("#player", {
    controls: ["play-large", "play", "progress", "current-time", "fullscreen"],
    fullscreen: {
      enabled: true,
    },
  });
  window.player = player;
}

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
function displayGallery(e) {
  let clickedIndex = images.value.findIndex(
    (image) => image.image.url === e.image.url
  );

  if (clickedIndex + 1 === images.value.length) {
    clickedIndex = 0;
  } else {
    clickedIndex = clickedIndex + 1;
  }

  mySwiper.slideTo(clickedIndex);

  showGallery.value = true;
}

let mySwiper = null;
function onSwiper(swiper) {
  mySwiper = swiper;
}

function clickCross() {
  showGallery.value = false;
}
</script>

<style>
.custom-swiper-container {
  opacity: 0;
  height: 0;
  width: 0;
  transition: opacity ease 1000ms;
  transition-delay: 200ms;
}
.open-swiper-container {
  opacity: 1;
  height: auto;
  width: auto;
}

.close-cross {
  width: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}
.image-wrapper {
  transition: transform ease 500ms;
  transform: scale(0);
  height: 85vh;
}
.swiper-button-next {
  background-image: url("~/assets/img/arrow-right.png") !important;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

.swiper-button-next::after {
  display: none;
}
.swiper-button-prev {
  background-image: url("~/assets/img/arrow-left.png") !important;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

.swiper-button-prev::after {
  display: none;
}
.image-slide {
  padding: 0 4rem 0 4rem;
}

.caption {
  font-size: 0.85rem;
  color: #5b5b5b;
  text-decoration: none;
}
.pswp__bg {
  background: #f5f5f5;
}
.pswp__icn {
  filter: invert(100%);
}
</style>