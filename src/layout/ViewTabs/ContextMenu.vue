<script setup lang="ts">
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';

import { useTabsStore } from '@/store';

const router = useRouter();
const tabsStore = useTabsStore();
const props = defineProps({
  currentContextTab: {
    type: Object,
    required: true,
  },
});

const currentContextTab = computed(() => props.currentContextTab);

const emit = defineEmits(['close']);
/**
 * 关闭键菜单
 */
const closeContextMenu = () => {
  emit('close');
};

const closeCurrent = () => {
  if (currentContextTab.value) {
    tabsStore.removeTab(currentContextTab.value.path);
  }
};

const closeLeft = () => {
  if (!currentContextTab.value) return;

  const tabs = tabsStore.tabs;
  const currentIndex = tabs.findIndex((tab) => tab.path === currentContextTab.value.path);

  // 收集要关闭的左侧标签
  const tabsToRemove: string[] = [];
  for (let i = 0; i < currentIndex; i++) {
    if (tabs[i].closable) {
      tabsToRemove.push(tabs[i].path);
    }
  }

  // 移除标签
  tabsToRemove.forEach((path) => tabsStore.removeTab(path));
  closeContextMenu();
};

const closeRight = () => {
  if (!currentContextTab.value) return;

  const tabs = tabsStore.tabs;
  const currentIndex = tabs.findIndex((tab) => tab.path === currentContextTab.value.path);

  // 收集要关闭的右侧标签
  const tabsToRemove: string[] = [];
  for (let i = currentIndex + 1; i < tabs.length; i++) {
    if (tabs[i].closable) {
      tabsToRemove.push(tabs[i].path);
    }
  }

  // 移除标签
  tabsToRemove.forEach((path) => tabsStore.removeTab(path));
  closeContextMenu();
};

const refreshCurrent = () => {
  if (!currentContextTab.value) return;

  // 刷新当前标签页
  const currentPath = currentContextTab.value.path;
  router.replace({ path: currentPath, query: { t: Date.now() } });
  closeContextMenu();
};

const closeOther = () => {
  if (!currentContextTab.value) return;

  const tabs = tabsStore.tabs;

  // 收集要关闭的其他标签
  const tabsToRemove: string[] = [];
  tabs.forEach((tab) => {
    if (tab.path !== currentContextTab.value.path && tab.closable) {
      tabsToRemove.push(tab.path);
    }
  });

  // 移除标签
  tabsToRemove.forEach((path) => tabsStore.removeTab(path));
  closeContextMenu();
};

const closeAll = () => {
  // 收集所有可关闭的标签
  const tabsToRemove = tabsStore.tabs.filter((tab) => tab.closable).map((tab) => tab.path);

  // 移除标签
  tabsToRemove.forEach((path) => tabsStore.removeTab(path));
  closeContextMenu();
};
</script>

<template>
  <div class="context-menu-container" @click.stop>
    <div class="menu-item" @click="closeCurrent">
      <CloseOutlined class="icon" />
      <span>关闭</span>
    </div>
    <div class="menu-item" @click="closeLeft">
      <CloseOutlined class="icon" />
      <span>关闭左侧</span>
    </div>
    <div class="menu-item" @click="closeRight">
      <CloseOutlined class="icon" />
      <span>关闭右侧</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" @click="refreshCurrent">
      <ReloadOutlined class="icon" />
      <span>刷新</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" @click="closeOther">
      <CloseOutlined class="icon" />
      <span>关闭其他</span>
    </div>
    <div class="menu-item" @click="closeAll">
      <CloseOutlined class="icon" />
      <span>关闭全部</span>
    </div>
  </div>
</template>

<style scoped>
.context-menu-container {
  position: fixed;
  z-index: 9999;
  min-width: 140px;
  padding: 4px 0;
  background: #fff;
  border-radius: 4px;
  box-shadow:
    0 3px 6px -4px rgb(0 0 0 / 12%),
    0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #0958d9;
    background-color: #f5f5f5;
  }

  .icon {
    margin-right: 8px;
    font-size: 12px;
  }
}

.menu-divider {
  height: 1px;
  margin: 4px 0;
  background-color: #f0f0f0;
}
</style>
