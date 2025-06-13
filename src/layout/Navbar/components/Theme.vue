<script setup lang="ts">
import { AppstoreOutlined } from '@ant-design/icons-vue';


import { t } from '@/i18n';
import { layoutType, themeType, useSystemStore } from '@/store/modules/systemStore';

const systemStore = useSystemStore();

const themeList: { value: themeType, style: string, title: string }[] = [
  {
    value: 'light',
    style: 'bg-#e6f4ff border-color-#1677ff color-#1677ff border-2px',
    title: t('浅色模式'),
  },
  {
    value: 'dark',
    style: 'bg-#e6f4ff border-color-#1677ff color-#1677ff border-2px',
    title: t('深色模式'),
  },
];

const modeList: { value: layoutType, style: string, title: string }[] = [
  {
    value: 'classic',
    style: 'bg-#e6f4ff border-color-#1677ff color-#1677ff border-2px',
    title: t('经典'),
  },
  {
    value: 'unbounded',
    style: 'bg-#e6f4ff border-color-#1677ff color-#1677ff border-2px',
    title: t('无界'),
  },
];
</script>

<template>
  <a-popover>
    <template #content>
      <div class="w-400px overflow-hidden">
        <div class="title-label mb-10px font-size-18px">{{ t('主题') }}</div>
        <a-flex :gap="16" class="font-700">
          <a-card
            v-for="item in themeList"
            :key="item.value"
            class="w-full cursor-pointer"
            @click="systemStore.setTheme(item.value)"
            :class="systemStore.theme === item.value ? item.style: ''"
          >
            {{ item.title }}
          </a-card>
        </a-flex>

        <div class="title-label mt-32px mb-10px font-size-18px">{{ t('排布模式') }}</div>
        <a-card
          v-for="item in modeList"
          :key="item.value"
          :class="systemStore.currentLayout === item.value? item.style : ''"
          @click="systemStore.setLayout(item.value)"
          class="cursor-pointer mt-16px"
        >
          {{ item.title }}
        </a-card>
      </div>
    </template>
    <AppstoreOutlined />
  </a-popover>
</template>