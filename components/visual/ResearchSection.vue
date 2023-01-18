<template>
  <div class="container-fluid pt-5 mt-2 mt-md-0">
    <div
      class="pb-5 mb-5 project-gallery"
      v-for="(gallery, index) in projectGalleries.data.body"
      :key="index"
      :id="index"
    ><div class="d-block d-md-none">
         <div class="col-12 title mb-2">{{ gallery.primary.title[0].text }}</div>
      <prismic-rich-text
        :field="gallery.primary.description"
      ></prismic-rich-text></div>
      <Swiper
        :slidesPerView="1"
        :spaceBetween="0"
        :loop="true"
        class="d-flex justify-content-center align-items-center mt-5 mt-md-0"
        :navigation="true"
      >
        <SwiperSlide
          v-for="(slide, index) in gallery.items"
          :key="index"
          class="
            image-slide
            d-flex
            justify-content-center
            flex-column
            align-items-center
            align-self-center
          "
          :id="index"
        >
          <div class="image-wrapper d-flex align-items-center">
            <img
              :src="slide.image.url"
              alt=""
              class="img-fluid"
              :height="slide.image.dimensions.height"
              :width="slide.image.dimensions.width"
            />
          </div>
          <!-- <div class="caption align-self-start pt-1">{{ slide.image.alt }}</div> -->
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
const dataStore = useDataStore();
const { getPrismicData } = storeToRefs(dataStore);

SwiperCore.use([Navigation]);

const projectGalleries = ref([]);

projectGalleries.value = getPrismicData.value;
onMounted(() => {
  observe();
});

const currentObserved = ref(0);
let faders = null;
let appearOnScroll = null;
function observe() {
  faders = document.querySelectorAll(".project-gallery");

  appearOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          //   entry.target.classList.remove("appear");
          return;
        } else {
          currentObserved.value = Number(entry.target.id);
          dataStore.changeObservedProject(currentObserved.value);
        }
      });
    },
    {
      rootMargin: `-50% 0px -50% 0px`,
    }
  );
  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
}

onUnmounted(() => {
  faders.forEach((fader) => {
    appearOnScroll.unobserve(fader);
  });
});

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
.title {
  font-weight: 600;
}
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

.image-wrapper {
  transform: scale(1);
  height: 100%;
}

@media (min-width: 768px) {
  .image-wrapper {
    transform: scale(1);
    height: 85vh;
  }
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