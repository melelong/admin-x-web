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
        <Sidebar v-if="systemStore.currentLayout == 'unbounded'" />
      </Navbar>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        :width="240"
        :collapsedWidth="60"
        v-if="systemStore.currentLayout === 'classic'"
        :collapsed="systemStore.isCollapsed"
      >
        <Sidebar />
      </a-layout-sider>
      <a-layout-content>
        <ViewTabs />
        <div class="h-[calc(100vh_-_40px_-_var(--header-height))] overflow-y-auto">
          <router-view v-slot="{ Component }" :key="route.fullPath">
            <component :is="Component" />
          </router-view>
          <ViewFooter v-if="route?.meta?.footer" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
