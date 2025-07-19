<script setup lang="ts">
import { GithubOutlined } from '@ant-design/icons-vue';

// 定义代码仓库地址常量
const GITHUB_URL_WEB = 'https://github.com/byte-scheduler/admin-x-web';
const GITHUB_URL_SERVER = 'https://github.com/byte-scheduler/admin-x-server';
const GITEE_URL_WEB = 'https://gitee.com/byte-scheduler/admin-x-web';
const GITEE_URL_SERVER = 'https://gitee.com/byte-scheduler/admin-x-server';

// 处理菜单点击事件
const handleMenuClick = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="flex items-center">
    <a-dropdown>
      <GithubOutlined class="text-lg cursor-pointer" />
      <template #overlay>
        <a-menu>
          <a-menu-item @click="handleMenuClick(GITHUB_URL_WEB)">Adminx-web (GitHub)</a-menu-item>
          <a-menu-item @click="handleMenuClick(GITHUB_URL_SERVER)"
            >Adminx-Server (GitHub)</a-menu-item
          >
          <a-menu-item @click="handleMenuClick(GITEE_URL_WEB)">Adminx-web (Gitee)</a-menu-item>
          <a-menu-item @click="handleMenuClick(GITEE_URL_SERVER)"
            >Adminx-Server (Gitee)</a-menu-item
          >
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
