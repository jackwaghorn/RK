<template>
  <div class="container-md mb-2 mt-md-5 mt-sm-0 observer-root">
    <!-- Filter buttons  -->
    <div class="categories">
      <div class="row justify-content-center">
        <input type="checkbox" id="all" @click="setFilter" />

        <div class="col-auto m-1 position-relative">
          <input type="checkbox" id="artwork" @click="setFilter" />
          <span>{{ filters.artwork ? "&#10005;" : "" }} artwork</span>
          <label
            for="artwork"
            :class="{ 'active-filter': filters.artwork }"
            class="category-filter category artwork px-3"
          >
            {{ filters.artwork ? "&#10005;" : "" }} artwork</label
          >
        </div>
        <div class="col-auto m-1 position-relative">
          <input type="checkbox" id="moving" @click="setFilter" />
          <span>{{ filters.moving ? "&#10005;" : "" }} moving-image</span>
          <label
            for="moving"
            :class="{ 'active-filter': filters.moving }"
            class="category-filter category moving px-3"
          >
            {{ filters.moving ? "&#10005;" : "" }} moving-image</label
          >
        </div>
        <div class="col-auto m-1 position-relative">
          <input type="checkbox" id="illustration" @click="setFilter" />
          <span>{{ filters.illustration ? "&#10005;" : "" }} illustration</span>
          <label
            for="illustration"
            :class="{ 'active-filter': filters.illustration }"
            class="category-filter category illustration px-3"
          >
            {{ filters.illustration ? "&#10005;" : "" }} illustration</label
          >
        </div>
              <div class="col-auto m-1 position-relative">
          <input type="checkbox" id="graphics" @click="setFilter" />
          <span>{{ filters.graphics ? "&#10005;" : "" }} graphics</span>
          <label
            for="graphics"
            :class="{ 'active-filter': filters.graphics }"
            class="category-filter category graphics px-3"
          >
            {{ filters.graphics ? "&#10005;" : "" }} graphics</label
          >
        </div>
      </div>
    </div>
    <!-- Project items  -->
    <div class="row d-flex justify-content-center">
      <router-link
        :to="'/projects/' + post.uid"
        tag="div"
        ref="post"
        v-for="(post, index) in filteredProjects"
        :key="post.id"
        :id="post.id"
        :post="index"
        class="col-md-6 col-12 row d-flex justify-content-center mb-5"
        @mouseenter="addQuickFade"
      >
        <div class="col-md-10 col-12 position-relative p-0">
          <div
            :style="{ backgroundImage: 'url(' + post.data.image.url + ')' }"
            class="project-image ratio ratio-16x9"
          ></div>
          <!-- <img
            :width="post.data.image.dimensions.width"
            :height="post.data.image.dimensions.height"
            class="img-fluid lazyload project-image p-0 ratio ratio-16x9"
            :data-src="post.data.image.url"
            data-expand="-20"
            alt=""
          /> -->
          <div
            class="
              container-fluid
              project-icon
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <img
              :width="post.data.image.dimensions.width"
              :height="post.data.image.dimensions.height"
              class="img-fluid lazyload icon-image"
              :data-src="post.data.icon.url"
              data-expand="0"
              alt=""
            />
          </div>
        </div>

        <div class="col-md-10 col-12 p-0 m-0 mt-1">
          <SkeletonBox v-if="textLoaded" :min-width="20" :max-width="40" />
          <h6 v-if="!textLoaded" class="m-0 title-text turnorange">
            {{ post.data.title[0].text }}
          </h6>
        </div>

        <div class="col-md-10 col-12 p-0 m-0 yeartext">
          <SkeletonBox v-if="textLoaded" :min-width="8" :max-width="15" />
          <p v-if="!textLoaded" class="m-0 turnorange">
            {{ post.data.year }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",

  data() {
    return {
      hovering: null,
      filters: {
        all: true,
        moving: false,
        illustration: false,
        artwork: false,
        graphics: false,
      },
      posts: [],
      textLoaded: true,
      linkResolver: this.$prismic.linkResolver,
      hover: -1,
      isLoaded: false,
      currentHover: 100,
    };
  },
  methods: {
    getPosts() {
      this.$prismic.client
        .get({
          predicates: this.$prismic.predicate.at("document.type", "post"),
          // orderings: "[my.post.year desc, my.post.month desc]",
        })
        .then((response) => {
          this.posts = response.results;
          this.posts
            .sort((a, b) => {
              return a.data.year - b.data.year || a.data.month - b.data.month;
            })
            .reverse();
                  this.textLoaded = false;
        });
    },
    postClass(index) {
      if (this.centerClass.includes(index)) return "justify-content-sm-center";
      else if (this.leftClass.includes(index))
        return "justify-content-sm-center";
      else if (this.rightClass.includes(index))
        return "justify-content-sm-center";
    },
    landscapePortrait(width, height) {
      if (width > height) return "col-sm-5";
      else return "col-sm-5";
    },
    minusOffsetTop(index) {
      if (index > 0) return "";
      else return "";
    },
    hoveringOver(el) {
      this.hovering = el;
    },
    addQuickFade(e) {
      e.target.classList.add("project-wrapper");
    },
    setFilter(event) {
      window.scrollTo(0, 0);
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };

      // select only one
      let updatedFiltersArray = [];

      for (let item in updatedFilters) {
        updatedFiltersArray.push({
          item,
          value: updatedFilters[item],
        });
      }
      updatedFiltersArray.forEach((item) => {
        if (inputId === item.item) {
          item.value === !item.value;
        }
        if (item.item === "all") {
          item.value = false;
        }
        if (updatedFiltersArray.every((v) => v.value === false)) {
          if (item.item === "all") {
            item.value = true;
          }
        }
      });

      let object = {};
      for (let i = 0; i < updatedFiltersArray.length; i++) {
        object[updatedFiltersArray[i].item] = updatedFiltersArray[i].value;
      }
      this.filters = object;
    },
  },
  computed: {
    filteredProjects() {
      const posts = this.posts;

      return posts.filter((post) => {
        if (
          this.filters.illustration &&
          post.data.category.some((e) => e.category_option === "illustration")
        ) {
          return true;
        }
        if (
          this.filters.moving &&
          post.data.category.some((e) => e.category_option === "moving-image")
        ) {
          return true;
        }
        if (
          this.filters.artwork &&
          post.data.category.some((e) => e.category_option === "artwork")
        ) {
          return true;
        }
        if (
          this.filters.graphics &&
          post.data.category.some((e) => e.category_option === "graphics")
        ) {
          return true;
        }
        if (this.filters.all) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style scoped>
/* .observable {
  filter: blur(10px);
}

.in-sight {
  filter: blur(0px);
} */

.project-icon {
  z-index: -1;
  background-color: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
.yeartext {
  color: grey;
}

.icon-image {
  width: 70px;
}

@media (hover: hover) and (pointer: fine) {
  .project-wrapper:hover {
    color: #feb100;
  }
  .project-wrapper:hover .turnorange {
    color: #feb100 !important;
  }

  .project-wrapper:hover .project-image {
    opacity: 0;
  }
  .col-auto:hover span {
    color: #feb100 !important;
  }
  .col-auto:hover .category {
    color: transparent !important;
  }

  .category-filter:hover {
    cursor: pointer;
    color: #feb100 !important;
  }
}
.active-filter {
  filter: saturate(100%) brightness(100%) contrast(100%) !important;
}

.project-image {
  transition: all 0.2s ease !important;
}

.project-wrapper {
  transition: all 0.2s ease !important;
}

.project-image {
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  background-color: rgba(148, 148, 148, 0.63);
}

.categories {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 2px;
  padding-top: 2px;
  z-index: 10;
}

@media (min-width: 769px) {
  .categories {
    left: 150px;
    right: 150px;
    bottom: 20px;
  }
}

.category {
  filter: saturate(0%) brightness(60%) contrast(1000%);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-weight: 500;
  line-height: 1.8;
  color: transparent;
  text-transform: uppercase;
}

span {
  text-transform: uppercase;
  pointer-events: none;
  left: 0;
  right: 0;
  top: 2px;
  bottom: 0;
  margin: 0;
  text-align: center;
  position: absolute;
  z-index: 2;
}

.illustration {
  background-image: url("../../img/filter-bw/publication.png");
}

.moving {
  background-image: url("../../img/filter-bw/collage.png");
}

.artwork {
  background-image: url("../../img/filter-bw/artwork.png");
}
.graphics {
  background-image: url("../../img/filter-bw/moving.png");
}

input {
  appearance: none;
  display: none;
}

.title-text,
.title-year {
  text-align: left;

  color: rgb(46, 46, 46);
}

.title-text {
  white-space: normal !important;
  font-weight: bold;
}
.title-year {
  right: 0;
  left: 0;
  margin: 0 auto;
  position: absolute;
  bottom: 20px;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>

