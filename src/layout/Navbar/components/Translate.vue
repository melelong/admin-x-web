<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { setLocale, currentLanguage } from '@/i18n';
const changeLang = (e: { key: string }) => {
  setLocale(e.key as 'zh-CN' | 'en-US');
};
</script>

<template>
  <div class="font-size-0 flex items-center">
    <a-dropdown>
      <SvgIcon name="translate"/>
      <template #overlay>
        <a-menu @click="changeLang" :selectedKeys="[currentLanguage]">
          <a-menu-item key="zh-CN">中文</a-menu-item>
          <a-menu-item key="en-US">English</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
