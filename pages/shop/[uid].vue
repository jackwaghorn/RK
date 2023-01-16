<template>
  <div v-if="tab === 'shop'">
    <div class="mb-2 title">
      {{ data.data.name[0].text }}
    </div>

    <div class="type">
      {{ data.data.type[0].text }}
    </div>

    <div class="type mb-2">
      {{ data.data.format[0].text }}
    </div>

    <prismic-rich-text :field="data.data.description" />

    <div class="col-12 my-1 price">
      <h6 class="m-0">
        <span v-if="dataStore.selectedCurrencyState === 'eur'"
          >€{{ euro }}</span
        >
        <span v-if="dataStore.selectedCurrencyState === 'gbp'"
          >£{{ pound }}</span
        >
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
            src="~/assets/img/shop/minus.png"
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
          <img
            class="quantity-button"
            src="~/assets/img/shop/plus.png"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="col-12 mt-4" v-if="currentStock > 0">
      <button
        class="snipcart-add-item p-0"
        :data-item-id="id"
        :data-item-price="price"
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
        src="~/assets/img/shop/sold-out.png"
        class="img-fluid sold-out"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "~/stores/store";
const dataStore = useDataStore();

import { Buffer } from "buffer";

const route = useRoute();
const props = defineProps(["tab"]);

const product = ref({});
const multipleImages = ref(false);
const textLoaded = ref(false);
const uid = useRoute().params.uid;
const id = ref([]);

const windowRatio = 1;
const quantity = ref(1);
const stockInventory = ref({});
const currentStock = ref(1);
const price = ref([]);
const euro = ref([]);
const pound = ref([]);
const title = ref([]);
const thisItemOnSnipcart = ref({});
const gallery = ref([]);

const fetchInventory = async () => {
  const snipcartKey =
    "ST_YWM2YmI1NWMtOGJmYS00ZmMzLThjMmUtYzQ2ZGNiYmU1ZGRiNjM3NjYwODY0NDgzODQ2ODg4";

  const request = await useFetch("https://app.snipcart.com/api/products", {
    headers: {
      Authorization: `Basic ${Buffer.from(snipcartKey).toString("base64")}`,
      Accept: "application/json",
    },
  });

  const result = request.data.value;

  let newItems = Object.values(result.items).map((item) => {
    return {
      name: item.name,
      id: item.userDefinedId,
      inventory: item.stock,
    };
  });

  thisItemOnSnipcart.value = newItems.filter((obj) => {
    return obj.id === id.value;
  });

  if (Object.keys(thisItemOnSnipcart.value).length !== 0) {
    currentStock.value = thisItemOnSnipcart.value[0].inventory;
  }
};

function sortData() {
  id.value = data.value.id;
  euro.value = data.value.data.euro;
  pound.value = data.value.data.pound;
  title.value = data.value.data.name[0].text;
  if (dataStore.selectedCurrencyState === "eur") {
    price.value = euro.value;
  }
  if (dataStore.selectedCurrencyState === "gbp") {
    price.value = pound.value;
  }

  if (data.value.data.gallery.length > 1) {
    multipleImages.value = true;
  }
  gallery.value = data.value.data.gallery;
  fetchInventory();
  textLoaded.value = true;
}
const { client } = usePrismic();
const { data: data } = await useAsyncData("data", async () =>
  client.getByUID("product", uid)
);
dataStore.updatePrismicData(data.value);

sortData();

function increment() {
  if (quantity.value >= currentStock.value) {
    return;
  } else {
    quantity.value++;
  }
}

function decrement() {
  if (quantity.value <= 1) {
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
  background-image: url("~/assets/img/shop/add-to-cart.png");
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

.title {
  font-weight: 600;
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
.type {
  opacity: 0.5;
}
</style>

