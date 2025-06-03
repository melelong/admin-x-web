<script setup lang="ts">

import FormModal from './components/FormModal/index.vue';

const formRef = ref();

/**提交表单*/
const submitForm = () => {
};

/**重置表单*/
const restForm = () => {
  formRef.value.resetFields();
};

const formModalRef = ref();
const handleAdd = () => {
  formModalRef.value.showModal({});
};
</script>

<template>
  <div class="m-10px p-16px bg-#fff">
    <div class="text-align-right">
      <a-button @click="restForm">重 置</a-button>
      <a-button class="ml-10px" type="primary" @click="submitForm">提 交</a-button>
    </div>
    <a-button @click="handleAdd">新增</a-button>
    <FormModal ref="formModalRef" />
  </div>
</template>
