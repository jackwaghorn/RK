<template>
<div>
  <UiIconLooper v-show="showIcons" />
  <NuxtPage />

</div>

</template>
<script>
export default {
  data() {
    return {
      showIcons: true,
    };
  },
  methods: {
    routeChange() {
      const path = this.$route.path;
      if (path === "/projects") {
        this.showIcons = false;
      } else {
        this.showIcons = true;
      }
    },
  },
  watch: {
    $route() {
      this.routeChange();
    },
  },
  created(){
    this.routeChange()
  }
};
</script>