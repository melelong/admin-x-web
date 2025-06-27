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
    <a-layout-header
      :class="`px-10px! ${systemStore.theme === 'light' ? 'border-b-#f5f5f5 border-b-solid bg-#fff! color-#4d6bfe!' : ' color-#fff!'}`"
    >
      <Navbar>
        <Sidebar v-if="systemStore.currentLayout == 'unbounded'" />
      </Navbar>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        :width="220"
        v-if="systemStore.currentLayout === 'classic'"
        :collapsed="systemStore.isCollapsed"
      >
        <Sidebar />
      </a-layout-sider>
      <a-layout-content>
        <ViewTabs />
        <div class="h-[calc(100vh-100px)] overflow-y-auto">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
          <ViewFooter v-if="route?.meta?.footer" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
