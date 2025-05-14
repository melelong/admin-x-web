import { defineStore } from 'pinia'
import {ref} from "vue";

export const useMenuStore = defineStore('menu', () => {
    const quickMenuList = ref([])

    const add = (menu) => {
        quickMenuList.value.push({
            name: menu.name,
            title: menu.meta.title,
        })
    }

    return {
        add,
        quickMenuList,
    }
})