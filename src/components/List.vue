<script setup>
import { ref, computed, watch } from 'vue'
import { useListsStore } from '@/stores/lists'
import Item from './Item.vue'

const props = defineProps({
  list: {
    type: Object,
  }
})

const listsStore = useListsStore()

function collapseList() {
  const id = props.list.id
  listsStore.collapseList(id)
}

const getChevronRotation = computed(() => props.list.collapsed ? null : "90")
const currentList = computed(() => listsStore.getListById(props.list.id))

const amountOfItems = computed(() => listsStore.getAmountOfItems(currentList))
const amountOfCheckedItems = computed(() => listsStore.getAmountOfCheckedItems(currentList))
const isAllItemsChecked = computed(() => amountOfItems.value === amountOfCheckedItems.value)

const isIndeterminate = computed(() => amountOfCheckedItems.value > 0 && amountOfCheckedItems.value != currentList.value.items.length)
const isListChecked = ref(false)

watch(amountOfCheckedItems, () => {
  if (isAllItemsChecked.value) {
    isListChecked.value = isAllItemsChecked.value
  }
  if (amountOfCheckedItems.value === 0) {
    isListChecked.value = false
  }
})

watch(isListChecked, () => {
  listsStore.setItemsChecked(props.list.id, isListChecked.value)
})
</script>

<template>
  <div class="flex flex-row m-2 p-2 items-center">
    <font-awesome-icon 
      @click="collapseList()" 
      class="cursor-pointer" 
      icon="fa-solid fa-chevron-right" 
      size="sm" 
      :rotation="getChevronRotation"
    />
    <input v-model="isListChecked" :indeterminate.prop="isIndeterminate" type="checkbox" class="mx-3">
    <p>{{ props.list.title }}</p>
  </div>
  <div v-if="!props.list.collapsed" class="flex flex-col px-12">
    <Item v-for="item in props.list.items" :item="item"/>
  </div>
</template>

<style scoped>
</style>
