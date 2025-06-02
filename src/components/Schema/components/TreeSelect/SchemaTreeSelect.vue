<script setup lang="ts">
import { useFormOptions } from '@/components/Schema/hooks/useFormOptions';
import { FORM_ITEM_EMIT_NAME } from '@/components/Schema/constants';
import { FormItemProps } from '@/components/Schema/types';

defineOptions({ name: 'SchemaTreeSelect' });

interface Props extends FormItemProps {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const internalModel = ref(props.formData[props.name]);

const { isView, viewSlot, viewValue, options, loadOptions } = useFormOptions(props, internalModel);

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, { ...props, internalModel });
};

onMounted(() => {
  loadOptions();
});

defineExpose({
  loadOptions,
  bindFieldName: props.name,
  scope: props.scope,
});
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <a-tree-select v-else @change="handleChange" v-model="internalModel" :tree-data="options" />
</template>
