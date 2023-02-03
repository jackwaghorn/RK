<template>
  <div class="container-fluid pt-5 mt-2 mt-md-0 pb-5">
    <div class="row">
      <div class="col-md-6 col-12 pe-md-2">
        <div v-for="(product, index) in left" :key="index" class="col-12">
          <router-link :to="`/shop/${product.uid}`">
            <img
              data-expand="-30"
              :src="`${product.data.gallery[0].image1.url}?&q=0?fit=clip&h=80&w=80`"
              class="img-fluid lazyload blur-up"
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
        <div v-for="(product, index) in right" :key="index" class="col-12">
          <router-link :to="`/shop/${product.uid}`">
            <img
              data-expand="-30"
              :src="`${product.data.gallery[0].image1.url}?&q=0?fit=clip&h=80&w=80`"
              class="img-fluid lazyload blur-up"
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
const dataStore = useDataStore();

const left = ref([]);
const right = ref([]);

const { client } = usePrismic();
const { data: products } = await useAsyncData(
  "products",
  () => client.getAllByType("product"),
  {
    transform: (response) => {
      for (let i = 0; i < response.length; i++) {
        if (i % 2 == 0) {
          left.value.push(response[i]);
        } else {
          right.value.push(response[i]);
        }
      }
    },
  }
);

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