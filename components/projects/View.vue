<template>
  <div class="container-md my-md-5 my-0 pt-5 mt-5">
    
    <div class="row justify-content-around g-5">
      <div class="col-12 col-md-4 mb-3 mb-md-0 pb-md-0 order-md-last">
        <div class="row sticky-guy">
          <div class="col-12">
            <UiSkeletonBox v-if="textLoaded" :min-width="20" :max-width="40" />
            <h6 v-if="!textLoaded" class="m-0 title-text">{{ title }}</h6>
          </div>

          <div class="col-12 my-1 mt-3 yeartext">
            <UiSkeletonBox v-if="textLoaded" :min-width="8" :max-width="15" />
            <p v-if="!textLoaded" class="m-0">{{ year }}</p>
          </div>
          <div class="col-12">
            <UiSkeletonBox v-if="textLoaded" :min-width="10" :max-width="20" />
            <p v-if="!textLoaded" class="yeartext m-0">{{ medium }}</p>
          </div>

          <div class="col-12 mt-3">
            <div v-if="textLoaded">
              <UiSkeletonBox :min-width="94" :max-width="95" />
              <UiSkeletonBox :min-width="94" :max-width="95" />
              <UiSkeletonBox :min-width="94" :max-width="95" />
            </div>
            <prismic-rich-text v-if="!textLoaded" :field="text" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 mb-4 mb-md-0 order-md-first">
        <section class="mb-3 pb-3" v-for="item in sliceData" :key="item">
          <component
            :is="componentMapper[item.slice_type]"
            v-bind="{ item: item }"
          ></component>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
import CarouselSlice from "~/components/slices/CarouselSlice";
import ImageSlice from "~/components/slices/ImageSlice";
import VideoSlice from "~/components/slices/VideoSlice";


export default {
  components: {
    CarouselSlice,
    ImageSlice,
    VideoSlice,
  },
  data() {
    return {
      componentMapper: {
        image_carousel: "CarouselSlice",
        image: "ImageSlice",
        video: "VideoSlice",
      },
      title: [],
      text: [],
      year: [],
      medium: [],
      sliceData: [],

      textLoaded: true,
    };
  },
  methods: {
    getPosts(uid) {
      this.$prismic.client.getByUID("post", uid).then((post) => {
        // Load text
        this.title = post.data.title[0].text;
        this.text = post.data.text;
        this.year = post.data.year;
        this.medium = post.data.medium[0].text;

        // Load slice data
        this.sliceData = post.data.body1;

        // Render text
        this.textLoaded = false;
      });
    },
  },

  created() {

 
    this.getPosts(this.$route.params.uid);
  },
};
</script>

<style scoped>
.title-text {
  font-weight: bold;
  color: rgb(46, 46, 46);
}

.sticky-guy {
  position: sticky;
  top: 120px;
}

.yeartext {
  color: grey;
  margin-top: -10px;
}
</style>

