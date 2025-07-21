<script setup lang="ts">
import { useSystemStore } from '@/store/modules/systemStore';

import Navbar from './Navbar/index.vue';
import Sidebar from './Sidebar/index.vue';
import ViewFooter from './ViewFooter/index.vue';
import ViewTabs from './ViewTabs/index.vue';

const systemStore = useSystemStore();
const route = useRoute();
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Navbar>
        <Sidebar v-if="systemStore.currentLayout == 'UNBOUNDED'" />
      </Navbar>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        :width="240"
        :collapsedWidth="60"
        v-if="systemStore.currentLayout === 'CLASSIC'"
        :collapsed="systemStore.isCollapsed"
      >
        <Sidebar />
      </a-layout-sider>
      <a-layout-content>
        <ViewTabs />
        <div
          class="h-[calc(100vh_-_40px_-_var(--header-height))] overflow-x-hidden overflow-y-auto"
        >
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </router-view>
          <ViewFooter v-if="route?.meta?.footer" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style scoped lang="less">
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.1s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
