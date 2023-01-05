<template>
  <div class="container-md my-md-5 my-0 pt-5 mt-5">
    <div class="row justify-content-around">
      <div class="col-12 col-md-6 mb-5 mb-md-0 pb-md-0 order-md-last">
        <div class="row sticky-guy">
          <div class="col-12">
            <UiSkeletonBox v-if="!textLoaded" :min-width="20" :max-width="40" />
            <h6 v-if="textLoaded" class="m-0 title-text">
              {{ data.data.name[0].text }}
            </h6>
          </div>

          <div class="col-12 mt-3">
            <UiSkeletonBox v-if="!textLoaded" :min-width="20" :max-width="20" />
            <p v-if="textLoaded" class="m-0 title-type">
              {{ data.data.type[0].text }}
            </p>
          </div>
          <div class="col-12">
            <UiSkeletonBox v-if="!textLoaded" :min-width="10" :max-width="20" />
            <p v-if="textLoaded" class="yeartext m-0">
              {{ data.data.format[0].text }}
            </p>
          </div>

          <div class="col-12 mt-4">
            <div v-if="!textLoaded">
              <UiSkeletonBox :min-width="60" :max-width="72" />
              <UiSkeletonBox :min-width="63" :max-width="70" />
              <UiSkeletonBox :min-width="62" :max-width="69" />
            </div>
            <prismic-rich-text
              v-if="textLoaded"
              :field="data.data.description"
            />
          </div>

          <div class="col-12 my-1 price">
            <UiSkeletonBox v-if="!textLoaded" :min-width="8" :max-width="15" />

            <h6 v-if="textLoaded" class="m-0">
              <span v-if="selectedCurrencyState === 'eur'">€{{ euro }}</span>
              <span v-if="selectedCurrencyState === 'gbp'">£{{ pound }}</span>
            </h6>
          </div>
          <div class="col-12 mt-3" v-if="currentStock > 0">
            <label for="quantity" class="yeartext">Quantity:</label>
          </div>

          <div class="col-12" v-if="currentStock > 0">
            <div class="quantity-toggle">
              <button @click="decrement()">
                <img
                  class="quantity-button"
                  src="@/img/shop/minus.png"
                  alt=""
                />
              </button>
              <h6 class="m-0">
                <input
                  type="number"
                  v-model="quantity"
                  min="1"
                  max="10"
                  :placeholder="quantity"
                />
              </h6>
              <button @click="increment()">
                <img class="quantity-button" src="@/img/shop/plus.png" alt="" />
              </button>
            </div>
          </div>
          <div class="col-12 mt-4" v-if="currentStock > 0">
            <button
              class="snipcart-add-item p-0"
              :data-item-id="id"
              :data-item-price="price"
              data-item-url="https://roxanakenjeeva.com/"
              :data-item-weight="data.data.weight"
              :data-item-description="data.data.description[0].text"
              :data-item-name="data.data.name[0].text"
              :data-item-image="data.data.image.url"
              data-item-custom1-name="Format"
              data-item-custom1-type="readonly"
              :data-item-custom1-value="data.data.format[0].text"
              :data-item-quantity="quantity"
            >
              <div class="cart-button add-to">Add to Cart</div>
            </button>
          </div>
          <div class="col-12 p-0" v-if="currentStock === 0">
            <img
              src="@/img/shop/sold-out.png"
              class="img-fluid sold-out"
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        class="col-12 col-md-6 order-md-first"
        :class="{ 'mb-4 pb-5': multipleImages }"
      >
        <div
          v-for="(image, index) in gallery"
          :key="index"
          class="photo d-flex justify-content-center"
          :class="{ 'mt-3 pt-3': addPadding(index) }"
        >
          <img
            :src="image.image1.url"
            alt=""
            class="img-fluid img-background"
            :style="imageRatio(image)"
            :height="image.image1.dimensions.height"
            :width="image.image1.dimensions.width"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mockStockInventory from "~/assets/mock-stock.json";
import useCurrency from "~/assets/currency";

const { selectedCurrencyState, fetchCurrency } = useCurrency();

const product = ref({});
const multipleImages = ref(false);
const textLoaded = ref(false);
const uid = useRoute().params.uid;
const id = ref([]);

const windowRatio = 1;
const quantity = ref(1);
const stockInventory = ref({});
const outOfStock = ref([]);
const price = ref([]);
const euro = ref([]);
const pound = ref([]);
const title = ref([]);
const currentStock = ref([]);
const gallery = ref([]);

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
    return obj.id === id.value;
  });

  currentStock.value = result[0].inventory;
};



function sortData() {
  id.value = data.value.id;
  euro.value = data.value.data.euro;
  pound.value = data.value.data.pound;
  title.value = data.value.data.name[0].text;
  fetchCurrency();
  if (selectedCurrencyState.value === "eur") {
    price.value = euro.value;
  }
  if (selectedCurrencyState.value === "gbp") {
    price.value = pound.value;
  }

  if (data.value.data.gallery.length > 1) {
    multipleImages.value = true;
  }
  gallery.value = data.value.data.gallery;
  getSnipcartInventory();
  textLoaded.value = true;
}
const { client } = usePrismic();
const { data: data } = await useAsyncData("data", async () =>
  client.getByUID("product", uid)
);
sortData();

function increment() {

  if (quantity === 20) {
    return;
  } else {
    quantity.value++;
  }
}

function decrement() {
  if (quantity === 1) {
    return;
  } else {
    quantity.value--;
  }
}
function imageRatio(e) {
  if (process.client) {
    if (window.innerWidth < 992) {
      return;
    } else {
      let height = e.image1.dimensions.height;
      let width = e.image1.dimensions.width;
      let ratio = width / height;
      let maxHeight = (window.innerHeight / 100) * 75;

      if (ratio < 1) {
        return {
          "max-height": maxHeight + "px",
          "max-width": maxHeight * ratio + "px",
        };
      } else return;
    }
  }
}
function addPadding(el) {
  if (el > 0) {
    return true;
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

@media (hover: hover) and (pointer: fine) {
  .add-to:hover {
    color: #feb100;
  }
  .quantity-button:hover {
    filter: invert(81%) sepia(72%) saturate(4983%) hue-rotate(359deg)
      brightness(104%) contrast(102%);
  }
}

.quantity-button {
  width: 15px;
  padding: 0;
}
.sold-out {
  width: 150px;
}

.quantity-toggle {
  display: flex;
}

.quantity-toggle input {
  border: 0;
  background: none;

  text-align: center;
}

.quantity-toggle button {
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
}

.cart-button {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../img/shop/add-to-cart.png");
  padding: 2px 14px 2px 14px;
  transition: opacity 0.2s ease;
}

button {
  border: none;
  background-color: rgba(255, 255, 255, 0);
  color: black;
  padding-top: 3px;
  transition: color 0.2s ease;
}

.title-text {
  font-weight: bold;
  color: rgb(46, 46, 46);
}
.photo {
  scroll-snap-align: start;
  top: 72px;
}

.img-max {
  max-height: 83.5vh;
}

.img-background {
  background-color: rgba(148, 148, 148, 0.63);
}

.sticky-guy {
  position: sticky;
  top: 120px;
}
.title-type {
  color: grey;
}

.yeartext {
  color: grey;
}
</style>

