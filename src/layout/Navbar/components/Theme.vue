<script setup lang="ts">
import { AppstoreOutlined } from '@ant-design/icons-vue';


import { t } from '@/i18n';
import { themeType, useSystemStore } from '@/store/modules/systemStore';

const systemStore = useSystemStore();

const themeList: { value: themeType, style: string, title: string }[] = [
  {
    value: 'light',
    style: 'bg-#e6f4ff border-color-#91caff color-#1677ff',
    title: t('浅色模式'),
  },
  {
    value: 'dark',
    style: 'border-color-#91caff color-#1677ff',
    title: t('深色模式'),
  },
];

const modeList = [
  {
    value: '1',
    style: 'bg-#e6f4ff border-color-#91caff color-#1677ff',
    title: t('经典'),
  },
  {
    value: '2',
    style: '',
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
          :class="item.style"
          class="cursor-pointer mt-16px"
        >
          {{ item.title }}
        </a-card>
      </div>
    </template>
    <AppstoreOutlined />
  </a-popover>
</template>