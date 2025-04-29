<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
import Navbar from './Navbar/index.vue'
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Navbar/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <Sidebar/>
      </a-layout-sider>
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <div class="h-[calc(100vh-64px)] overflow-auto">
            <component :is="Component"/>
          </div>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>