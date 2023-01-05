<template>
  <div class="icons">
    <Swiper
      v-if="isDataLoaded"
      :slidesPerView="5"
      :spaceBetween="0"
      :allowTouchMove="false"
      :loop="true"
      :slideToClickedSlide="true"
      :centeredSlides="true"
      :initialSlide="page"
      class="dropshadow"
    >
      <SwiperSlide
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        class="d-flex justify-content-center"
      >
        <nuxt-link :to="'/projects/'+ post.uid">
          <img class="img-fluid" :src="post.data.icon.url" alt=""
        /></nuxt-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
export default {
  name: "ProjectLooper",

  data() {
    return {
      posts: [],
      icon: [],
      otherPages: [],
      amountOfPosts: null,
      nextIndex: 0,
      previousIndex: 0,
      currentPage: "",
      pageComingUp: "",
      uidNext: "",
      uidPrevious: "",
      page: 0,
      isDataLoaded: false,
    };
  },
  methods: {
    async getPosts() {
      const response = await this.$prismic.client.query("");

      const search = function (anyArray, searchTerm) {
        return anyArray.filter((obj) => {
          if (obj.type === searchTerm) {
            return obj;
          }
          return false;
        });
      };
      const case1 = search(response.results, "post");

      case1
        .sort((a, b) => {
          return a.data.year - b.data.year || a.data.month - b.data.month;
        })
        .reverse();

      this.posts = case1;

      const myPosts = this.posts.map((row) => row.uid);

      for (var i = 1; i < myPosts.length; i++) {
        this.otherPages = myPosts;
      }
      this.amountOfPosts = this.otherPages.length;
      this.updateIcon();
    },
    updateIcon() {
      let postsArr = Object.values(this.posts);

      const index = postsArr.findIndex(
        (post) => post.uid === this.$route.params.uid
      );

      this.page = index;
      this.isDataLoaded = true;
      if (process.client) {
        window.scrollTo(0, 0);
      }
    },

    nextPage() {
      this.currentPage = this.$route.params.uid;
      this.nextIndex = this.otherPages.indexOf(this.currentPage);

      this.nextIndex++;

      if (this.nextIndex >= this.amountOfPosts) {
        this.nextIndex = 0;
      }
      this.pageComingUp = this.otherPages[this.nextIndex];

      this.uidNext = this.pageComingUp;
    },
    previousPage() {
      this.currentPage = this.$route.params.uid;
      this.previousIndex = this.otherPages.indexOf(this.currentPage);

      this.previousIndex--;

      if (this.previousIndex === -1) {
        this.previousIndex = this.amountOfPosts - 1;
      }
      this.pageComingUp = this.otherPages[this.previousIndex];

      this.uidPrevious = this.pageComingUp;
    },
  },
  watch: {
    $route() {
      this.updateIcon();
    },
  },

  created() {
    this.getPosts();
  },
};
</script>

<style scoped>
.router-link-active {
  filter: invert(61%) sepia(73%) saturate(592%) hue-rotate(359deg)
    brightness(103%) contrast(103%);
}

.icons {
  z-index: 100;
  position: fixed;
  padding-bottom: 0px;
  bottom: 0;

  width: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
}

@media (min-width: 769px) {
  .icons {
    padding-bottom: 8px;
    position: fixed;
    width: 80%;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

.icons img {
  width: 60px;
}

a {
  color: #000;
  text-decoration: none;
}
</style>

