<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { useTabsStore } from '@/store/modules/tabsStore';
  import MenuRecursive from './MenuRecursive.vue';

  const tabsStore = useTabsStore();
  const activeTab = computed(() => tabsStore.activeTab);
  const router = useRouter();
  const menuRoutes = computed(() => {
    return router.options.routes;
  });
  const handleMenuClick = ({ key }: { key: string }) => {
    tabsStore.setActiveTab(key);
    router.push(key);
  };
</script>

<template>
  <a-menu
    class="h-[calc(100vh-64px)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    theme="dark"
    mode="inline"
    :selectedKeys="[activeTab]"
    @click="handleMenuClick"
  >
    <MenuRecursive :routes="menuRoutes" />
  </a-menu>
</template>
