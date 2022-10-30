<script setup>
import { useListsStore } from '@/stores/lists'

const props = defineProps({
  listId: {
    type: String
  },
  itemId: {
    type: String
  },
  amount: {
    type: Number
  },
  color: {
    type: String
  }
})

const listsStore = useListsStore()

function deleteItem(itemId) {
  listsStore.getListById(props.listId).items.find(item => item.id === itemId).amount--
}

</script>

<template>
  <div 
    @click="deleteItem(props.itemId)"
    v-for="square in props.amount"
    class="w-4 h-4 m-0.5 cursor-pointer"
    :style="{ background: props.color }"
  ></div>
</template>