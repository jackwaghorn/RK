<template>
  <div 
  class="container-md mb-0 mb-md-5 mt-md-5 mt-sm-0 ">
    <div class="row justify-content-center my-md-3 my-sm-0">
      <div class="col-12 col-md-5 order-md-last">
        <div v-if="textLoaded">
          <SkeletonBox :min-width="99" :max-width="100" />
          <SkeletonBox :min-width="98" :max-width="100" />
          <SkeletonBox :min-width="99" :max-width="100" />
          <SkeletonBox :min-width="98" :max-width="100" />
          <SkeletonBox :min-width="99" :max-width="100" />
          <SkeletonBox :min-width="70" :max-width="80" />
          <br />
          <br />
          <SkeletonBox :min-width="99" :max-width="100" />
          <SkeletonBox :min-width="97" :max-width="100" />
          <SkeletonBox :min-width="99" :max-width="100" />
          <SkeletonBox :min-width="98" :max-width="100" />
          <SkeletonBox :min-width="99" :max-width="100" />
          <SkeletonBox :min-width="70" :max-width="80" />
        </div>
        <p v-if="!textLoaded">
          <prismic-rich-text :field="about" class="col-sm pb-0 pb-md-1" />
        </p>
        <div class="row">
          <div
            class="col-md-6 col-sm-12 mb-4"
            v-for="list in links"
            :key="list"
          >
            <prismic-rich-text :field="list.list" />
          </div>
          <div class="col pb-3 d-md-none"><div class="instagram-icon p-0"><a href="https://www.instagram.com/roxanakenjeeva/" target="_blank">
          <img class="img-fluid" src="/img/nav/instagram.png" alt=""></a></div></div>
          
        </div>
      </div>
      <div class="col-12 col-md-5 order-md-first">
        <div class="row">
          <div v-for="image in images" class="col-12 mb-4" :key="image.id">
            <img
           
              class="bio-image-mobile lazyload img-fluid"
              :data-src="image.image.url"
              data-expand="-20"
              alt=""
              :width="image.image.dimensions.width"
              :height="image.image.dimensions.height"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMe",

  data() {
    return {
      about: [],
      links: [],
      images: [],
      textLoaded: true,
    };
  },
  methods: {
    async getContent() {
      const data = await this.$prismic.client.getSingle("about");

      this.about = data.data.about;
      this.links = data.data.links;
      this.images = data.data.gallery;
      this.textLoaded = false;
    },
  },
  created() {
    this.getContent();
  },

};
</script>


<style scoped>
.instagram-icon {
   width: 32px;
}

ul {
  list-style-type: none;
  padding: 0;
}


.bio-image-mobile {
  background-color: rgba(148, 148, 148, 0.63);
  min-width:100%;
}
</style>
