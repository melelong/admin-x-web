<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
</script>

<template>
  <a-layout>
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider>
        <Sidebar/>
      </a-layout-sider>
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>