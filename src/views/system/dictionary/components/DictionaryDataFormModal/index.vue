<script setup lang="ts">
import { message } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';

import { DictItem, saveDictData } from '@/api/system/dictionary';
import { t } from '@/i18n';

const formRef = ref();
const visible = ref(false);
const modalTile = ref('');
let callback: Function;
let dictIdValue: number;
const showModal = ({ onSuccess, row, dictId }: { onSuccess: Function, row?: DictItem, dictId: number }) => {
  dictIdValue = dictId;
  formData.value = {} as DictItem;
  callback = onSuccess;
  modalTile.value = row ? t('编辑字典数据') : t('新增字典数据');
  if (row) {
    formData.value = cloneDeep(row);
  }
  visible.value = true;
};

const isLoading = ref(false);

const formData = ref<DictItem>({} as DictItem);
const handleOk = async () => {
  isLoading.value = true;
  formData.value.dictId = dictIdValue;
  await saveDictData(formData.value).finally(() => {
    isLoading.value = false;
  });

  callback && callback();
  message.success(t('操作成功'));
  visible.value = false;
};

defineExpose({
  showModal,
});
</script>

<template>
  <a-modal v-model:open="visible" width="600px" :title="modalTile" @ok="handleOk">
    <a-form ref="formRef" :label-col="{ span: 5 }" :wrapperCol="{ span: 18 }" :model="formData">
      <a-form-item :label="t('字典名称')" name="dictName">
        <a-input :placeholder="t('请输入')" v-model:value="formData.itemLabel"></a-input>
      </a-form-item>
      <a-form-item :label="t('字典编码')" name="dictCode">
        <a-input :placeholder="t('请输入')" v-model:value="formData.itemValue"></a-input>
      </a-form-item>
      <a-form-item :label="t('排序')" name="sort">
        <a-input-number :placeholder="t('请输入')" v-model:value="formData.sort"></a-input-number>
      </a-form-item>
      <a-form-item :label="t('类型')" name="status">
        <a-radio-group v-model:value="formData.status">
          <a-radio :value="1">{{ t('启用') }}</a-radio>
          <a-radio :value="2">{{ t('禁用') }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
