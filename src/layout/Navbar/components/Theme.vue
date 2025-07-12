<script setup lang="ts">
import { AppstoreOutlined } from '@ant-design/icons-vue';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();
const { themeMode /*primaryColor*/ } = storeToRefs(themeStore);
const { toggleTheme /*setPrimaryColor*/ } = themeStore;

import { t } from '@/i18n';
import { layoutType, useSystemStore } from '@/store/modules/systemStore';
import { storeToRefs } from 'pinia';

const systemStore = useSystemStore();

const themeList: { value: string; title: string }[] = [
  {
    value: 'light',
    title: t('浅色模式'),
  },
  {
    value: 'dark',
    title: t('深色模式'),
  },
  {
    value: 'system',
    title: t('跟随系统'),
  },
];

const modeList: { value: layoutType; title: string }[] = [
  {
    value: 'classic',
    title: t('经典'),
  },
  {
    value: 'unbounded',
    title: t('无界'),
  },
];

const toggle = (value: string) => {
  if (value === 'system') {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    toggleTheme(darkMode ? 'dark' : 'light');
  } else {
    toggleTheme(value as 'dark' | 'light');
  }
};

/** 切换颜色 */
// const handleColorChange = (color: string) => {
//   setPrimaryColor(color);
// };
</script>

<template>
  <a-popover>
    <template #content>
      <div class="w-400px overflow-hidden">
        <div class="title-label mb-16px font-size-17px">{{ t('主题') }}</div>
        <a-flex :gap="16">
          <a-card
            v-for="item in themeList"
            :key="item.value"
            class="w-full font-700 cursor-pointer"
            @click="toggle(item.value)"
            :class="themeMode === item.value ? 'color-[var(--color-primary)]' : ''"
          >
            {{ item.title }}
          </a-card>
        </a-flex>
        <div class="title-label mt-36px mb-16px font-size-17px">{{ t('排布模式') }}</div>
        <a-card
          v-for="item in modeList"
          :key="item.value"
          :class="systemStore.currentLayout === item.value ? 'color-[var(--color-primary)]' : ''"
          @click="systemStore.setLayout(item.value)"
          class="cursor-pointer font-700 mt-16px"
        >
          {{ item.title }}
        </a-card>
      </div>
    </template>
    <AppstoreOutlined />
  </a-popover>
</template>
