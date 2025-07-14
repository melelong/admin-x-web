<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';
import AppLoader from '@/components/AppLoader/index.vue';

const { locale } = useI18n();
const antLocale = computed(() => (locale.value === 'zh-CN' ? zhCN : enUS));
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore();
const { themeConfig } = storeToRefs(themeStore);

const isAppLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isAppLoaded.value = true;
  }, 900);
});
</script>

<template>
  <AppLoader v-if="!isAppLoaded" />
  <a-config-provider v-show="isAppLoaded" :theme="themeConfig" :locale="antLocale">
    <RouterView />
  </a-config-provider>
</template>
