<script setup lang="ts">
import { useFormOptions } from '@/components/Schema/hooks/useFormOptions';
import type { FormItemProps } from '@/components/Schema/types';

defineOptions({ name: 'SchemaDatePicker' });

interface Props extends FormItemProps {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const { isView, viewSlot, viewValue } = useFormOptions(
  props,
  computed(() => props.value),
);

const emit = defineEmits<{
  (e: 'field-change', payload: { name: string; value: any }): void;
}>();
const handleChange = (value: string) => {
  emit('field-change', { name: props.name, value });
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
  <a-date-picker v-else :value="value" @change="handleChange" />
</template>
