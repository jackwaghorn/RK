<template>
    <div>
    <div class="photo d-flex justify-content-center">
       
      <div :style="imageRatio(item.primary.image1)">
        <img
        
          :src="item.primary.image1.url"
          alt=""
          class=" img-fluid img-background"
          :height="item.primary.image1.dimensions.height"
          :width="item.primary.image1.dimensions.width"
        />
      </div>
    </div>
  
    <p v-if="item.primary.description[0]" class="image-caption">{{item.primary.description[0].text}}</p>
    </div>

</template>
<script>
export default {
  name: "ImageSlice",
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  methods: {
    imageRatio(e) {
      let height = e.dimensions.height;
      let width = e.dimensions.width;
      let ratio = width / height;
      let maxHeight = (window.innerHeight / 100) * 73;

      return {
        "max-height": maxHeight + "px",
        "max-width": maxHeight * ratio + "px",
      };
    },
    // checkForDescription(e) {
    //     return e.hasOwnProperty([0]) 
        
    // }
  },
};
</script>
<style scoped>
.image-caption {
    margin-top:0.2em;
    color:grey;
}
.photo {
  scroll-snap-align: start;
  top: 72px;
}

.img-max {
  max-height: 83.5vh;
}

.img-background {
  background-color: rgba(148, 148, 148, 0.63) !important;
}
</style>