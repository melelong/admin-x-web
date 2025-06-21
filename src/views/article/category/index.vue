<script setup lang="ts">
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message, TablePaginationConfig } from 'ant-design-vue';
import { onMounted } from 'vue';

import { ArticleCategory, pageArticleCategory, delArticleCategory } from '@/api/system/article';
import ConfirmButton from '@/components/ConfirmButton/index.vue';
import { t } from '@/i18n';

import FormModal from './components/FormModal/index.vue';

const pagination = reactive<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条记录`,
});

const formState = reactive({
  keyword: '',
});
const columns = [
  {
    title: '名称',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
  },
];
const dataSource = ref<ArticleCategory[]>([]);

const formModalRef = ref();
const handleAdd = () => {
  formModalRef.value.showModal({
    onSuccess: () => {
      getDataSource();
    },
  });
};

const handleEdit = (row: ArticleCategory) => {
  formModalRef.value.showModal({
    row,
    onSuccess: () => {
      getDataSource();
    },
  });
};

const isLoading = ref(false);
const getDataSource = async () => {
  isLoading.value = true;
  const res = await pageArticleCategory({
    pageSize: pagination.pageSize as number,
    pageNum: pagination.current as number,
    keyword: formState.keyword,
  });
  dataSource.value = res.data.records;
  pagination.total = res.data.total;
  isLoading.value = false;
};

const formRef = ref();
const handleReset = () => {
  pagination.current = 1;
  formRef.value.resetFields();
  getDataSource();
};

const handleSearch = () => {
  pagination.current = 1;
  getDataSource();
};

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current;
  getDataSource();
};

const handleDel = async (id: number) => {
  await delArticleCategory(id);
  message.success('操作成功');
  await getDataSource();
};

onMounted(() => {
  getDataSource();
});
</script>
<template>
  <div class="m-10px">
    <div class="bg-white p-16px">
      <a-form ref="formRef" :model="formState" layout="inline">
        <a-form-item :label="t('分类名称')" name="keyword">
          <a-input :placeholder="t('请输入')" v-model:value="formState.keyword" />
        </a-form-item>
        <a-form-item>
          <a-button @click="handleReset">
            <ReloadOutlined />
            {{ t('重置') }}
          </a-button>
          <a-button @click="handleSearch" class="ml-8px" type="primary">
            <SearchOutlined />
            {{ t('搜索') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="my-16px p-16px bg-white">
      <div class="mb-16px">
        <a-button @click="handleAdd" type="primary">
          <PlusOutlined />
          {{ t('新增') }}
        </a-button>
      </div>
      <a-table
        :loading="isLoading"
        size="small"
        @change="handleTableChange"
        :pagination="pagination"
        rowKey="id"
        :data-source="dataSource"
        bordered
        :columns="columns"
      >
        <template #bodyCell="{ text, column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">{{ t('编辑') }}</a-button>
            <ConfirmButton @confirm="handleDel(record.categoryId)" :name="t('删除')" :title="t('确定删除吗？')" />
          </template>
        </template>
      </a-table>
    </div>
    <FormModal ref="formModalRef" />
  </div>
</template>
