<script setup lang="ts">
import { useFormOptions } from '@/components/Schema/hooks/useFormOptions';
import type { FormItemProps } from '@/components/Schema/types';
import { FORM_ITEM_EMIT_NAME } from '@/components/Schema/constants';

defineOptions({ name: 'SchemaSwitch' });

interface Props extends FormItemProps {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const internalModel = ref(props.formData[props.name]);

const { isView, viewSlot, viewValue } = useFormOptions(props, internalModel);

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, { ...props, internalModel });
};

defineExpose({
  bindFieldName: props.name,
  scope: props.scope,
});
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <a-switch v-else @change="handleChange" v-model:checked="internalModel">
    <template #active-action v-if="props?.itemProps?.activeActionSlot">
      <slot :name="props.itemProps.activeActionSlot"></slot>
    </template>
    <template #active-action v-if="props?.itemProps?.inactiveActionSlot">
      <slot :name="props.itemProps.inactiveActionSlot"></slot>
    </template>
  </a-switch>
</template>
