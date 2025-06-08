<script setup lang="ts">
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';

import { listRoles } from '@/api/system/roles';
import { t } from '@/i18n';

const isLoading = ref(false);
const dataSource = ref<any[]>([]);
const getDataSource = async () => {
  isLoading.value = true;
  const res = await listRoles({ pageNum: 1, pageSize: 10 });
  dataSource.value = res.data.records;
  isLoading.value = false;
};

const columns = [
  {
    width: 90,
    title: '序号',
    customRender: ({ index }: { index: number }) => index + 1,
  },
  {
    title: '名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '编码',
    dataIndex: 'roleKey',
    key: 'roleKey',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
  {
    title: '操作',
    key: 'action',
    width: '160px',
  },
];

const formState = ref({
  name: ''
});

const handleReset = () => {

}

const handleSearch = () => {

}

onMounted(async () => {
  await getDataSource();
});

</script>

<template>
  <div class="m-10px">
    <div class="bg-white p-16px">
      <a-form ref="formRef" :model="formState" layout="inline">
        <a-form-item :label="t('名称')" name="name">
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
    <div class="p-16px bg-white rounded">
      <a-table :loading="isLoading" size="small" :data-source="dataSource" bordered :columns="columns">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a-button type="link">{{ t('编辑') }}</a-button>
            <a-button danger type="link">{{ t('删除') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
