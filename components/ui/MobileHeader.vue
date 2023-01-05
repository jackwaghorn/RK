<template>
  <div class="nav">
    <div class="container-fluid noselect">
      <div
        :class="{ 'no-background': onHome }"
        class="
          white-bar
          d-flex
          justify-content-between
          align-items-center
          p-0
          m-0
        "
      >
        <div v-if="nameLoaded">
          <div
            v-if="!onHome"
            class="name other-buttons"
            @click="showMenu = false"
          >
            <nuxt-link tag="div" class="turn-orange" to="/">
              <p class="pages-button">Roxana</p>
              <p class="pages-button">Kenjeeva</p>
            </nuxt-link>
          </div>
          <div
            v-if="onHome"
            class="name other-buttons turn-orange"
            @click="showMenu = false"
          >
            <nuxt-link tag="div" class="turn-orange" to="/">
              <p class="pages-button">Visual Artist</p>
              <p class="pages-button">&#38; Designer</p>
            </nuxt-link>
          </div>
        </div>

        <div class="flex-grow-1 mx-3"></div>

        <div class="menu-button other-buttons" @click="showMenu = !showMenu">
          <UiMenuButton :expand-menu="showMenu" />
        </div>
      </div>
      <transition name="expand">
        <div
          class="menu d-flex justify-content-center p-1"
          v-if="!!showMenu"
          @click="showMenu = !showMenu"
        >
          <div
            class="
              d-flex
              flex-column
              other-buttons
              justify-content-center
              align-items-center
              flex-wrap
              mx-2
              turn-orange
            "
          >
            <nuxt-link to="/about" tag="div" class="turn-orange"
              ><p class="menu-item mb-3">About</p>
            </nuxt-link>
            <nuxt-link
              to="/artworks"
              tag="div"
              class="turn-orange"
              :class="{ 'router-link-active': onArtworks }"
              ><p class="menu-item mb-3">Artworks</p></nuxt-link
            >
            <nuxt-link
              to="/projects"
              tag="div"
              class="turn-orange"
              :class="{ 'router-link-active': onProjects }"
              ><p class="menu-item mb-3">Projects</p></nuxt-link
            >
            <nuxt-link
              to="/shop"
              tag="div"
              class="turn-orange"
              :class="{ 'router-link-active': onShop }"
              ><p class="menu-item mb-3">Shop</p></nuxt-link
            >

            <span class="menu-item mb-5"
              ><a
                class="turn-orange"
                href="mailto:roxanakenjeeva@gmail.com"
                target="_top"
                >Contact</a
              ></span
            >

            <a
              href="https://www.instagram.com/roxanakenjeeva/"
              target="_blank"
              class="insta-icon"
            >
              <img src="~/assets/img/nav/instagram.png" class="icons" alt=""
            /></a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameLoaded: false,
      showMenu: true,
      onArtworks: false,
      onProjects: false,
      onShop: false,
      onHome: false,
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
      if (path.includes("/artworks")) {
        this.onArtworks = true;
      } else {
        this.onArtworks = false;
      }

      if (path.includes("/projects")) {
        this.onProjects = true;
      } else {
        this.onProjects = false;
      }
      if (path.includes("/shop")) {
        this.onShop = true;
      } else {
        this.onShop = false;
      }
      this.$nextTick(() => {
        this.nameLoaded = true;
      });
    },
  },
  watch: {
    $route() {
      this.subIsActive();
    },
  },
  beforeMount() {
    this.subIsActive();
  },
};
</script>

<style scoped>
.insta-icon {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;

}
.icons {
  max-width: 50px;
  max-height: 50px;
}

.menu-two {
  transform: translateY(50%) rotate(-45deg);
}

.menurotated {
  filter: invert(81%) sepia(72%) saturate(4983%) hue-rotate(359deg)
    brightness(104%) contrast(102%);
}

@media (hover: hover) and (pointer: fine) {
  .menu-button:hover {
    filter: invert(81%) sepia(72%) saturate(4983%) hue-rotate(359deg)
      brightness(104%) contrast(102%);
  }
  .turn-orange:hover {
    color: #feb100;
  }
}

.expand-enter-from,
.expand-leave-to {
  transform: translateY(-120px);
  opacity: 0;
}

.expand-enter-active {
  transition: all 0.2s ease-out;
}

.expand-leave-active {
  transition: all 0.2s ease-in;
}

.expand-enter-to,
.expand-leave-from {
  transform: translateX(0);
  transform: rotate(0deg);
  opacity: 1;
}

.menu-button {
  margin-right: 17px;
}

.menu-icon {
  width: 2.6em;
}

.no-background {
  background-color: transparent !important;
}

.menu {
  backdrop-filter: blur(10px);
  width: 100vw;
  right: 0;
  position: fixed;
  top: 60px;
  /* height: 100%; */
  bottom: 0;
  z-index: 80;
  background: rgba(252, 252, 252, 0.859);
  /* border-bottom: 1px solid rgba(133, 133, 133, 0.082); */
}

.name {
  margin-left: 12px;
  left: 0;
  color: #000 !important;
  white-space: wrap;
}
.menu-item {
  font-size: 1.2rem;
  left: 10px;
  top: 0;
  bottom: 0;
  width: auto;
  margin: 0;
  text-align: center;
  padding: 8px 0 8px 0;
}

.pages-button {
  width: auto;
  margin: 0;
  padding: 0;
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
  z-index: 100;
  transition: all 0.3s ease;
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

.menu .router-link-active {
  color: #feb100;
}
</style>