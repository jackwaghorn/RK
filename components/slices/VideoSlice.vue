<template>
     
             
          <div v-for="video in item.items" :key="video" class="video-responsive">
            <iframe
              allowfullscreen
              class="video-responsive-item"
              :src="'//player.vimeo.com/video/' + video.url.video_id"
            ></iframe>
          </div>
   
</template>
<script>
export default {
      name: "VideoSlice",
  props: {
    item: Object,
  },
}
</script>

<style scoped>
#player {
    max-width:none !important;
}
.video-responsive {
  position: relative;
  display: block;
  min-width: 100%;
  overflow: hidden;
}

.video-responsive::before {
  display: block;
  content: "";
  padding-top: 56.25%;
}

.video-responsive-item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.video-responsive::before {
  display: block;
  content: "";
  padding-top: 56.25%;
}
</style>