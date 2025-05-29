<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import MenuFormModal from './components/MenuFormModal/index.vue';

  const formState = reactive({
    name: '',
    status: '',
  });
  const columns = [
    {
      title: '序号',
      customRender: ({ index }) => index + 1,
    },
    {
      title: '菜单名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'path',
      key: 'path',
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
  const dataSource = [
    { name: '首页', path: '/', status: '已启用' },
    { name: '菜单管理', path: '/system/menu', status: '已启用' },
    { name: '用户管理', path: '/system/user', status: '已启用' },
    { name: '角色管理', path: '/system/role', status: '已停用' },
  ];

  const menuFormModalRef = ref();
  const handleAdd = () => {
    menuFormModalRef.value.showModal({});
  };
</script>
<template>
  <div class="m-10px">
    <div class="bg-white p-16px">
      <a-form layout="inline">
        <a-form-item label="菜单名" name="username">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="状态" name="nickname">
          <a-input v-model:value="formState.status" />
        </a-form-item>
        <a-form-item>
          <a-button>
            <ReloadOutlined />
            重置
          </a-button>
          <a-button class="ml-8px" type="primary">
            <SearchOutlined />
            搜索
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="my-16px p-16px bg-white">
      <div class="mb-16px">
        <a-button @click="handleAdd" type="primary">
          <PlusOutlined />
          新增
        </a-button>
      </div>
      <a-table :data-source="dataSource" bordered :columns="columns">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a-button type="link">编辑</a-button>
            <a-button danger type="link">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>

    <MenuFormModal ref="menuFormModalRef" />
  </div>
</template>
