<script setup lang="ts">
import Navbar from './Navbar/index.vue';
import Sidebar from './Sidebar/index.vue';
import ViewFooter from './ViewFooter/index.vue';
import ViewTabs from './ViewTabs/index.vue';

const route = useRoute();
</script>

<template>
  <a-layout>
    <a-layout-header class="px-10px!">
      <Navbar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <Sidebar />
      </a-layout-sider>
      <a-layout-content>
        <div class="h-[calc(100vh-64px)] overflow-auto">
          <ViewTabs />
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
          <ViewFooter v-if="route?.meta?.footer" />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
