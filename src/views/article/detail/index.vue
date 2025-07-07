<script setup lang="ts">
import {
  HeartFilled,
  StarFilled,
  MessageOutlined,
  ArrowLeftOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';

import { Article, detailArticle, InteractionType, toggleInteraction } from '@/api/article/article';
import MarkdownViewer from '@/components/MarkdownViewer/index.vue';
import router from '@/router';
import CommentComposer from '@/views/article/components/CommentComposer/index.vue';

const route = useRoute();

const articleData = ref<Article | null>(null);
const isLoading = ref(false);
const handleInteraction = async (type: InteractionType) => {
  const res = await toggleInteraction({
    type,
    articleId: articleData.value?.articleId as number,
  });
  message.success(res.data);
  await getDetail();
};
const commentComposerRef = ref();
const getDetail = async () => {
  isLoading.value = true;
  const { params } = route;
  const res = await detailArticle(params.articleId as string);
  articleData.value = res.data;
  commentComposerRef.value.init(res.data);
  isLoading.value = false;
};

const handleClose = () => {
  router.back();
};

watch(
  () => route.params.articleId,
  () => {
    getDetail();
  },
  { immediate: true },
);

const targetElementRef = ref<HTMLElement | null>(null);
const handleComment = () => {
  if (targetElementRef.value) {
    targetElementRef.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};
</script>

<template>
  <div class="m-10px">
    <div class="m-auto p-16px w-66% bg-white">
      <div class="pos-absolute top-150px">
        <div class="pos-sticky z-100 left-0 -translate-x-90px">
          <a-flex vertical :gap="16">
            <a-button class="mb-25px border-none" @click="handleClose" size="large" shape="circle">
              <ArrowLeftOutlined />
            </a-button>
            <a-badge color="#4d6bfe" :count="articleData?.likeCount" :offset="[-5, 5]">
              <a-button
                @click="handleInteraction(InteractionType.LIKE)"
                size="large"
                class="border-none bg-#fff! hover:color-#4d6bfe!"
                :class="articleData?.isLiked ? 'color-#4d6bfe!' : 'color-#ccc!'"
                shape="circle"
              >
                <HeartFilled />
              </a-button>
            </a-badge>
            <a-badge color="#4d6bfe" :count="articleData?.favoriteCount" :offset="[-5, 5]">
              <a-button
                @click="handleInteraction(InteractionType.FAVORITE)"
                size="large"
                class="border-none bg-#fff! hover:color-#4d6bfe!"
                :class="articleData?.isFavorite ? 'color-#4d6bfe!' : 'color-#ccc!'"
                shape="circle"
              >
                <StarFilled />
              </a-button>
            </a-badge>
            <a-badge color="#4d6bfe" :count="articleData?.commentCount" :offset="[-5, 5]">
              <a-button
                @click="handleComment"
                size="large"
                class="border-none bg-#fff!"
                shape="circle"
              >
                <MessageOutlined />
              </a-button>
            </a-badge>
            <a-button class="border-none" size="large" shape="circle">
              <ShareAltOutlined />
            </a-button>
          </a-flex>
        </div>
      </div>
      <a-spin :spinning="isLoading">
        <div class="flex items-center mb-30px">
          <a-avatar class="flex-shrink-0" :src="articleData?.avatar" :size="50">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <div class="ml-8px">
            <div class="font-size-16px">{{ articleData?.nickname }}</div>
            <div class="color-#666">{{ articleData?.createTime }}</div>
          </div>
        </div>
        <h1 class="mb-16px font-size-20px">{{ articleData?.title }}</h1>
        <a-badge-ribbon :text="articleData?.categoryName">
          <a-card>
            <MarkdownViewer v-if="articleData" :content="articleData.content" />
          </a-card>
        </a-badge-ribbon>
      </a-spin>
      <div ref="targetElementRef">
        <a-divider orientation="left">
          <span>评论</span>
          <span class="ml-5px" v-if="articleData?.commentCount">{{
            articleData?.commentCount
          }}</span>
        </a-divider>
        <CommentComposer ref="commentComposerRef" />
      </div>
    </div>
  </div>
</template>
