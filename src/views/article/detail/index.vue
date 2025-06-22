<script setup lang="ts">
import { HeartOutlined, StarOutlined, ArrowLeftOutlined, ShareAltOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';

import { Article, detailArticle, InteractionType, toggleInteraction } from '@/api/system/article';
import MarkdownViewer from '@/components/MarkdownViewer/index.vue';
import router from '@/router';
import Comment from '@/views/article/components/Comment/index.vue';

const route = useRoute();

const articleData = ref<Article | null>(null);
const isLoading = ref(false);
const handleInteraction = async (type: InteractionType) => {
  const res = await toggleInteraction({
    type,
    articleId: articleData.value?.articleId as number,
  });
  message.success(res.data);
};
const commentRef = ref();
const getDetail = async () => {
  isLoading.value = true;
  const { params } = route;
  const res = await detailArticle(params.articleId as string);
  articleData.value = res.data;
  commentRef.value.init(res.data);
  isLoading.value = false;
};

const handleClose = () => {
  router.back();
};

watch(() => route.params.articleId, () => {
  getDetail();
}, { immediate: true });
</script>

<template>
  <div class="m-10px">
    <div class="m-auto p-16px w-66% bg-white">
      <div class="pos-absolute top-150px">
        <div class="pos-sticky z-100 left-0 -translate-x-90px">
          <a-flex vertical :gap="16">
            <a-button @click="handleClose" size="large" shape="circle">
              <ArrowLeftOutlined />
            </a-button>
            <a-button size="large" shape="circle">
              <HeartOutlined @click="handleInteraction(InteractionType.LIKE)" />
            </a-button>
            <a-button size="large" shape="circle">
              <StarOutlined @click="handleInteraction(InteractionType.FAVORITE)" />
            </a-button>
            <a-button size="large" shape="circle">
              <ShareAltOutlined />
            </a-button>
          </a-flex>
        </div>
      </div>
      <a-spin :spinning="isLoading">
        <h1 class="mb-16px font-size-20px">{{ articleData?.title }}</h1>
        <a-card>
          <MarkdownViewer
            v-if="articleData"
            :content="articleData.content"
          />
        </a-card>
      </a-spin>
      <a-divider orientation="left">评论</a-divider>
      <Comment ref="commentRef" />
    </div>
  </div>
</template>