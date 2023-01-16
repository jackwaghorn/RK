<template>
  <div class="mt-2">
    {{ product }}
  </div>
</template>
<script setup>
const route = useRoute();
// const props = defineProps(["tab"]);

const { client } = usePrismic();
const { data: product } = await useAsyncData("product", () =>
  client.getByUID("product", route.params.uid)
);
</script>

