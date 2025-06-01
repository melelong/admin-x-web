<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFormOptions } from '../../hooks/use-form-options';
import type { FormItemProps } from '../../types';
import { FORM_ITEM_EMIT_NAME } from '../../constants';

defineOptions({ name: 'SchemaCascader' });

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
  <a-cascader
    v-else
    v-model="internalModel"
    :options="options"
    :props="props"
    @change="handleChange"
  >
    <template #empty v-if="props?.itemProps?.emptySlot">
      <slot :name="props.itemProps.emptySlot"></slot>
    </template>
  </a-cascader>
</template>
