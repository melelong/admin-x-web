<script setup lang="ts">
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';

import { Article, ArticleCategory, saveArticle, listCategory } from '@/api/article/article';
import { t } from '@/i18n';

const categoryList = ref<ArticleCategory[]>([]);
const formRef = ref();
const visible = ref(false);
const modalTile = ref('');
let callback: (...args: any[]) => any;
const showModal = async ({
  onSuccess,
  row,
}: {
  onSuccess: (...args: any[]) => any;
  row?: Article;
}) => {
  formData.value = {} as Article;
  callback = onSuccess;
  modalTile.value = row ? t('编辑文章') : t('新增文章');
  if (row) {
    formData.value = cloneDeep(row);
  }
  visible.value = true;
  const res = await listCategory();
  categoryList.value = res.data;
};

const isLoading = ref(false);

const formData = ref<Article>({} as Article);
const handleOk = async () => {
  isLoading.value = true;
  await saveArticle(formData.value).finally(() => {
    isLoading.value = false;
  });

  callback && callback();
  message.success(t('操作成功'));
  visible.value = false;
};

defineExpose({
  showModal,
});
</script>

<template>
  <a-modal v-model:open="visible" width="600px" :title="modalTile" @ok="handleOk">
    <a-form ref="formRef" :label-col="{ span: 5 }" :wrapperCol="{ span: 18 }" :model="formData">
      <a-form-item :label="t('文章标题')" name="title">
        <a-input :placeholder="t('请输入')" v-model:value="formData.title"></a-input>
      </a-form-item>
      <a-form-item :label="t('文章分类')" name="categoryId">
        <a-select
          :placeholder="t('请选择')"
          v-model:value="formData.categoryId"
          :options="categoryList"
          :fieldNames="{
            label: 'categoryName',
            value: 'categoryId',
          }"
        >
        </a-select>
      </a-form-item>
      <a-form-item :label="t('文章内容')" name="content">
        <a-textarea :rows="11" :placeholder="t('请输入')" v-model:value="formData.content">
        </a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
