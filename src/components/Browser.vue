<script setup>
import { ref, computed, watch } from 'vue'
import { useListsStore } from '@/stores/lists'
import shuffle from 'lodash.shuffle'
import cloneDeep from 'lodash.clonedeep'
import Square from './Square.vue';

const props = defineProps({
  list: {
    type: Object,
  }
})

const listsStore = useListsStore()

const currentList = computed(() => {
  const cloneList = cloneDeep(listsStore.getListById(props.list.id))
  cloneList.items = cloneList.items.filter((item) => item.checked)
  return cloneList
})

const buttonTitle = computed(() => currentList.value.isSorted ? 'Перемешать' : 'Сортировать')

const listItems = computed(() => listsStore.getListItems(props.list.id).filter((item) => item.checked))

const mixedItems = computed(() => {
  let mixed = shuffle(allItems.value)
  return mixed
})

const allItems = computed(() => {
  let allItems = []
  listItems.value.forEach(item => {
    let amountOfItems = item.amount
    while(amountOfItems--) {
      allItems.push({
        id: item.id,
        color: item.color
      })
    }
  })

  return allItems
})

function changeListDisplayMode() {
  listsStore.changeDisplayMode(currentList.value.id)
}
</script>

<template>
  <div class="flex flex-row justify-between items-center p-4">
    <div class="title">{{ currentList.title }}</div>
    <button
      @click="changeListDisplayMode()" 
      class="bg-sky-700 px-2 py-1 rounded-sm text-sm font-semibold"
    >{{ buttonTitle }}</button>
  </div>
  <div v-if="currentList.isSorted" class="sorted p-4">
    <div v-for="item in currentList.items" class="flex flex-row flex-wrap mb-4">
        <Square :listId="props.list.id" :itemId="item.id" :amount="item.amount" :color="item.color" />
    </div>
  </div>
  <div v-if="!currentList.isSorted" class="flex flex-row flex-wrap mixed p-4">
    <div v-for="item in mixedItems">
      <Square :listId="props.list.id" :itemId="item.id" :color="item?.color" :amount="1"/>
    </div>
  </div>
</template>

<style scoped>
</style>
