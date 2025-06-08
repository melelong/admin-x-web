<script setup lang="ts">
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs'

import { logList, type Log } from '@/api/system/logs';
import { t } from '@/i18n';

const isLoading = ref(false);
const dataSource = ref<Log[]>([]);
const getDataSource = async () => {
  isLoading.value = true;
  const res = await logList({ pageNum: 1, pageSize: 10 });
  dataSource.value = res.content;
  isLoading.value = false;
};

const columns = [
  {
    width: 90,
    title: '序号',
    customRender: ({ index }: { index: number }) => index + 1,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '名称',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '模块',
    dataIndex: 'module',
    key: 'module',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
    key: 'requestMethod',
  },
  {
    title: '操作时间',
    dataIndex: 'operationTime',
    key: 'operationTime',
    customRender: ({ text }: { text: string }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    key: 'action',
    width: '100px',
  },
];

const formState = ref({
  name: '',
});

const handleReset = () => {

};

const handleSearch = () => {

};

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
            <a-button type="link">{{ t('查看') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
