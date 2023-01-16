<template>
  <div class="container-fluid pt-5">
    <div class="row">
      <!-- Left -->
      <div class="col-md-6 col-12 pe-md-2">
        <div
          v-for="(product, index) in orderedArtworks.left"
          :key="index"
          class="col-12"
        >
          <router-link :to="`/shop/${product.uid}`">
            <img
              class="img-fluid lazyload"
              :height="product.data.gallery[0].image1.dimensions.height"
              :width="product.data.gallery[0].image1.dimensions.width"
              :data-src="product.data.gallery[0].image1.url"
              alt="image.image.alt"
            />
            <div
              class="col-12 pb-3 pt-1 caption d-flex justify-content-between"
            >
              <span
                >{{ product.data.name[0].text }},
                <span>{{ product.data.type[0].text }}</span></span
              >
              <span v-if="dataStore.selectedCurrencyState === 'eur'"
                >€{{ product.data.euro }}</span
              >
              <span v-if="dataStore.selectedCurrencyState === 'gbp'"
                >£{{ product.data.pound }}</span
              >
            </div>
          </router-link>
        </div>
      </div>

      <div class="col-md-6 col-12 ps-md-2">
        <div
          v-for="(product, index) in orderedArtworks.right"
          :key="index"
          class="col-12"
        >
          <router-link :to="`/shop/${product.uid}`">
            <img
              class="img-fluid lazyload"
              :height="product.data.gallery[0].image1.dimensions.height"
              :width="product.data.gallery[0].image1.dimensions.width"
              :data-src="product.data.gallery[0].image1.url"
              alt="image.image.alt"
            />

            <div
              class="col-12 pb-3 pt-1 caption d-flex justify-content-between"
            >
              <span
                >{{ product.data.name[0].text }},
                <span>{{ product.data.type[0].text }}</span></span
              >
              <span v-if="dataStore.selectedCurrencyState === 'eur'"
                >€{{ product.data.euro }}</span
              >
              <span v-if="dataStore.selectedCurrencyState === 'gbp'"
                >£{{ product.data.pound }}</span
              >
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDataStore } from "~/stores/store";
import { storeToRefs } from "pinia";
const dataStore = useDataStore();
const { getPrismicData } = storeToRefs(dataStore);

const products = ref();
products.value = getPrismicData.value;

const orderedArtworks = ref({ left: [], right: [] });

onMounted(() => {
  layout();
});

function layout() {
  for (let i = 0; i < products.value.length; i++) {
    if (i % 2 == 0) {
      orderedArtworks.value.left.push(products.value[i]);
    } else {
      orderedArtworks.value.right.push(products.value[i]);
    }
  }
}

function imageRatio(e) {
  let height = e.dimensions.height;
  let width = e.dimensions.width;
  let ratio = width / height;
  let maxHeight = (window.innerHeight / 100) * 85;

  return {
    "max-height": maxHeight + "px",
    "max-width": maxHeight * ratio + "px",
  };
}
</script>

<style scoped>
.caption {
  font-size: 0.85rem;
  color: #5b5b5b;
  text-decoration: none;
}
a {
  color: #5b5b5b;
  text-decoration: none;
}
</style>