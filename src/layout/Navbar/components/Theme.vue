<script setup lang="ts">
import { AppstoreOutlined } from '@ant-design/icons-vue';
import { ThemeMode, useThemeStore } from '@/store/modules/theme';
import ColorPicker from '@/components/ColorPicker/index.vue';
import { t } from '@/i18n';
const themeStore = useThemeStore();
const { themeMode, primaryColor } = storeToRefs(themeStore);
const { toggleTheme, setPrimaryColor } = themeStore;
import { LayoutType, useSystemStore } from '@/store/modules/systemStore';
import { storeToRefs } from 'pinia';
const themeColor = ref(primaryColor.value);

const systemStore = useSystemStore();

const themeList: { value: ThemeMode; title: string }[] = [
  {
    value: 'light',
    title: t('浅色模式'),
  },
  {
    value: 'dark',
    title: t('深色模式'),
  },
  {
    value: 'auto',
    title: t('跟随系统'),
  },
];

const modeList: { value: LayoutType; title: string }[] = [
  {
    value: 'CLASSIC',
    title: t('经典'),
  },
  {
    value: 'UNBOUNDED',
    title: t('无界'),
  },
];

const toggle = (value: ThemeMode) => {
  toggleTheme(value);
};

/** 切换颜色 */
const handleColorChange = (color: string) => {
  setPrimaryColor(color);
};
</script>

<template>
  <a-popover>
    <template #content>
      <div class="w-400px overflow-hidden">
        <div class="title-label mb-16px font-size-17px">{{ t('主题模式') }}</div>
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
      <div class="title-label mt-36px mb-16px font-size-17px">{{ t('主题色彩') }}</div>
      <ColorPicker v-model="themeColor" @update:modelValue="handleColorChange" />
    </template>
    <AppstoreOutlined />
  </a-popover>
</template>
