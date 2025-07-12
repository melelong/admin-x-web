<script setup lang="ts">
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import Avatar from '@/components/Avatar/index.vue';
import { userPage, User } from '@/api/user';

import UserFormModal from './components/UserFormModal/index.vue';
import { message } from 'ant-design-vue';

const userFormModalRef = ref();
const formState = reactive({
  username: '',
  nickname: '',
});

const columns = [
  {
    width: 50,
    title: '序号',
    customRender: ({ index }: { index: number }) => index + 1,
  },
  {
    title: '用户',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    width: 150,
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    customRender: ({ record }: { record: Record<string, any> }) => {
      switch (record.gender) {
        case 0:
          return '未知';
        case 1:
          return '男';
        case 2:
          return '女';
      }
    },
  },
  {
    width: 150,
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    width: 150,
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    width: 150,
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  },
  {
    width: 150,
    title: '操作',
    key: 'action',
  },
];

const dataSource = ref<User[]>([]);

const handleEdit = (row: User) => {
  userFormModalRef.value.showModal({
    title: '编辑用户',
    row,
    onSuccess: () => {
      getDataSource();
    },
  });
};

const handleDel = (index: number) => {
  dataSource.value.splice(index, 1);
  message.success('操作成功');
};

const isLoading = ref(false);
const getDataSource = async () => {
  isLoading.value = true;
  const res = await userPage({ current: 1, size: 100 });
  dataSource.value = res.data.records;
  isLoading.value = false;
};

const formRef = ref();
const handleReset = () => {
  formRef.value.resetFields();
  getDataSource();
};

onMounted(() => {
  getDataSource();
});
</script>
<template>
  <div class="m-10px">
    <a-card>
      <a-form :model="formState" ref="formRef" layout="inline">
        <a-form-item label="用户名" name="username">
          <a-input placeholder="请输入" v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="昵称" name="nickname">
          <a-input placeholder="请输入" v-model:value="formState.nickname" />
        </a-form-item>
        <a-form-item>
          <a-button @click="handleReset">
            <ReloadOutlined />
            重置
          </a-button>
          <a-button @click="getDataSource" class="ml-8px" type="primary">
            <SearchOutlined />
            搜索
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card class="my-16px">
      <a-table
        :loading="isLoading"
        size="small"
        :data-source="dataSource"
        bordered
        :columns="columns"
      >
        <template #bodyCell="{ record, column, index }">
          <template v-if="column.key === 'nickname'">
            <Avatar :src="record.avatar" />
            {{ record.nickname }}
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 0 ? 'processing' : 'error'" :bordered="false"
              >{{ record.status === 0 ? '启用' : '停用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-button danger type="link" @click="handleDel(index)">删除</a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 新增和编辑用户 -->
    <UserFormModal ref="userFormModalRef" />
  </div>
</template>
