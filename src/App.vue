<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';

const { locale } = useI18n();
const antLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS));
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorLink: '#4d6bfe',
        colorPrimary: '#4d6bfe',
      },
    }"
    :locale="antLocale"
  >
    <RouterView />
  </a-config-provider>
</template>
