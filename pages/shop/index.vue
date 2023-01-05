<template>
  <div class="container mb-2 mb-md-5 mt-md-5 mt-sm-0 pb-4 pt-5 mt-2">
    <div class="row justify-content-start">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="col-12 col-sm-12 col-md-6 col-lg-4 mb-5"
      >
        <NuxtLink
          :to="'/shop/' + product.uid"
          tag="div"
          class="row justify-content-center align-items-center project-wrapper"
          @mouseenter="addQuickFade"
        >
          <div
            class="position-relative"
            :width="product.data.image.dimensions.width"
            :height="product.data.image.dimensions.height"
          >
            <img
              class="img-fluid project-image lazyload"
              :data-src="product.data.image.url"
              data-expand="-20"
              alt=""
              @mouseenter="addQuickFade"
              :width="product.data.image.dimensions.width"
              :height="product.data.image.dimensions.height"
            />
            <img
              v-if="product.inventory === 0"
              class="sold-out"
              src="/img/shop/sold-out.png"
              alt=""
            />
          </div>

          <div class="my-2">
            <div class="col">
              <p class="title-text text-center m-0 mt-2 text-wrapper">
                {{ product.data.name[0].text }}
              </p>
            </div>
            <div class="col">
              <p class="title-type text-center m-0 mt-2 text-wrapper">
                {{ product.data.type[0].text }}
              </p>
            </div>
            <div class="col">
              <p class="title-year text-center mt-2 m-0 text-wrapper">
                <span v-show="selectedCurrencyState === 'eur'"
                  >€{{ product.data.euro }}</span
                >
                <span v-show="selectedCurrencyState === 'gbp'"
                  >£{{ product.data.pound }}</span
                >
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import mockStockInventory from "~/assets/mock-stock.json";
import useCurrency from "~/assets/currency";

const products = ref([]);
const stockInventory = ref({});
const inStock = ref([]);
const shopData = ref();

const { selectedCurrencyState, fetchCurrency } = useCurrency();

fetchCurrency();

function filterItemsArrayIfPresentInAnotherArray(array1, array2) {
  return array1.filter((obj) => {
    return array2.some((obj2) => {
      return obj.id === obj2.id;
    });
  });
}

const getSnipcartInventory = async () => {
  // const response = await fetch(
  //   "https://roxanakenjeeva.com/.netlify/functions/snipcart-inventory"
  // ).then((response) => response.json());
  // stockInventory.value = JSON.stringify(response);
  // let newData = JSON.parse(stockInventory.value);

  // Remove after test
  let mockData = JSON.stringify(mockStockInventory);
  let newData = JSON.parse(mockData);

  let result = newData.filter((obj) => {
    return obj.inventory !== 0;
  });
  inStock.value = result;
};

getSnipcartInventory();

const { client } = usePrismic();
const { data: data } = await useAsyncData("data", async () =>
  client.getAllByType("product")
);

function sortData() {
  let fetchedData = data.value;

  // fetchedData
  //   .sort((a, b) => {
  //     return a.data.year - b.data.year;
  //   })
  //   .reverse();

  products.value = filterItemsArrayIfPresentInAnotherArray(
    fetchedData,
    inStock.value
  );
}

sortData();

function addQuickFade(e) {
  e.target.classList.add("project-image-quick-fade");
}
</script>


<style scoped>
.sold-out {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
}
.project-wrapper:hover .text-wrapper {
  color: #feb100;
}
.project-wrapper:hover .title-text {
  color: #feb100;
}

.project-wrapper:hover .project-image {
  opacity: 0.9;
}

.text-wrapper {
  transition: all 0.2s ease;
}

.project-image {
  transition: opacity 2s ease;
}

.project-image-quick-fade {
  transition: all 0.2s ease !important;
}

.title-text,
.title-type .title-year {
  z-index: -1;
  color: rgb(46, 46, 46);
}

.title-text {
  white-space: normal !important;
  font-weight: bold;
}
.title-type {
  font-weight: normal;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>