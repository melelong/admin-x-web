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

const isAppLoaded = ref(false);

onMounted(() => {
  const appLoading = document.getElementById('app-loading-container');
  if (appLoading) {
    appLoading.style.transition = 'opacity 2048ms ease-in';
    appLoading.style.opacity = '0';
    setTimeout(() => {
      appLoading.remove();
    }, 2048);
  }

  setTimeout(() => {
    isAppLoaded.value = true;
  }, 520);
});
</script>

<template>
  <div v-show="isAppLoaded">
    <a-config-provider :theme="themeConfig" :locale="antLocale">
      <RouterView />
    </a-config-provider>
  </div>
</template>
