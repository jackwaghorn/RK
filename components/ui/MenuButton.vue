<template>
  <div :class="{ open: expandMenu }" id="nav-icon4">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
export default {
  props: ["expandMenu"],
  data() {
    return {
      showMenu: this.expandMenu,
    };
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* Icon 1 */

#nav-icon4 {
  width: 40px;
  height: 25px;
  position: relative;

  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out !important;
  -moz-transition: 0.5s ease-in-out !important;
  -o-transition: 0.5s ease-in-out !important;
  transition: 0.5s ease-in-out !important;
  cursor: pointer;
}

#nav-icon4 span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #000000;

  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out !important;
  -moz-transition: 0.25s ease-in-out !important;
  -o-transition: 0.25s ease-in-out !important;
  transition: 0.25s ease-in-out !important;
}

/* Icon 4 */

#nav-icon4 {
}

#nav-icon4 span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon4 span:nth-child(2) {
  top: 12px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon4 span:nth-child(3) {
  top: 24px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#nav-icon4.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: 0px;
  left: 18px;
}

#nav-icon4.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

#nav-icon4.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 24px;
  left: 18px;
}
#nav-icon4.open span {
  width: 83%;
}
</style>