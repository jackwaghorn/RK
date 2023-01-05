<template>
  <div>
    <UiDesktopHeader class="d-none d-md-block" />
    <UiMobileHeader class="d-md-none" />

    <transition name="shopview" mode="out-in">
      <ShopBasket v-show="onShop" />
    </transition>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script>
import "lazysizes";
export default {
  data() {
    return {
      onShop: false,
    };
  },
  methods: {
    subIsActive() {
      const path = this.$route.path;
      if (path.includes("/shop")) {
        this.onShop = true;
      } else {
        this.onShop = false;
      }
    },
  },

  watch: {
    $route() {
      this.subIsActive();
    },
  },
};
</script>





<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@300;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap");

.dropshadow {
  filter: drop-shadow(1px 1px 0px rgb(255, 255, 255));
}

a {
  color: #feb100;
}

.lazyload,
.lazyloading {
  opacity: 0;
}

.lazyloaded {
  opacity: 1;
  transition: opacity 300ms;
}

#__nuxt {
  /* font-family: 'Noto Sans Mono', monospace; */
  font-family: "Source Code Pro", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
  letter-spacing: 0.8px;
  font-size: 13px;
}
body {
  background-color: rgb(252, 252, 252);
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

.shopview-enter-from,
.shopview-leave-to {
  opacity: 0;
}

.shopview-enter-active {
  transition: all 0.3s ease-out !important;
  transition-delay: 0.3s !important;
}

.shopview-leave-active {
  transition: all 0.3s ease-in !important;
}

.shopview-enter-to,
.shopview-leave-from {
  opacity: 1;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.swiper-button-next {
  background-image: url("/img/shop/arrow-right.png") !important;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

.swiper-button-next::after {
  display: none;
}
.swiper-button-prev {
  background-image: url("/img/shop/arrow-left.png") !important;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

.swiper-button-prev::after {
  display: none;
}
</style>
