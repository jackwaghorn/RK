<template>
  <div class="content-wrapper">
    <client-only>
      <transition name="route" mode="out-in">
        <component
          class="route-page"
          :is="componentMapper[route.name]"
        ></component>
      </transition>
    </client-only>
    <UiNavBar />
  </div>
</template>
<script setup>
import "lazysizes";
import HomeSection from "~~/components/visual/HomeSection.vue";
import AboutSection from "~~/components/visual/AboutSection.vue";
import ArtworksSection from "~~/components/visual/ArtworksSection.vue";
import EditorialSection from "~~/components/visual/EditorialSection.vue";
import ResearchSection from "~~/components/visual/ResearchSection.vue";
import OrangesSection from "~~/components/visual/OrangesSection.vue";
import ShopSection from "~~/components/visual/ShopSection.vue";
import ProductSection from "~~/components/visual/ProductSection.vue";

const componentMapper = {
  index: HomeSection,
  about: AboutSection,
  artworks: ArtworksSection,
  editorial: EditorialSection,
  research: ResearchSection,
  oranges: OrangesSection,
  shop: ShopSection,
  "shop-uid": ProductSection,
};
const route = useRoute();
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@300;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap");

#__nuxt {
  font-family: "Source Code Pro", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  font-size: 1rem;
  background: #f5f5f5;
  width: 100%;
  height: 100%;
}
.content-wrapper {
  max-width: 100%;
}

.blur-up {
  -webkit-filter: blur(5px);
  filter: blur(5px);
  transition: filter 400ms, -webkit-filter 400ms;
}

.blur-up.lazyloaded {
  -webkit-filter: blur(0);
  filter: blur(0);
}

@media (min-width: 768px) {
  .content-wrapper {
    margin-left: 2rem;
    max-width: calc(100% - 29rem);
  }
}

@media (min-width: 992px) {
  .content-wrapper {
    margin-left: 2rem;
    max-width: calc(100% - 30rem);
  }
}
.route-page {
  font-size: 0.85rem;
}

body {
  background: #f5f5f5;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  user-select: none;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
}

/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

.text-content::-webkit-scrollbar {
  display: none;
}
.text-content {
    -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>
