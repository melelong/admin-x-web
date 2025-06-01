<script setup lang="ts">
import { setLocale, currentLanguage } from '@/i18n';

const changeLang = (e: { key: string }) => {
  setLocale(e.key as 'zh-CN' | 'en-US');
};
</script>

<template>
  <div class="font-size-0 flex items-center">
    <a-dropdown>
      <img class="w-18px h-18px" src="/src/assets/svg/translate.svg" alt="" />
      <template #overlay>
        <a-menu @click="changeLang" :selectedKeys="[currentLanguage]">
          <a-menu-item key="zh-CN">中文</a-menu-item>
          <a-menu-item key="en-US">English</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
