<script setup lang="ts">
import {useRouter} from 'vue-router'
import { HomeOutlined, SearchOutlined } from '@ant-design/icons-vue'

const router = useRouter()
</script>

<template>
  <a-menu
      class="w-270px h-[calc(100vh-64px)]"
      theme="dark"
      :selectedKeys="[router.currentRoute.value.path]"
  >

    <a-menu-item key="/home" @click="router.push('/home')">
      <template #icon>
        <HomeOutlined/>
      </template>
      <span>首页</span>
    </a-menu-item>

    <a-sub-menu key="system" title="系统管理">
      <template #icon>
        <SearchOutlined/>
      </template>
      <a-menu-item
          key="/system/menu"
          @click="router.push('/system/menu')"
      >
        菜单管理
      </a-menu-item>
      <a-menu-item
          key="/system/user"
          @click="router.push('/system/user')"
      >
        用户管理
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>