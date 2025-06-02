<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue';
import { useTabsStore } from '@/store/modules/tabsStore';

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
        margin: '0',
        height: '40px',
      }"
    >
      <a-tab-pane v-for="tab in tabsStore.tabs" :key="tab.path">
        <template #tab>
          <a-tag
            :draggable="true"
            @click.stop="handleChange(tab.path)"
            :color="tab.path === activeTab ? 'blue' : ''"
            class="p-[5px_10px] mr-0 font-size-16px cursor-pointer hover:color-#0958d9 hover:bg-#e6f4ff hover:border-color-#91caff"
          >
            <component class="mr-0!" :is="tab.icon" />
            <span>{{ tab.title }}</span>
            <CloseOutlined
              class="mr-0! rd-2px hover:bg-#fff"
              v-if="tab.closable"
              @click.stop="handleDel(tab.path)"
            />
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
