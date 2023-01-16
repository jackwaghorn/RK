<template>
  <div class="content-wrapper">
    <client-only>
    <component :is="componentMapper[route.name]"></component></client-only>
   
    <UiNavBar />
  </div>
</template>
<script setup>
import "lazysizes";
import AboutSection from "~~/components/visual/AboutSection.vue";
import ArtworksSection from "~~/components/visual/ArtworksSection.vue";
import EditorialSection from "~~/components/visual/EditorialSection.vue";
import ResearchSection from "~~/components/visual/ResearchSection.vue";
import OrangesSection from "~~/components/visual/OrangesSection.vue";
import ShopSection from "~~/components/visual/ShopSection.vue";
import ProductSection from "~~/components/visual/ProductSection.vue";

const componentMapper = {
  about: AboutSection,
  artworks: ArtworksSection,
  editorial: EditorialSection,
  research: ResearchSection,
  oranges: OrangesSection,
  shop: ShopSection,
  'shop-uid': ProductSection
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
  margin-left: 2rem;
  max-width: calc(100% - 30rem);
}
body {
  background: #f5f5f5;
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

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
