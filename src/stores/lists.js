import { defineStore } from "pinia";
import { lists } from '../assets/lists' // моковые данные

export const useListsStore = defineStore('lists', {
  state: () => ({
    lists: lists,
    formattedSelectedLists: [],
  }),
  getters: {
    getListById: (state) => {
      return (id) => state.lists.find(list => list.id === id)
    },
    getAmountOfCheckedItems: () => {
      return (list) => list.value.items.filter((item) => item.checked).length
    },
    getAmountOfItems: () => {
      return (list) => list.value.items.length
    },
    getSelectedLists: (state) => {
      return state.lists.filter((list) => {
        if (list.checked) return true
        
        let haveAnyCheckedItems = false
        list.items.forEach(item => {
          if (item.checked) {
            haveAnyCheckedItems = true
          }
        })

        if (haveAnyCheckedItems) return true
      })
    },
    getListItems: (state) => {
      return (id) => state.lists.find(list => list.id === id).items
    },
    getFormatSelectedLists(state) {
      let selectedLists = this.getSelectedLists

      state.formattedSelectedLists = selectedLists.map((list) => {
        return {
          id: list.id,
          title: list.title,
          items: list.items.filter(item => item.checked)
        }
      })
      return state.formattedSelectedLists
    },
  },
  actions: {
    collapseList(id) {
      const list = this.getListById(id)
      list.collapsed = !list.collapsed
    },
    setItemsChecked(id, isListChecked) {
      const list = this.getListById(id)
      list.checked = isListChecked
      list.items.map(item => item.checked = isListChecked)
    },
    setListChecked(id, isAllItemsChecked) {
      const list = this.getListById(id)
      list.checked = isAllItemsChecked
    },
    formatSelectedLists() {
      const selectedLists = this.getSelectedLists()

      this.formattedSelectedLists = selectedLists.map((list) => {
        return {
          id: list.id,
          title: list.title,
          items: list.items.filter(item => item.checked)
        }
      })
    },
    changeDisplayMode(id) {
      this.getListById(id).isSorted = !this.getListById(id).isSorted
      return this.getListById(id).isSorted
    }
  }
})