<script setup lang="ts">
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { onMounted } from 'vue';

import { menuTree } from '@/api/system/menu';
import { t } from '@/i18n';

import MenuFormModal from './components/MenuFormModal/index.vue';

const formState = reactive({
  name: '',
  status: '',
});
const columns = [
  {
    title: '名称',
    dataIndex: 'titleZh',
    key: 'titleZh',
  },
  {
    title: '编码',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'menuType',
    key: 'menuType',
  },
  {
    title: '权限',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component',
  },
  {
    title: '地址',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '排序',
    dataIndex: 'sortOrder',
    key: 'sortOrder',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
    width: '160px',
  },
];
const dataSource = ref<Menu[]>([]);

const menuFormModalRef = ref();
const handleAdd = () => {
  menuFormModalRef.value.showModal({
    onSuccess: () => {
      getDataSource();
    },
  });
};

const isLoading = ref(false);
const getDataSource = async () => {
  isLoading.value = true;
  const res = await menuTree();
  dataSource.value = res.data;
  isLoading.value = false;
};

const formRef = ref();
const handleReset = () => {
  formRef.value.resetFields();
};

const handleSearch = () => {
  getDataSource();
};

const formatMenuType = (type: number) => {
  switch (type) {
    case 0:
      return '目录';
    case 1:
      return '菜单';
    case 2:
      return '按钮';
  }
};

const setMenuTypeColor = (type: number) => {
  switch (type) {
    case 0:
      return 'processing';
    case 1:
      return 'cyan';
    case 2:
      return 'blue';
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
        <a-form-item :label="t('菜单名')" name="name">
          <a-input :placeholder="t('请输入')" v-model:value="formState.name" />
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
        :pagination="false"
        :loading="isLoading"
        size="small"
        rowKey="id"
        :data-source="dataSource"
        bordered
        :columns="columns"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'menuType'">
            <a-tag :bordered="false" :color="setMenuTypeColor(record.menuType)">
              {{ formatMenuType(record.menuType) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link">{{ t('编辑') }}</a-button>
            <a-button danger type="link">{{ t('删除') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>

    <MenuFormModal ref="menuFormModalRef" />
  </div>
</template>
