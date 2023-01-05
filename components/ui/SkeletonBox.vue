<template>
  <span :style="{ height, width: computedWidth }" class="skeleton-box" />
</template>

<script>
export default {
  name: "SkeletonBox",
  props: {
    maxWidth: {
      // The default maxiumum width is 100%.
      default: 100,
      type: Number,
    },
    minWidth: {
      // Lines have a minimum width of 80%.
      default: 80,
      type: Number,
    },
    height: {
      // Make lines the same height as text.
      default: "1em",
      type: String,
    },
    width: {
      // Make it possible to define a fixed
      // width instead of using a random one.
      default: null,
      type: String,
    },
  },
  computed: {
    computedWidth() {
      // Either use the given fixed width or
      // a random width between the given min
      // and max values.
      return (
        this.width ||
        `${Math.floor(
          Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
        )}%`
      );
    },
  },
};
</script>

<style scoped>

.skeleton-box {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
  background-color: #f1f1f1;
}

.skeleton-box::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 250px;
    background: linear-gradient(to right, transparent 50%, #ffffff4f 100%, transparent 50%);
    animation: load 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite;
}
@keyframes load {
    from {
        left: -250px;
    }
    to   {
        left: 100%;
    }
}
</style>