<template>
  <div  class=" d-none d-md-block">
    <nav :class="[route.name === 'index' ? 'nav-h' : '']" class="nav-s d-flex justify-content-between">

      <div class="dot-wrapper">
        <div class="dot"></div>
        <input
          @mousedown="dotScroll = true"
          @mouseup="dotScroll = false"
          v-model="dot"
          type="range"
          min="1"
          step="0.01"
          max="100"
          class="slider"
        />
      </div>
      <div
        class="
          row
          links-wrapper
          mx-lg-4 mx-md-1
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
  </div>
  <!-- Mobile navigation -->
  <div class="mobile-banner d-block d-md-none">
    <div class="row d-flex justify-content-between align-items-center m-2">
      <div class="col-auto ps-1">
        <div class="name-wrapper">
          <NuxtLink to="/">
            Roxana <br />
            Kenjeeva
          </NuxtLink>
        </div>
      </div>
      <div @click="showMobileNav = !showMobileNav" class="col-auto">
        <img
          v-if="!showMobileNav"
          class="menu-icon"
          src="~/assets/img/menu.png"
          alt=""
        />
        <img
          v-if="showMobileNav"
          class="menu-icon"
          src="~/assets/img/cross.png"
          alt=""
        />
      </div>
    </div>
  </div>
  <transition name="slide">
    <div v-if="showMobileNav" class="mobile-nav-modal">
      <div
        class="
          h-100
          d-flex
          flex-column
          justify-content-start
          align-items-center
          pt-5
        "
      >
        <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          class="col-9 text-left navigation-link mobile-link py-2 ps-4"
          :class="[index === 0 ? 'pt-3' : '']"
          :to="'/' + link"
          @click="showMobileNav = false"
          >{{ link }}</NuxtLink
        >
      </div>
    </div></transition
  >
  <!-- Desktop navigation -->
  <div class="desktop-banner d-none d-md-block">
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
      <a href="mailto:roxanakenjeeva@gmail.com" target="_top" class="icon">
        <img class="icon img-fluid" src="~/assets/img/email.svg" alt=""
      /></a>
      <a
        href="https://www.instagram.com/roxanakenjeeva/"
        target="_blank"
        class="icon"
      >
        <img class="icon img-fluid" src="~/assets/img/instagram.svg" alt=""
      /></a>
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

const showMobileNav = ref(false);

function expand(link, index) {
  selectedLink.value = index;
}
function disableScroll() {
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  document.body.style.overflow = "auto";
}

const dot = ref(0);

const dotScroll = ref(false);

watch(dot, () => {
  if (dotScroll.value) {
    let maxHeight = document.body.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: maxHeight * (dot.value / 100),
      left: 0,
      behavior: "instant",
    });
  }
});
onMounted(() => {
  if (route.name === "shop-uid") {
    selectedLink.value = links.indexOf("shop");
  } else {
    selectedLink.value = links.indexOf(route.name);
  }

  window.addEventListener("scroll", function () {
    if (!dotScroll.value) {
      let maxHeight = document.body.scrollHeight - window.innerHeight;

      dot.value = Math.min(
        100,
        Math.max(0, (window.pageYOffset * 100) / maxHeight)
      );
    }
  });
});
</script>
<style scoped>
.nav-h {

  transform:translateX(100%) !important;
}
.nav-s {
 transform:translateX(0%);

  transition:transform ease 200ms;
}
.mobile-nav-modal {
  background: #f5f5f5f8;
  backdrop-filter: blur(10px);

  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.mobile-link {
  border-bottom: 1px solid black;
  text-decoration: none;
}
.menu-icon {
  width: 2rem;
  height: 2rem;
}
.dot {
  height: 0.5rem;
  width: 0.5rem;
  background: black;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  transition: top ease-out 100ms;
  display: none;
}
.slider {
  height: 1px;
  width: calc(100vh - 112px);
  position: absolute;
  left:1.4rem;
  transform: rotate(90deg);
  transform-origin: left;
  background: black;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 0.55rem;
  width: 0.55rem;
  border-radius: 50%;
  background: #000000;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #000000;
  cursor: pointer;
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
  z-index: 3;
}
.icon {
  width: 3.9rem;
}
.icon:hover {
  filter: invert(68%) sepia(85%) saturate(1612%) hue-rotate(331deg)
    brightness(104%) contrast(101%);
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
  /* border-left: 1px solid black; */
}

nav {
  width: 25rem;
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
@media (min-width: 992px) {
  nav {
    width: 28rem;
  }

  .dot {
    transform: translateX(1.28rem);
  }
}

.desktop-banner {
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.mobile-banner {
  background: #f5f5f5;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  height: 3.4rem;
  z-index: 3;
  width: 100%;
  line-height: 1.2rem;
}
.mobile-banner a {
  text-decoration: none;
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

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100vh);
}

.slide-enter-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}

.slide-leave-active {
  transition: opacity 200ms ease-in, transform 200ms ease-in;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>