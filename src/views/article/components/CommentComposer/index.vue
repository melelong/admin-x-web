<script setup lang="ts">
import { message } from 'ant-design-vue';

import { Comment, pageComment, saveComment } from '@/api/content';
import { Article } from '@/api/system/article';
import CommentInput from '@/components/CommentInput/index.vue';

import CommentRender from './CommentRender.vue';

const content = ref<Article>({} as Article);

const handleSubmit = async (data: {
  text: string;
  done: (...args: any[]) => any;
  parentId?: number;
  replyToUserId?: number;
}) => {
  const { text, done, parentId, replyToUserId } = data;
  await saveComment({
    articleId: content.value.articleId,
    content: text,
    parentId,
    replyToUserId,
  }).finally(() => {
    done();
  });
  message.success('评论成功');
  await getCommentList();
};

const commentList = ref<Comment[]>([]);
const getCommentList = async () => {
  const res = await pageComment({
    pageNum: 1,
    pageSize: 50,
    articleId: content.value.articleId,
  });
  commentList.value = res.data.records;
};

const init = (data: Article) => {
  content.value = data;
  getCommentList();
};

defineExpose({
  init,
});
</script>

<template>
  <CommentInput @submit="handleSubmit" />
  <a-card class="mt-16px">
    <ul class="px-0">
      <li class="mb-16px" v-for="comment in commentList" :key="comment.id">
        <CommentRender @submit="handleSubmit" :comment="comment" />
      </li>
    </ul>
    <a-empty v-if="commentList.length === 0" description="暂无评论，期待你的评论"> </a-empty>
  </a-card>
</template>
