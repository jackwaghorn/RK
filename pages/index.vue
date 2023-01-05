<template>
  <HomeWashingline :key="componentKey" />
</template>
<script setup>
const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

onMounted(() => {
  window.addEventListener("resize", forceRerender);
});

onUnmounted(() => {
  window.removeEventListener("resize", forceRerender);
  // let oldParent = document.getElementById("parent");
  // let newParent = oldParent.cloneNode(true);
  // oldParent.parentNode.replaceChild(newParent, oldParent);
  // newParent.remove();
});
</script>
