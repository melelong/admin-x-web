<script setup lang="ts">
import { onMounted } from 'vue';

import MarkdownViewer from '@/components/MarkdownViewer/index.vue';

const markdownContent = ref('');
const isLoading = ref(true);

const loadMarkdownFile = async () => {
  try {
    const response = await fetch('README.md');
    markdownContent.value = await response.text();
  } catch {
    markdownContent.value = '# 加载失败\n请检查文件路径';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadMarkdownFile();
});
</script>

<template>
  <div class="m-10px">
    <div class="p-16px bg-white rounded">
      <a-spin :spinning="isLoading">
        <MarkdownViewer :content="markdownContent" />
      </a-spin>
    </div>
  </div>
</template>
