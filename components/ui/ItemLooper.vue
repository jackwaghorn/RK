<template>
  <div>
    <router-link tag="div" :to="uidPrevious" class="previous icons">
      <img class="previous" src="/img/shop/arrow-left.png" alt=""
    /></router-link>
    <router-link tag="div" class="next icons" :to="uidNext">
      <img class="next" src="/img/shop/arrow-right.png" alt=""
    /></router-link>
  </div>
</template>

<script>
export default {
  name: "ItemLooper",

  data() {
    return {
      linkResolver: this.$prismic.linkResolver,
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
    getPosts() {
      // const response = await this.$prismic.client.query("");

      // const search = function (anyArray, searchTerm) {
      //   return anyArray.filter((obj) => {
      //     if (obj.type === searchTerm) {
      //       return obj;
      //     }
      //     return false;
      //   });
      // };
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



      this.posts = data;


          const myPosts = this.posts.map((row) => row.uid);

          for (var i = 1; i < myPosts.length; i++) {
            this.otherPages = myPosts;
          }
          this.amountOfPosts = this.otherPages.length;
          this.nextPage();
          this.previousPage();

        })
    
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
      this.nextPage();
      this.previousPage();
    },
  },

  created() {
    this.getPosts();
  },
};
</script>

<style scoped>
img {
  width: 23px;
}
.icons {
  bottom: 10px;
  position: fixed;
  z-index: 20;
}
@media (hover: hover) and (pointer: fine) {

.icons:hover {
  filter: invert(81%) sepia(72%) saturate(4983%) hue-rotate(359deg)
      brightness(104%) contrast(102%);
}

}

.icons:hover {
  cursor: pointer !important;
}

.previous {
  left: 10px;
  float: left;
}

.next {
  float: right;
  right: 10px;
}

@media (min-width: 769px) {
  .icons {
    bottom: 20px;
  }

  .previous {
    left: 23%;
    float: left;
  }

  .next {
    float: right;
    right: 23%;
  }
  .bar {
    display: none;
  }
}

a {
  color: #000;
  text-decoration: none;
}
</style>

