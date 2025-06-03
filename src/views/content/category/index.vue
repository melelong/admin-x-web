<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { type ColumnItem, type TableConfig } from '@/components/Schema/types';
import SchemaTable from '@/components/Schema/SchemaTable/index.vue';
import { initSchema } from '@/views/content/category/schema';

const columns = computed<ColumnItem[]>(() => {
  return initSchema();
});

const tableData = reactive([
  { name: '格子', age: 18, gender: 1 },
  { name: '格子大暑版', age: 20, gender: 2 },
  { name: '格子惊蛰版', age: 20, gender: 1 },
]);

const config = reactive<TableConfig>({
  tableProps: {
    size: 'small',
    border: true,
  },
  appendSlot: 'append',
});

const tableRef = ref();

/**提交表单*/
const submitForm = () => {
  tableRef.value
    .validate()
    .then((params: any) => {
      console.log('params', params);
      // ElMessage.success('操作成功')
    })
    .catch((error: any) => {
      console.log('error=>', error);
      // ElMessage.warning('请填写必填信息')
    });
};

/**重置表单*/
const restForm = () => {
  tableRef.value.resetFields();
};

/**表单填写值改变时触发*/
const change = (data: any) => {
  console.log('SpriteTableChange=>', data);
};

/**新增数据*/
const add = () => {
  tableData.push({} as any);
};

/**删除数据*/
const handleDel = (data: any) => {
  console.log(data);
  tableData.splice(data.scope.$index, 1);
};
</script>

<template>
  <div class="m-10px p-16px bg-#fff">
    <div>
      <a-button @click="add" type="primary">
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </div>
    <SchemaTable
      ref="tableRef"
      @change="change"
      :config="config"
      :columns="columns"
      :data="tableData"
    >
      <template #action="scope">
        <a-button type="danger" text @click="handleDel(scope)">删除</a-button>
      </template>
    </SchemaTable>
    <div>
      <a-button @click="restForm">重置表单</a-button>
      <a-button type="primary" @click="submitForm">提 交</a-button>
    </div>
  </div>
</template>
