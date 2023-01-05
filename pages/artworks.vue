<template>
  <div class="container-md my-md-5 my-0 pt-5 mt-5">
    <div
      id="gallery"
      class="row grid"
      data-masonry='{"percentPosition": true }'
    >
      <a
        :href="image.image.url"
        :data-pswp-width="image.image.dimensions.width"
        :data-pswp-height="image.image.dimensions.height"
        target="_blank"
        v-for="(image, index) in images"
        :key="index"
        class="grid-item p-2"
      >
        <img
          class="img-fluid lazyload"
          :height="image.image.dimensions.height"
          :width="image.image.dimensions.width"
          :data-src="image.image.url"
          alt=""
        />
      </a>
    </div>
  </div>
</template>
<script>
import Masonry from "masonry-layout";
import ImagesLoaded from "imagesloaded";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default {
  name: "Artworks",
  data() {
    return {
      images: [],
      isLoading: false,
      options: {
        shareEl: false,
        showHideOpacity: false,
        spacing: 10,
        tapToClose: true,
        clickToCloseNonZoomable: true,
      },
    };
  },
  methods: {
    getPosts() {
      this.isLoading = true;
      //Query to get blog posts
      this.$prismic.client.getSingle("artworks").then((response) => {
        this.images = response.data.gallery;
        ImagesLoaded(document.querySelector(".grid"), () => {
          this.layout();
        });
      });
    },
    layout() {
      let row = document.querySelector("[data-masonry]");
      new Masonry(row, {
        percentPosition: true,
        itemSelector: ".grid-item",
        horizontalOrder: true,
        columnWidth: ".grid-item",
        fitWidth: true,
      });

      const lightbox = new PhotoSwipeLightbox({
        gallery: "#gallery",
        children: "a",
        bgOpacity: 1,
        counter: false,
        zoom: false,
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style>
.pswp__bg {
 
  background-color: rgb(252, 252, 252);
}
.pswp__icn {
  filter:invert(100%);
}
.grid-item {
  width: 33.33% !important;
}
.grid {
  margin: 0 auto !important;
}
</style>