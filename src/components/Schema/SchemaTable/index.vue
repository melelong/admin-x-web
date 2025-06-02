<script setup lang="ts">
import { isFunction, isString, isUndefined, omit } from 'lodash-es';
import { reactive, ref } from 'vue';
import {
  FORM_EMIT_NAME,
  TABLE_CELL_COMPONENT,
  TABLE_CELL_CUSTOM_SLOT,
  TABLE_CELL_SLOT,
  TABLE_ROW_VALUE_KEY,
} from '../constants';
import SchemaFormMap from '@/components/Schema/components';
import { CellChangeParams, ColumnItem, TableConfig } from '@/components/Schema/types';

interface Props {
  config?: TableConfig;
  columns: ColumnItem[];
  data: Record<string, any>[];
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  data: () => [],
});

const emit = defineEmits([FORM_EMIT_NAME]);

/**
 * 整个渲染的表单实例对象
 */
const formItemListRef = ref();

const form = reactive({
  data: props.data,
});

/**
 * 根据字段名获取当前字段绑定的组件实例
 * @param data.targetField 字段名
 * @param data.index 行索引
 */
const getInstanceByField = (data: { targetField: string; index: number }): any => {
  const { targetField, index } = data;
  for (const itemRef of formItemListRef.value) {
    const { bindFieldName, scope } = itemRef;
    if (bindFieldName === targetField && index == scope.$index) {
      return itemRef;
    }
  }
  return null;
};

/**
 * 当前渲染组件类型
 */
const getComponent = (component: string) => {
  return SchemaFormMap[component] || component;
};

/**
 * 加载字典数据，如下拉选择、多选、单选
 */
const loadOptions = (data: {
  targetField: string;
  index: number;
  params?: Record<string, any>;
}): any => {
  const { targetField, index, params } = data;
  const itemRef: any = getInstanceByField({ targetField, index });
  if (itemRef && isFunction(itemRef.loadOptions)) {
    return itemRef.loadOptions(params);
  }
};

/**
 * 根据字段名获取当前字段配置
 * @param targetField 字段名
 */
const getPropsByField: (targetField: string) => ColumnItem | undefined = (targetField) => {
  const findIndex = props.columns.findIndex((item) => item.dataIndex === targetField);
  if (findIndex >= 0) {
    return props.columns[findIndex];
  }
};

/**
 * 表单数据发生改变时触发
 */
const handleChange = (params: { value: any; scope: any; item: ColumnItem; event: any }) => {
  const { item, scope } = params || {};
  const payload: CellChangeParams = {
    loadOptions: (data: { targetField: string; index?: number; params?: Record<string, any> }) => {
      return loadOptions({
        ...data,
        index: isUndefined(data.index) ? scope.$index : data.index,
      });
    },
    getInstanceByField: (data: { targetField: string; index?: number }) => {
      return getInstanceByField({
        ...data,
        index: isUndefined(data.index) ? scope.$index : data.index,
      });
    },
    getPropsByField,
    formData: form,
    row: scope.row,
    ...params,
    instance: formItemListRef.value,
  };
  if (isFunction(item.change)) {
    item.change(payload);
  }
  emit(FORM_EMIT_NAME, payload);
};

/**
 * 格式化单元格的值
 */
const formatCellValue = (params: { value: any; scope: any; item: ColumnItem }) => {
  const { value, item } = params;
  let cellValue = value;
  if (isFunction(item.format)) {
    cellValue = item.format(params);
  }
  return cellValue || item.emptyText || props.config?.emptyText;
};

/**
 * 设置当前单元格表单组件并返回是否使用表单组件
 */
const chkAndSetCellComponent = (params: { value: any; scope: any; item: ColumnItem }) => {
  const { item, scope } = params;
  let component = item.component;
  if (isFunction(item.component)) {
    component = item.component({ ...params, index: scope.$index, row: scope.row, form });
  }
  if (isString(component)) {
    scope.row[`${TABLE_CELL_COMPONENT}${item.dataIndex}`] = component;
  }
  return component || false;
};

/**
 * 设置当前单元格表单插槽并返回是否使用表单插槽
 */
const chkAndSetCellSlot = (params: { value: any; scope: any; item: ColumnItem }) => {
  const { item, scope } = params;
  let slot = item.slot;
  if (isFunction(item.slot)) {
    slot = item.slot({ ...params, index: scope.$index, row: scope.row, form });
  }
  if (isString(slot)) {
    scope.row[TABLE_CELL_SLOT] = slot;
  }
  return slot || false;
};

/**
 * 设置当前单元格自定义插槽并返回是否使用自定义插槽
 */
const chkAndSetCellCustomSlot = (params: { value: any; scope: any; item: ColumnItem }) => {
  const { item, scope } = params;
  let customSlot = item.customSlot;
  if (isFunction(item.customSlot)) {
    customSlot = item.customSlot({ ...params, index: scope.$index, row: scope.row, form });
  }
  if (isString(customSlot)) {
    scope.row[TABLE_CELL_CUSTOM_SLOT] = customSlot;
  }
  return customSlot || false;
};

/**
 * 表单组件属性
 */
const getComponentProps = (item: ColumnItem, scope: any) => {
  return {
    // 忽略 disabled、readonly
    ...omit(item, 'disabled', 'readonly'),
    // 字段组件配置
    ...item.props,
    scope,
    formData: scope.row,
  };
};
const columnStore = reactive<Record<string, any>>({});

/**
 * 表单项校验规则 TABLE_COLUMN_RULES
 */
const chkAndSetRules = (item: ColumnItem) => {
  let rules: any[] = [];
  if (Array.isArray(item?.rules)) {
    rules = item?.rules;
  } else if (item.required) {
    rules = [
      {
        required: true,
        message: `${item.label || item.dataIndex}必填`,
        trigger: 'change',
      },
    ];
  }
  columnStore[item.dataIndex] = rules.some((item) => item.required);
  return rules.length > 0 ? rules : [];
};

const formRef = ref();
const tableRef = ref();

const validate = () => {
  return formRef.value?.validate;
};

/**
 * 重置表单
 */
const resetFields = () => {
  formRef.value?.resetFields();
};

const getFormData = () => {
  return form.data.map((item) => {
    const keys = Object.keys(item);
    return {
      // 忽略表格配置时，设置的临时字段
      ...omit(
        item,
        keys.filter((key) => key.includes(TABLE_ROW_VALUE_KEY)),
      ),
    };
  });
};

/**
 * 自定义列表描述样式类
 */
const labelClassName = (item: ColumnItem) => {
  if (columnStore[item.dataIndex]) {
    return 'schema-column-required';
  }
};

/**
 * @validate 表单校验
 * @resetFields 表单重置
 * @formRef 表单实例对象
 * @tableRef 表格实例对象
 * @getFormData 获取表格数据
 */
defineExpose({
  validate,
  resetFields,
  formRef,
  tableRef,
  getFormData,
});
</script>

<template>
  <a-form ref="formRef" :model="form" v-bind="config?.formProps">
    <a-table ref="tableRef" :data-source="form.data" v-bind="config?.tableProps" :columns="columns">
    </a-table>
  </a-form>
</template>
