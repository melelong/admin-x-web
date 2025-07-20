<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme';
import { GlobalOutlined, CaretDownFilled } from '@ant-design/icons-vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const themeStore = useThemeStore();
const { toggleTheme } = themeStore;
const themeValue = computed(() => ({
  name: themeStore.currentTheme,
  label: themeStore.currentTheme === 'dark' ? '深色' : '浅色',
}));
const toggle = () => {
  toggleTheme(themeValue.value.name === 'dark' ? 'light' : 'dark');
};
import { setLocale, currentLanguage, localeList } from '@/i18n';

const changeLang = (e: { key: string | number }) => {
  setLocale(e.key as 'zh-CN' | 'en-US');
};
const currentLangLabel = computed(() => {
  return localeList.find((item) => item.value === currentLanguage.value)?.label;
});
</script>

<template>
  <div class="pos-absolute top-10px right-10px">
    <div class="flex items-center">
      <div @click="toggle" class="flex items-center cursor-pointer">
        <SvgIcon :size="14" name="moon" />
        <span class="ml-3px">主题{{ `(${themeValue.label})` }}</span>
      </div>
      <div class="mx-16px split-line"></div>
      <a-dropdown>
        <div class="flex items-center">
          <GlobalOutlined />
          <div class="mx-3px">语言{{ `(${currentLangLabel})` }}</div>
          <CaretDownFilled />
        </div>
        <template #overlay>
          <a-menu @click="changeLang" :selectedKeys="[currentLanguage]">
            <a-menu-item v-for="item in localeList" :key="item.value">{{ item.label }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
