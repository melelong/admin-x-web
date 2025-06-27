<script setup lang="ts">
import { FORM_ITEM_EMIT_NAME } from '@/components/Schema/constants';
import { useFormOptions } from '@/components/Schema/hooks/useFormOptions';
import type { FormItemProps } from '@/components/Schema/types';

interface Props extends FormItemProps {
  value?: Array<string | number | boolean>;
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => [],
});

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
  <a-checkbox-group v-else @change="handleChange" v-model="internalModel">
    <a-checkbox
      v-for="item in options"
      :key="item[valueKey]"
      :value="item[valueKey]"
      v-bind="props?.itemProps?.optionProps"
    >
      {{ item[labelKey] }}
    </a-checkbox>
  </a-checkbox-group>
</template>
