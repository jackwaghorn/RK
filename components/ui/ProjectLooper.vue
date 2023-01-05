<template>
  <div>
    <div class="arrow left">
      <NuxtLink tag="div" :to="uidPrevious">
        <img class="img-fluid" src="/img/nav/arrow-left.png" alt="" />
      </NuxtLink>
    </div>
    <div class="arrow right">
      <NuxtLink tag="div" :to="uidNext">
        <img class="img-fluid" src="/img/nav/arrow-right.png" alt="" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectLooper",

  data() {
    return {
      hovering: null,
      linkResolver: this.$prismic.linkResolver,
      posts: [],
      otherPages: [],
      amountOfPosts: null,
      nextIndex: 0,
      previousIndex: 0,
      currentPage: "",
      pageComingUp: "",
      uidNext: "",
      uidPrevious: "",
    };
  },
  methods: {
    getPosts() {
      //Query to get blog posts
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "post"))
        .then((response) => {
          this.posts = response.results;
          const myPosts = this.posts.map((row) => row.uid);

          for (var i = 1; i < myPosts.length; i++) {
            this.otherPages = myPosts;
          }
          this.amountOfPosts = this.otherPages.length;

          this.nextPage();
          this.previousPage();
        });
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
      console.log(this.uidPrevious)
    },
    hoveringOver(el) {
      this.hovering = el;
    },
  },
  watch: {
    $route() {
      this.nextPage();
      this.previousPage();
    },
  },
  created() {
    console.log('help')
    this.getPosts();
  },
};
</script>

<style scoped>
.arrow {
  width: 60px;
}

.left {
  margin:0 auto;
  position:fixed;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left:0;
}
.right {
  right: 0;
  margin:0 auto;
  position:fixed;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  
}

a {
  color: #000;
  text-decoration: none;
}
a:hover {
  pointer-events: pointer !important;
  filter: invert(84%) sepia(40%) saturate(6018%) hue-rotate(358deg)
    brightness(104%) contrast(105%);
}
</style>

