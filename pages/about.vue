<template>
  <div class="container-md mb-0 mb-md-5 mt-md-5 pt-5 mt-5 mt-sm-0">
    <div class="row justify-content-center my-md-3 my-sm-0">
      <div class="col-12 col-md-5 order-md-last">
        <div v-if="!data.data.about">
          <UiSkeletonBox :min-width="99" :max-width="100" />
          <UiSkeletonBox :min-width="98" :max-width="100" />
          <UiSkeletonBox :min-width="99" :max-width="100" />
          <UiSkeletonBox :min-width="98" :max-width="100" />
          <UiSkeletonBox :min-width="99" :max-width="100" />
          <UiSkeletonBox :min-width="70" :max-width="80" />
          <br />
          <br />
          <UiSkeletonBox :min-width="99" :max-width="100" />
          <UiSkeletonBox :min-width="97" :max-width="100" />
          <UiSkeletonBox :min-width="99" :max-width="100" />
          <UiSkeletonBox :min-width="98" :max-width="100" />
          <UiSkeletonBox :min-width="99" :max-width="100" />
          <UiSkeletonBox :min-width="70" :max-width="80" />
        </div>

        <prismic-rich-text
          v-if="data.data.about"
          :field="data.data.about"
          class="col-sm pb-0 pb-md-1"
        />

        <div class="row">
          <div
            class="col-md-6 col-sm-12 mb-4"
            v-for="list in data.data.links"
            :key="list"
          >
            <prismic-rich-text :field="list.list" />
          </div>
          <div class="col pb-3 d-md-none">
            <div class="instagram-icon p-0">
              <a
                href="https://www.instagram.com/roxanakenjeeva/"
                target="_blank"
              >
                <img class="img-fluid" src="/img/nav/instagram.png" alt=""
              /></a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5 order-md-first">
        <div class="row">
          <div
            v-for="image in data.data.gallery"
            class="col-12 mb-4"
            :key="image.id"
          >
            <img
              class="bio-image-mobile img-fluid lazyload"
              :data-src="image.image.url"
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

<script setup>
const textLoaded = ref(true);

const { client } = usePrismic();
const { data: data } = await useAsyncData("data", async () =>
  client.getSingle("about")
);

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
  min-width: 100%;
}
</style>
