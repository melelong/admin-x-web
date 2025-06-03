<script setup lang="ts">
import SchemaForm from '@/components/Schema/SchemaForm/index.vue';
import type { FormConfig, FormItemConfig } from '@/components/Schema/types';
import { initSchema } from '@/views/content/manage/components/FormModal/schema';
import { t } from '@/i18n';

const visible = ref(false);
const modalTile = ref('');
const showModal = () => {
  visible.value = true;
  modalTile.value = t('新增文章');
};

const formConfig = reactive<FormConfig>({
  layout: {
    gutter: 10,
  },
  props: {
    
  },
});

const formState = reactive<Record<string, any>>({

});

const formItems = computed<FormItemConfig[]>(() => {
  return initSchema();
});

const handleOk = async () => {

};

const onFormChange = () => {

};

defineExpose({
  showModal,
});
</script>

<template>
  <a-modal
    v-model:open="visible" width="60%" :title="modalTile" @ok="handleOk">
    <SchemaForm
      ref="formRef"
      :config="formConfig"
      :form-items="formItems"
      v-model:model="formState"
      @change="onFormChange"
    />
  </a-modal>
</template>
