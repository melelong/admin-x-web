<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';

import { t } from '@/i18n';

import FormModal from './components/FormModal/index.vue';

const formRef = ref();
const handleQuery = () => {
};

const restQuery = () => {
  formRef.value.resetFields();
};

const formModalRef = ref();
const handleAdd = () => {
  formModalRef.value.showModal({});
};

const columns = [
  {
    width: 50,
    align: 'center',
    title: t('序号'),
    customRender: ({ index }: { index: number }) => index + 1,
  },
  {
    title: t('标题'),
    dataIndex: 'title',
  },
  {
    title: t('分类'),
    dataIndex: 'type',
  },
  {
    title: t('封面'),
    dataIndex: 'cover',
  },
  {
    title: t('状态'),
    dataIndex: 'status',
  },
  {
    align: 'center',
    width: 100,
    title: t('操作'),
    dataIndex: 'action',
  },
];

const dataSource = ref([
  {
    title: 'Vue 组件之间的通信还可以这样写',
    type: 'Vue',
    cover: 'https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/70039090229349cdb407bdb8a6f64d51~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qC85a2Q5oOK6Juw54mI:q75.awebp?rk3s=f64ab15b&x-expires=1749739551&x-signature=EKkUN9qOinUa66XzhAw0kNJh7FU%3D',
    status: '已发布',
  },
  {
    title: '总结 React Hooks 并对比在 Vue 3 中是怎么使用的',
    type: 'Vue、React',
    cover: 'https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/962d82a0ec034df7aa64d0ee933295bc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qC85a2Q5oOK6Juw54mI:q75.awebp?rk3s=f64ab15b&x-expires=1749739551&x-signature=gQu1UrGqangzSQHrlk6ScmbmHJY%3D',
    status: '已发布',
  },
  {
    title: '🪲正在开发后台管理系统的同学 UnoCSS 一定要用起来',
    type: 'JavaScript',
    cover: 'https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/31958bc621d646cab71c92753b580979~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5qC85a2Q5oOK6Juw54mI:q75.awebp?rk3s=f64ab15b&x-expires=1749739480&x-signature=RNm5Vq9GoUVI8TouFiNOOh8nEZY%3D',
    status: '已发布',
  },
]);
</script>

<template>
  <div class="m-10px">
    <div class="p-[10px_16px] mb-10px text-align-right rd-5px bg-#fff">
      <a-form layout="inline">
        <a-form-item :label="t('标题')">
          <a-input placeholder="请输入"></a-input>
        </a-form-item>
        <a-form-item :label="t('分类')">
         <div class="w-183px">
           <a-select style="text-align: left" placeholder="请选择"></a-select>
         </div>
        </a-form-item>
        <a-form-item>
          <a-button @click="restQuery">{{ t('重 置') }}</a-button>
          <a-button class="ml-16px" type="primary" @click="handleQuery">{{ t('搜 索') }}</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="p-16px rd-5px bg-#fff">
      <div class="mb-16px">
        <a-button type="primary" @click="handleAdd">
          <PlusOutlined />
          新增
        </a-button>
      </div>
      <a-table bordered :data-source="dataSource" size="small" :columns="columns">
        <template #bodyCell="{ column, text  }">
          <template v-if="column.dataIndex === 'action'">
            <div class="flex">
              <a-button type="link">编辑</a-button>
              <a-button type="link">详情</a-button>
            </div>
          </template>
          <template v-if="column.dataIndex === 'cover'">
            <a-image
              :width="60"
              :src="text"
            />
          </template>
          <template v-if="column.dataIndex === 'status'">
            <a-tag :bordered="false" color="processing">{{ text }}</a-tag>
          </template>
        </template>
      </a-table>
    </div>
    <FormModal ref="formModalRef" />
  </div>
</template>
