<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue';

import ContextMenu from '@/layout/ViewTabs/ContextMenu.vue';
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

// 右键菜单相关状态
const showContextMenu = ref(false);
const contextMenuPosition = ref({ left: '0', top: '0' });
const currentContextTab = ref<any>(null);

/**
 * 右键菜单处理
 * @param tab 当前 tab
 * @param event MouseEvent
 */
const handleRightClick = (tab: any, event: MouseEvent) => {
  event.preventDefault();
  currentContextTab.value = tab;
  contextMenuPosition.value = {
    left: `${event.clientX}px`,
    top: `${event.clientY}px`,
  };
  showContextMenu.value = true;
};

/**
 * 关闭键菜单
 */
const closeContextMenu = () => {
  showContextMenu.value = false;
};

/**
 * 点击页面其他地方关闭菜单
 */
const handleClickOutside = () => {
  if (showContextMenu.value) {
    closeContextMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
            @contextmenu.prevent="handleRightClick(tab, $event)"
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

    <!-- 右键菜单 -->
    <ContextMenu
      v-if="showContextMenu"
      @close="closeContextMenu"
      :current-context-tab="currentContextTab"
      :style="contextMenuPosition"
    />
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