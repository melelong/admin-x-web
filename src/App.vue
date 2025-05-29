<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue';

  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import enUS from 'ant-design-vue/es/locale/en_US';

  const { locale } = useI18n();
  const antLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS));
</script>

<template>
  <a-config-provider :locale="antLocale">
    <RouterView />
  </a-config-provider>
</template>
