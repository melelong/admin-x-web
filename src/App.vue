<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';

const { locale } = useI18n();
const antLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS));
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/modules/theme';
const themeStore = useThemeStore();
const { themeConfig } = storeToRefs(themeStore);
</script>

<template>
  <a-config-provider :theme="themeConfig" :locale="antLocale">
    <RouterView />
  </a-config-provider>
</template>
