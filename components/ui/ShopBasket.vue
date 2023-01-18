<template>
  <div class="basket">
    <div class="d-flex justify-content-center">
      <div class="d-flex align-items-center position-relative">
        <select
          v-model="dataStore.selectedCurrencyState"
          class="cur-options dropshadow"
          name="currency"
          id="currency"
        >
          <option value="eur">EUR</option>
          <option value="gbp">GBP</option></select
        ><i class="arrow up"></i>
      </div>

      <div class="pe-2 ps-3">
        <div
          class="
            d-flex
            justify-content-center
            align-items-center
            snipcart-checkout
          "
        >
          <img
            v-show="basketCount === 0"
            src="~/assets/img/shop/basket.svg"
            class="img-fluid basket-image"
            alt=""
          />

          <img
            v-show="basketCount > 0"
            src="~/assets/img/shop/basket-full.svg"
            class="img-fluid basket-image"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "~/stores/store";
const dataStore = useDataStore();

dataStore.updateCurrency();

const basketCount = ref(0);

function getTotalPrice() {
  window.Snipcart.store.subscribe(() => {
    basketCount.value = window.Snipcart.store.getState().cart.items.count;
  });
}

onMounted(() => {
  if (process.client) {
    document.addEventListener("snipcart.ready", () => {
      //   Set Snipcart currency & listen for dropdown changes
      const select = document.getElementById("currency");
      Snipcart.api.session.setCurrency(dataStore.selectedCurrencyState);
      select.addEventListener("change", () => {
        Snipcart.api.session.setCurrency(dataStore.selectedCurrencyState);
      });
      //   Listen for items added to basket
      Snipcart.events.on("item.added", () => {
        basketCount.value = Snipcart.store.getState().cart.items.count;
      });
      Snipcart.events.on("item.updated", () => {
        basketCount.value = Snipcart.store.getState().cart.items.count;
      });
      getTotalPrice();
    });
  }
});

// watch(selectedCurrencyState, (newName) => {
//   if (process.client) {
//     localStorage.currency = newName;
//     document.addEventListener("snipcart.ready", () => {
//       Snipcart.api.session.setCurrency(newName);
//     });
//   }
// });
</script>

<style scoped>
.cur-options:hover {
  color: #feb100 !important;
  cursor: pointer;
}
.cur-options {
  padding-right: 16px;
}

.arrow {
  pointer-events: none;
  right: 0;
  position: absolute;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  margin: 2px 2px 0 5px;
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

select {
  background: transparent;
  appearance: none;
  border: none;
  outline: 0;
}

.basket {
  width: 8rem;
}
@media (min-width: 768px) {
  .basket {
    bottom: 20px;
  }
  .bar {
    display: none;
  }
}
.snipcart-checkout {
  transition: all 0.3s ease;
}
.basket-image:hover {
  filter: invert(68%) sepia(85%) saturate(1612%) hue-rotate(331deg) brightness(104%) contrast(101%);

  cursor: pointer;
}

.basket-button:hover span {
  cursor: pointer;
  color: #feb100 !important;
}

.basket-count {
  color: #feb100;
  font-weight: bold;
}

.basket-count span {
  color: black;
}

.basket-image {
  min-width: 36px;
  width: 36px;
}
</style>