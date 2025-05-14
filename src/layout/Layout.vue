<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
import Navbar from './Navbar/index.vue'
import QuickMenu from './QuickMenu/index.vue'
</script>

<template>
  <a-layout>
    <a-layout-header class="px-10px!">
      <Navbar/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <Sidebar/>
      </a-layout-sider>
      <a-layout-content>
        <div class="h-[calc(100vh-64px)] overflow-auto">
          <QuickMenu/>
          <router-view v-slot="{ Component }">
            <component :is="Component"/>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>