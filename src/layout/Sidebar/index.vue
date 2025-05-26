<script setup lang="ts">
import {useRouter} from 'vue-router'
import {computed} from "vue";
import { useTabsStore } from '@store/modules/tabsStore'
import Recursive from './Recursive.vue'

const tabsStore = useTabsStore()
const activeTab = computed(() => tabsStore.activeTab)
const router = useRouter()
const menuRoutes = computed(() => router.options.routes)
const handleMenuClick = ({ key }) => {
  tabsStore.setActiveTab(key)
  router.push(key)
}
</script>

<template>
  <a-menu
      class="h-[calc(100vh-64px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      theme="dark"
      mode="inline"
      :selectedKeys="[activeTab]"
      @click="handleMenuClick"
  >
    <Recursive :routes="menuRoutes" />
  </a-menu>
</template>