import {ref} from "vue";

export const useMenu = () => {

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
}