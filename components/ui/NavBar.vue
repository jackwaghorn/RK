<template>
  <nav class="d-flex justify-content-between">
    <div class="dot-wrapper">
      <div ref="dot" class="dot"></div>
    </div>
    <div
      class="
        row
        links-wrapper
        mx-4
        d-flex
        flex-column
        align-items-center
        flex-nowrap
      "
    >
      <div
        v-for="(link, index) in links"
        :key="index"
        class="col-10 link-container"
        :style="[selectedLink === index ? 'flex-grow:1' : '']"
      >
        <NuxtLink
          @click="expand(link, index)"
          class="navigation-link"
          :to="'/' + link"
          >{{ link }}</NuxtLink
        >
        <div class="text-wrapper">
          <div
            @mouseover="disableScroll"
            @mouseleave="enableScroll"
            class="text-content"
          >
            <NuxtPage :tab="link" />
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="banner">
    <div class="name-wrapper">
      <NuxtLink @click="selectedLink = null" to="/">
        <span class="rox">Roxana</span>
        <span class="ken">Kenjeeva</span>
        <span class="vis">Visual Artist</span>
        <span class="des">&#38; Designer</span></NuxtLink
      >
    </div>
  </div>
  <div class="icons">
    <div class="row d-flex justify-content-end">
      <UiShopBasket v-show="route.name.includes('shop')" />
      <img class="icon img-fluid" src="~/assets/img/email.svg" alt="" />

      <img class="icon img-fluid" src="~/assets/img/instagram.svg" alt="" />
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const links = [
  "about",
  "artworks",
  "editorial",
  "research",
  // "woodwork",
  "oranges",
  "shop",
];
const selectedLink = ref(null);

function expand(link, index) {
  selectedLink.value = index;
}
function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "auto";
}

const dot = ref(null);
onMounted(() => {
  if (route.name === "shop-uid") {
    selectedLink.value = links.indexOf("shop");
  } else {
    selectedLink.value = links.indexOf(route.name);
  }

  window.addEventListener("scroll", function () {
    let maxHeight = document.body.scrollHeight - window.innerHeight;
    dot.value.style.top =
      Math.min(100, (window.pageYOffset * 100) / maxHeight) + "%";
  });
});
</script>
<style scoped>
.dot {
  height: 0.5rem;
  width: 0.5rem;
  background: black;
  border-radius: 50%;
  position: absolute;
  left: 0;
  transform: translateX(1.28rem);
  top: 0;
  transition: top ease-out 100ms;
}
.dot-wrapper {
  position: relative;
  height: 100%;
  max-width: 2rem;
}

.icons {
  width: 28rem;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
}
.icon {
  width: 3.9rem;
}
.magic {
  flex-grow: 1;
}
.stick-to-bottom {
  margin-top: auto;
  bottom: 0;
}
.filler {
  height: 10rem;
}
.navigation-link {
  text-transform: uppercase;
  padding: 0;
}
.navigation-link:hover {
  cursor: pointer;
}

.link-container {
  border-bottom: 1px solid black;
  padding-top: 0;
  padding-bottom: 0;
  flex-grow: 0.001;
  transition: flex-grow ease 300ms;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.text-wrapper {
  position: relative;
  left: 0;
  right: 0;
  height: 100%;
}

.text-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  font-size: 0.85rem;
}
.links-wrapper {
  width: 28rem;
  top: 0;
  bottom: 0;
  height: 100%;
  border-left: 1px solid black;
}

nav {
  width: 28rem;
  float: right;
  position: fixed;
  height: 100%;
  right: 0;
  background: #f5f5f5;
  color: black;
  bottom: 0;
  top: 0;
  user-select: none;
  padding-top: 3rem;
  padding-bottom: 4rem;
}

.banner {
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.name-wrapper {
  position: relative;
}
.rox {
  position: absolute;
  top: 98px;
  left: 10px;
  transform-origin: top left;
  transform: rotate(270deg);
}

.ken {
  position: absolute;
  top: 13px;
  left: 35px;
}
.vis {
  position: absolute;
  top: 13px;
  right: 35px;
}
.des {
  position: absolute;
  top: 136px;
  right: 10px;
  transform-origin: top right;
  transform: rotate(90deg);
}
nav a {
  color: black;
  text-decoration: none;
}
a {
  color: black;
}
nav a:hover {
  color: #ff993c;
}
.name-wrapper:hover a {
  color: #ff993c !important;
}

.name-wrapper .router-link-active {
  color: black;
}
.router-link-active {
  color: #ff993c;
}
</style>