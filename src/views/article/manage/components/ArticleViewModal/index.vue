<script setup lang="ts">
import { Article, detailArticle } from '@/api/system/article';
import MarkdownViewer from '@/components/MarkdownViewer/index.vue';

const visible = ref(false);
const articleData = ref({} as Article);
const isLoading = ref(false);
const showModal = async ({ row }: { row: Article }) => {
  visible.value = true;
  isLoading.value = true;
  const res = await detailArticle(row.articleId);
  articleData.value = res.data;
  isLoading.value = false;
};

const handleOk = () => {

};

defineExpose({
  showModal,
});
</script>

<template>
  <a-modal
    v-model:open="visible"
    width="73%"
    :title="articleData.title"
    @ok="handleOk"
  >
    <a-spin :spinning="isLoading">
      <MarkdownViewer class="max-h-60vh overflow-y-scroll" v-if="articleData.content" :content="articleData.content" />
    </a-spin>
  </a-modal>
</template>
