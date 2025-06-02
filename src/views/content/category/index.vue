<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
import { type ColumnItem, type TableConfig } from '@/components/Schema/types';
import SchemaTable from '@/components/Schema/SchemaTable/index.vue';
import { FormElemType } from '@/components/Schema/enums';
import { getPoliticalOutlooks } from '../mock';

const columns = computed<ColumnItem[]>(() => {
  return [
    {
      name: 'name',
      dataIndex: 'name',
      title: '姓名',
      component: FormElemType.INPUT,
    },
    {
      name: 'age',
      dataIndex: 'age',
      title: '年龄',
      required: true,
      component: FormElemType.INPUT_NUMBER,
      props: {
        controlsPosition: 'right',
      },
    },
    {
      dataIndex: 'gender',
      title: '性别',
      component: FormElemType.SELECT,
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' },
      ],
    },
    {
      dataIndex: 'subjectType',
      title: '学科倾向',
      component: FormElemType.RADIO,
      required: true,
      options: [
        { value: 0, label: '文科' },
        { value: 1, label: '理科' },
      ],
      change: async function (params) {
        const { loadOptions } = params;
        // 重新加载一次爱好的选项数据
        loadOptions({
          targetField: 'hobby',
        });
      },
    },
    {
      dataIndex: 'hobby',
      title: '爱好',
      component: FormElemType.CHECKBOX,
      required: true,
      visible: ({ formData }: any) => {
        // 当前选择了学科倾向后才会显示爱好
        return formData.subjectType ?? false;
      },
      options: ({ formData }: any) => {
        // 选择文科：政治、历史、地理
        // 选择理科：物理、化学、生物
        const subjects = [
          { value: 0, label: '政治', type: 0 },
          { value: 1, label: '历史', type: 0 },
          { value: 2, label: '地理', type: 0 },
          { value: 3, label: '物理', type: 1 },
          { value: 4, label: '化学', type: 1 },
          { value: 5, label: '生物', type: 1 },
        ];
        return subjects.filter((item) => item.type === formData.subjectType);
      },
      props: {
        width: 240,
      },
    },
    {
      component: FormElemType.SELECT,
      title: '政治面貌',
      dataIndex: 'politicalOutlook',
      labelKey: 'name',
      valueKey: 'value',
      required: true,
      remoteOptions: () => {
        return getPoliticalOutlooks();
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      customSlot: 'action',
      props: {
        width: 100,
      },
    },
  ];
});

const tableData = reactive([
  { name: '格子', age: 18, gender: 1 },
  { name: '格子大暑版', age: 20, gender: 2 },
  { name: '格子惊蛰版', age: 20, gender: 1 },
]);

const config = reactive<TableConfig>({
  tableProps: {
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
