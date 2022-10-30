<script setup>
import { useListsStore } from '@/stores/lists';
import { computed } from '@vue/reactivity';
import Browser from './components/Browser.vue';
import List from './components/List.vue'

const listsStore = useListsStore()

const lists = listsStore.lists
const formatedSelectedLists = computed(() => listsStore.getFormatSelectedLists)

</script>

<template>
  <div class="container mx-auto py-10">
    <div class="flex flex-row justify-between wrapper">
      <div class="w-full mr-3 bg-zinc-900 rounded-md">
        <List v-for="list in lists" :list="list"/>
      </div>
      <div class="w-full ml-3 bg-zinc-900 rounded-md">
        <Browser v-for="fList in formatedSelectedLists" :list="fList" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: fit-content;
  min-height: 90vh;
}
</style>
