<script setup lang="ts">
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { message, TablePaginationConfig } from 'ant-design-vue';
import { onMounted } from 'vue';

import { Article, pageArticle, delArticle, AuditStatus } from '@/api/system/article';
import ConfirmButton from '@/components/ConfirmButton/index.vue';
import { t } from '@/i18n';

import ArticleViewModal from './components/ArticleViewModal/index.vue';
import FormModal from './components/FormModal/index.vue';

const pagination = reactive<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条记录`,
});

const formState = reactive({
  title: '',
});
const columns = [
  {
    width: 400,
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: '作者',
    dataIndex: 'authorName',
    key: 'authorName',
  },
  {
    width: 100,
    title: '点赞数量',
    dataIndex: 'likeCount',
    key: 'likeCount',
  },
  {
    width: 100,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
  },
];
const dataSource = ref<Article[]>([]);

const formModalRef = ref();
const handleAdd = () => {
  formModalRef.value.showModal({
    onSuccess: () => {
      getDataSource();
    },
  });
};

const handleEdit = (row: Article) => {
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
  const res = await pageArticle({
    pageSize: pagination.pageSize as number,
    pageNum: pagination.current as number,
    title: formState.title,
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
  await delArticle(id);
  message.success('操作成功');
  await getDataSource();
};

const articleViewModalRef = ref();
const viewDetail = (row: Article) => {
  articleViewModalRef.value.showModal({ row });
};

/**
 * 获取审核状态描述
 * @param status 审核状态值
 * @returns 对应的状态描述
 */
const getStatusText = (status: AuditStatus): string => {
  switch (status) {
    case AuditStatus.PENDING:
      return '待审核';
    case AuditStatus.APPROVED:
      return '已通过';
    case AuditStatus.REJECTED:
      return '已拒绝';
    default:
      return '';
  }
};

/**
 * 获取审核状态标签类型
 * @param status 审核状态值
 * @returns 对应的标签类型 (用于UI展示)
 */
const getTagType = (status: AuditStatus): 'warning' | 'success' | 'danger' | 'info' => {
  switch (status) {
    case AuditStatus.PENDING:
      return 'warning';
    case AuditStatus.APPROVED:
      return 'success';
    case AuditStatus.REJECTED:
      return 'danger';
    default:
      return 'info';
  }
};

onMounted(() => {
  getDataSource();
});
</script>
<template>
  <div class="m-10px">
    <div class="bg-white p-16px">
      <a-form ref="formRef" :model="formState" layout="inline">
        <a-form-item :label="t('文章标题')" name="title">
          <a-input :placeholder="t('请输入')" v-model:value="formState.title" />
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
          <template v-if="column.key === 'status'">
            <a-tag :color="getTagType(text)" :bordered="false">
              {{ getStatusText(text) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">{{ t('编辑') }}</a-button>
            <a-button type="link" @click="viewDetail(record)">{{ t('详情') }}</a-button>
            <ConfirmButton @confirm="handleDel(record.articleId)" :name="t('删除')" :title="t('确定删除吗？')" />
          </template>
        </template>
      </a-table>
    </div>
    <FormModal ref="formModalRef" />
    <ArticleViewModal ref="articleViewModalRef" />
  </div>
</template>
