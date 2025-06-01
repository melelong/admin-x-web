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
  <div
    class="view-tabs-container px-8px h-40px flex inline-block items-center bg-#fff pos-sticky z-1000 top-0"
  >
    <a-tabs
      class="w-100%"
      v-model:activeKey="activeTab"
      tab-position="top"
      :tabBarGutter="8"
      :tabBarStyle="{
        margin: '0 !important',
        height: '40px',
      }"
    >
      <a-tab-pane v-for="tab in tabsStore.tabs" :key="tab.path">
        <template #tab>
          <a-tag
            @click.stop="handleChange(tab.path)"
            :color="tab.path === activeTab ? 'blue' : ''"
            class="p-[5px_10px] mr-0 font-size-16px cursor-pointer"
          >
            <component :is="tab.icon" />
            <span>{{ tab.title }}</span>
            <CloseOutlined v-if="tab.closable" @click.stop="handleDel(tab.path)" />
          </a-tag>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped>
.view-tabs-container {
  :deep(.ant-tabs-ink-bar) {
    display: none;
  }

  :deep(.ant-tabs-nav) {
    &:before {
      display: none;
    }
  }
}
</style>
