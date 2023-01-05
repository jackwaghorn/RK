<template>
  <div class="container mb-2 mb-md-5 mt-md-5 mt-sm-0 pb-4">
    <div class="row justify-content-start">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        :id="product.id"
        ref="post"
        :post="index"
        class="col-12 col-sm-12 col-md-6 col-lg-4 mb-5"
      >
        <router-link
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
              class="img-fluid lazyload project-image"
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
                <span v-if="selectedCurrencyState === 'eur'"
                  >€{{ product.data.euro }}</span
                >
                <span v-if="selectedCurrencyState === 'gbp'"
                  >£{{ product.data.pound }}</span
                >
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import useTodos from "@/currency";

export default {
  name: "TheShop",
  setup() {
    const { selectedCurrencyState, fetchTodos } = useTodos();

    fetchTodos();

    return {
      selectedCurrencyState,
    };
  },

  data() {
    return {
      products: [],
      linkResolver: this.$prismic.linkResolver,
      isLoaded: false,
      shop: "/shop/",
      stockInventory: {},
      outOfStock: [],
    };
  },
  methods: {
    getPosts() {
      this.$prismic.client
        .get({
          predicates: this.$prismic.predicate.at("document.type", "product"),
        })
        .then((response) => {
          const data = response.results;
          data
            .sort((a, b) => {
              return a.data.year - b.data.year;
            })
            .reverse();

          this.products = data.map((t1) => ({
            ...t1,
            ...this.outOfStock.find((t2) => t2.id === t1.id),
          }));

          this.getInventory();
        });
    },
    async getInventory() {
      const response = await fetch(
        "https://roxanakenjeeva.com/.netlify/functions/snipcart-inventory"
      ).then((response) => response.json());
      this.stockInventory = JSON.stringify(response);
      let newData = JSON.parse(this.stockInventory);

      // Remove after test
      // let mockData = JSON.stringify(this.mockStockInventory);
      // let newData = JSON.parse(mockData);

      let result = newData.filter((obj) => {
        return obj.inventory === 0;
      });

      this.outOfStock = result;
    },

    updateBasket() {},
    addQuickFade(e) {
      e.target.classList.add("project-image-quick-fade");
    },
  },

  created() {
    this.getPosts();
    this.updateBasket();
  },
};
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