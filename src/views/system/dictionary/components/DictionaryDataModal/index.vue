<script setup lang="ts">
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';

import { Dict, dictDataPage, DictItem } from '@/api/system/dictionary';
import { t } from '@/i18n';

import type { TablePaginationConfig } from 'ant-design-vue';

const formRef = ref();
const visible = ref(false);
const modalTile = ref('');
let rowData: Dict;
const showModal = ({ row }: { row: Dict }) => {
  rowData = row;
  modalTile.value = t('字典数据');
  getDataSource();
  visible.value = true;
};

const pagination = reactive<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条记录`,
});

const dataSource = ref<DictItem[]>([]);

const isLoading = ref(false);
const getDataSource = async () => {
  isLoading.value = true;
  const res = await dictDataPage({
    pageSize: pagination.pageSize as number,
    pageNum: pagination.current as number,
    itemLabel: formData.value.itemLabel,
    dictId: rowData.id,
  });
  dataSource.value = res.data.records;
  pagination.total = res.data.total;
  isLoading.value = false;
};

const columns = [
  {
    title: '名称',
    dataIndex: 'itemLabel',
    key: 'itemLabel',
  },
  {
    title: '编码',
    dataIndex: 'itemValue',
    key: 'itemValue',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }: { text: number }) => text === 1 ? '启用' : '禁用',
  },
  {
    title: '顺序',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
  },
];

const formData = ref<DictItem>({} as DictItem);

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current;
  getDataSource();
};

const handleReset = () => {
  pagination.current = 1;
  formRef.value.resetFields();
  getDataSource()
};

const handleSearch = () => {
  pagination.current = 1;
  getDataSource();
};

defineExpose({
  showModal,
});
</script>

<template>
  <a-drawer v-model:open="visible" width="600px" :title="modalTile">
    <a-form class="mb-16px" ref="formRef" layout="inline" :model="formData">
      <a-form-item :label="t('字典名称')" name="itemLabel">
        <a-input :placeholder="t('请输入')" v-model:value="formData.itemLabel"></a-input>
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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="link">{{ t('编辑') }}</a-button>
          <a-button danger type="link">{{ t('删除') }}</a-button>
        </template>
      </template>
    </a-table>
  </a-drawer>
</template>
