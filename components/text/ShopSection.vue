<template>
  <div class="mt-2" v-if="tab === 'shop'">
    <!-- {{ product.data.name[0].text }} -->
    <span v-if="onItem">{{ route }}</span>
  </div>
</template>
<script setup>
const route = useRoute();
const props = defineProps(["tab"]);

const onItem = ref(false);
if (route.params.uid) {
  onItem.value = true;
} else {
  onItem.value = false;
}

const { client } = usePrismic();
const { data: product } = await useAsyncData("product", () =>
  client.getByUID("product", route.params.uid)
);

//   watch(route,()=>{
// refresh()
//   })
</script>

