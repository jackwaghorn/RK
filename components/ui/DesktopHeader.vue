<template>
  <div class="nav">
    <transition name="slide">
      <div class="container-fluid">
        <div
          :class="{ 'no-background': onHome }"
          class="
            white-bar
            d-flex
            align-items-center
            mx-3
            justify-content-center
          "
        >
          <nuxt-link to="/" class="name turn-orange">
            <transition name="slide">
              <div v-if="!onHome">
                <div>
                  <div class="kenjeeva other-buttons">Kenjeeva</div>
                </div>
                <div>
                  <div class="roxana other-buttons">Roxana</div>
                </div>
              </div>
            </transition>
          </nuxt-link>

          <div class="d-inline-flex justify-content-center pages other-buttons">
           
            <nuxt-link
              to="/artworks"
              class="turn orange-active"
              :class="{ 'router-link-active': onArtworks }"
              @mouseenter="hoveringOver('artworks')"
              @mouseleave="hoveringOver(null)"
            >
              <div v-if="hovering === 'artworks'" class="draw-artworks">
                <UiDrawButton :key="'artworks'" />
              </div>
              <div class="pages-button">Artwork</div></nuxt-link
            >
            
            <nuxt-link
              to="/projects"
              class="turn orange-active"
              :class="{ 'router-link-active': onProjects }"
              @mouseenter="hoveringOver('projects')"
              @mouseleave="hoveringOver(null)"
            >
              <div v-if="hovering === 'projects'" class="draw-projects">
                <UiDrawButton :key="'projects'" />
              </div>
              <div class="pages-button ms-5">Projects</div></nuxt-link
            >
             <nuxt-link
              to="/about"
              class="turn orange-active"
              @mouseenter="hoveringOver('about')"
              @mouseleave="hoveringOver(null)"
            >
              <div v-if="hovering === 'about'" class="draw-about">
                <UiDrawButton :key="'about'" />
              </div>
              <div class="pages-button mx-5">About</div>
            </nuxt-link>
            <nuxt-link
              to="/shop"
              class="turn orange-active"
              :class="{ 'router-link-active': onShop }"
              @mouseenter="hoveringOver('shop')"
              @mouseleave="hoveringOver(null)"
            >
              <div v-if="hovering === 'shop'" class="draw-shop">
                <UiDrawButton />
              </div>
              <div class="pages-button">Shop</div></nuxt-link
            >
          </div>

          <nuxt-link to="/" class="name turn-orange">
            <transition name="route">
              <div v-if="!onHome">
                <div class="visual-artist other-buttons">Visual Artist</div>

                <div class="and-designer other-buttons">&amp; Designer</div>
              </div>
            </transition>
          </nuxt-link>
        </div>
      </div>
    </transition>

    <transition name="route">
      <div class="instagram other-buttons m-4 icon-hover" v-if="!onHome">
        <a href="https://www.instagram.com/roxanakenjeeva/" target="_blank">
          <img src="~/assets/img/nav/instagram.png" class="img-fluid" alt=""
        /></a>
      </div>
    </transition>
    <transition name="route">
      <div class="email turn other-buttons m-4 icon-hover" v-if="!onHome">
        <a href="mailto:roxanakenjeeva@gmail.com" target="_top">
          <img src="~/assets/img/nav/email.png" class="img-fluid" alt=""
        /></a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hovering: null,
      onProjects: false,
      onArtworks: false,
      onShop: false,
      onHome: true,
    };
  },
  methods: {
    subIsActive() {
      const path = this.$route.path;

      if (path.length < 2) {
        this.onHome = true;
      } else {
        this.onHome = false;
      }

      if (path.includes("/projects")) {
        this.onProjects = true;
      } else {
        this.onProjects = false;
      }
        if (path.includes("/artworks")) {
        this.onArtworks = true;
      } else {
        this.onArtworks = false;
      }
      if (path.includes("/shop")) {
        this.onShop = true;
      } else {
        this.onShop = false;
      }
    },
    hoveringOver(el) {
      this.hovering = el;
    },
  },
  watch: {
    $route() {
      this.subIsActive();
    },
  },
  mounted() {
    this.subIsActive();
  },
};
</script>

<style scoped>
.no-background {
  background-color: transparent !important;
}

.draw-about {
  position: absolute;

  transform: translate(25px, -12px);
}
.draw-projects {
  position: absolute;

  transform: translate(29px, -12px);
}
.draw-artworks {
  position: absolute;

  transform: translate(-20px, -12px);
}
.draw-shop {
  position: absolute;
  transform: translate(-26px, -10px);
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}

.roxana {
  top: 40px;
  position: absolute;
  left: 0;
  height: auto;
  width: 35px;
  text-orientation: sideways;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.roxana-upright {
  width: auto;
  height: 45px;
}
.kenjeeva {
  position: absolute;
  top: 13px;
  width: 160px;
  left: 0;
  height: 35px;
  margin-left: 2em;
}

.visual-artist {
  position: absolute;
  top: 13px;
  right: 0;
  width: 160px;
  height: 35px;
  margin-right: 2em;
  margin-top: 5px;
  text-align: right;
}

.and-designer {
  top: 35px;
  white-space: nowrap;
  position: absolute;
  height: auto;
  width: 35px;
  right: 0;
  text-orientation: sideways;
  writing-mode: vertical-rl;
}

.pages-button {
  width: auto;
  height: 30px;
}

.instagram {
  position: absolute;
  float: right;
  bottom: 0;
  right: 0;
  width: 32px;
}

.email {
  position: absolute;
  float: left;
  bottom: 0;
  left: 0;
  width: 30px;
}

.white-bar {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  background-color: rgb(252, 252, 252);
  height: 60px;
}

.other-buttons {
  z-index: 10;
  pointer-events: all !important;
}

.name {
  color: #000;
}

.name:hover {
  color: #444;
}

.icon-hover {
  filter: invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%)
    contrast(100%);
}

.turn:hover {
  filter: invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%)
    contrast(100%);
}
.turn-orange:hover {
  color: #feb100;
}

.nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  letter-spacing: 2px;
  pointer-events: none;
  z-index: 10;
  text-transform: uppercase;
}

.nav a {
  color: #000;
  text-decoration: none;
}

.pages .router-link-active {
  color: #feb100;
}
</style>