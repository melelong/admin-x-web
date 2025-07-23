<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);

const url = computed(() => (route.meta.iframeUrl as string) || '');

const handleLoad = () => {
  loading.value = false;
};
</script>

<template>
  <div class="iframe-container">
    <iframe :src="url" class="iframe-content" @load="handleLoad" />
    <div v-if="loading" class="iframe-loading">
      <a-spin size="large" tip="加载中..." />
    </div>
  </div>
</template>

<style scoped lang="less">
.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
}

.iframe-loading {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 255 255 / 80%);
}
</style>
