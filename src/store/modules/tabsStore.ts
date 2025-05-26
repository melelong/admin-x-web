import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTabsStore = defineStore('tabs', () => {
    const tabs = ref([])
    const activeTab = ref('')
    const homeTab = ref({
        path: '/',
        title: '首页',
        closable: false
    })

    // 初始化首页
    if (!tabs.value.length) {
        tabs.value.push(homeTab.value)
        activeTab.value = homeTab.value.path
    }

    // 添加新标签
    const addTab = (route) => {
        if (tabs.value.some(t => t.path === route.path)) return
        setActiveTab(route.path)
        tabs.value.push({
            path: route.path,
            title: route.meta?.title || '未命名',
            closable: route.path !== '/',
            icon: route.meta?.icon
        })
    }

    /** 移除标签 */
    const removeTab = (path: string) => {
        if (path === '/') return
        tabs.value = tabs.value.filter(t => t.path !== path)
    }

    /** 设置当前激活标签 */
    const setActiveTab = (path: string) => {
        activeTab.value = path
    }

    return {
        tabs,
        activeTab,
        homeTab,
        addTab,
        removeTab,
        setActiveTab
    }
})