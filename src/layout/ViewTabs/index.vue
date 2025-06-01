<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue';
import { useTabsStore } from '@/store/modules/tabsStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tabsStore = useTabsStore();
const activeTab = computed(() => {
  return tabsStore.activeTab;
});
const handleChange = (key: string) => {
  tabsStore.setActiveTab(key);
  router.push(key);
};
const handleDel = (path: string) => {
  tabsStore.removeTab(path);
};
</script>

<template>
  <div class="view-tabs-container px-8px h-40px flex inline-block items-center bg-#fff">
    <div v-for="tab in tabsStore.tabs">
      <a-tag
        @click="handleChange(tab.path)"
        :color="tab.path === activeTab ? 'blue' : ''"
        class="p-[6px_10px] font-size-16px cursor-pointer"
      >
        <component :is="tab.icon" />
        <span>{{ tab.title }}</span>
        <CloseOutlined v-if="tab.closable" @click="handleDel(tab.path)" />
      </a-tag>
    </div>
  </div>
</template>

<style scoped>
.view-tabs-container {
  top: 0;
  position: sticky;
  z-index: 1000;
}
</style>
