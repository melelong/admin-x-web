<script setup lang="ts">
import SchemaForm from '@/components/Schema/SchemaForm/index.vue';
import type { FormConfig, FormItemConfig } from '@/components/Schema/types';
import FormModal from './components/FormModal/index.vue';







const formRef = ref();

/**提交表单*/
const submitForm = () => {
  formRef.value
    .validate()
    .then(() => {
      // ElMessage.success('操作成功');
    })
    .catch((error: any) => {
      console.log('error=>', error);
      // ElMessage.warning('请填写必填信息');
    });
};

/**表单填写值改变时触发*/
const onFormChange = (data: any) => {
  console.log(data);
};

/**重置表单*/
const restForm = () => {
  formRef.value.resetFields();
};

const formModalRef = ref()
const handleAdd = () => {
  formModalRef.value.showModal({});
};
</script>

<template>
  <div class="m-10px p-16px bg-#fff">
    <SchemaForm
      ref="formRef"
      :config="formConfig"
      :form-items="formItems"
      v-model:model="formState"
      @change="onFormChange"
    />
    <div class="text-align-right">
      <a-button @click="restForm">重 置</a-button>
      <a-button class="ml-10px" type="primary" @click="submitForm">提 交</a-button>
    </div>

    <a-button @click="handleAdd">新增</a-button>

    <FormModal ref="formModalRef"/>
  </div>
</template>
