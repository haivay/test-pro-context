<script setup>
const props = defineProps({
  item: {
    type: Object,
  }
})

</script>

<template>
  <div class="flex flex-row p-1 items-center justify-between">
    <div class="flex flex-row">
      <input v-model="props.item.checked" type="checkbox" class="mx-3">
      <p>{{ props.item.name }}</p>
    </div>
    <div class="flex flex-row">
      <input 
        v-model.number="props.item.amount" 
        type="text" 
        class="bg-inherit rounded-md text-center w-12 text-white hover:bg-zinc-800 transition-colors"
      >
      <input 
        v-model.lazy="props.item.color" 
        type="color" 
        class="ml-2 w-5 h-6 bg-inherit appearance-none cursor-pointer"
      >
    </div>
  </div>
</template>

<style scoped>
</style>
