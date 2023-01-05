<template>
  <div>
    <div class="basket">
      <div class="d-flex justify-content-center">
        <div class="d-flex align-items-center position-relative">
          <select
            v-model="selectedCurrencyState"
            class="cur-options dropshadow"
            name="currency"
            id="currency"
          >
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option></select
          ><i class="arrow up"></i>
        </div>

        <div class="px-4">
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
              src="/img/shop/basket.png"
              class="img-fluid basket-image"
              alt=""
            />

            <img
              v-show="basketCount > 0"
              src="/img/shop/basket-full.png"
              class="img-fluid basket-image"
              alt=""
            />
          </div>
        </div>
        <div class="d-flex align-items-center basket-count snipcart-checkout">
          <p class="m-0 p-0">
            <span class="bracket dropshadow">(</span>{{ basketCount
            }}<span class="bracket dropshadow">)</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bar"></div>
  </div>
</template>

<script>
import useCurrency from "~/assets/currency";

export default {
  name: "BasketCount",
  setup() {
    const { selectedCurrencyState, fetchCurrency } = useCurrency();

    fetchCurrency();

    return {
      selectedCurrencyState,
    };
  },

  data() {
    return {
      basketCount: 0,
    };
  },
  methods: {
    getTotalPrice() {
      window.Snipcart.store.subscribe(() => {
        this.basketCount = window.Snipcart.store.getState().cart.items.count;
      });
    },
  },

  created() {
    if (process.client) {
      document.addEventListener("snipcart.ready", () => {
        const select = document.getElementById("currency");
        Snipcart.api.session.setCurrency(this.selectedCurrencyState);
        select.addEventListener("change", () => {
          Snipcart.api.session.setCurrency(this.selectedCurrencyState);
        });
        Snipcart.events.on("item.added", () => {
          this.basketCount = Snipcart.store.getState().cart.items.count;
        });
        Snipcart.events.on("item.updated", () => {
          this.basketCount = Snipcart.store.getState().cart.items.count;
        });
        this.getTotalPrice();
      });
    }
  },
  mounted() {
    if (process.client) {
      if (localStorage.currency) {
        this.selectedCurrencyState = localStorage.currency;
      }
    }
  },
  watch: {
    selectedCurrencyState(newName) {
      if (process.client) {
        localStorage.currency = newName;
        document.addEventListener("snipcart.ready", () => {
          Snipcart.api.session.setCurrency(newName);
        });
      }
    },
  },
};
</script>

<style scoped>
.cur-options:hover {
  color: #feb100 !important;
  cursor: pointer;
}
.cur-options {
  padding-right: 20px;
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

.bar {
  z-index: 5;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 55px;

  position: fixed;
  display: block;
}

.basket {
  position: fixed;
  margin: auto;
  bottom: 10px;
  right: 0;
  left: 0;
  z-index: 10;
  width: 30%;
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
  filter: contrast(50%) brightness(130%);

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
  min-width: 40px;
  width: 40px;
}
</style>