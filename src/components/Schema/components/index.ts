import type { Component } from 'vue';
import { FormElemType } from '../enums';

import SchemaCascader from './Cascader/SchemaCascader.vue';
import SchemaCheckbox from './Checkbox/SchemaCheckbox.vue';
import SchemaColorPicker from './ColorPicker/SchemaColorPicker.vue';
import SchemaDatePicker from './DatePicker/SchemaDatePicker.vue';
import SchemaInput from './Input/SchemaInput.vue';
import SchemaInputNumber from './InputNumber/SchemaInputNumber.vue';
import SchemaRadio from './Radio/SchemaRadio.vue';
import SchemaRate from './Rate/SchemaRate.vue';
import SchemaSelect from './Select/SchemaSelect.vue';
import SchemaSlider from './Slider/SchemaSlider.vue';
import SchemaSwitch from './Switch/SchemaSwitch.vue';
import SchemaTimePicker from './TimePicker/SchemaTimePicker.vue';
import SchemaTimeSelect from './TimeSelect/SchemaTimeSelect.vue';
import SchemaTreeSelect from './TreeSelect/SchemaTreeSelect.vue';

export default {
  [FormElemType.CASCADER]: SchemaCascader,
  [FormElemType.CHECKBOX]: SchemaCheckbox,
  [FormElemType.COLOR_PICKER]: SchemaColorPicker,
  [FormElemType.DATE_PICKER]: SchemaDatePicker,
  [FormElemType.INPUT]: SchemaInput,
  [FormElemType.INPUT_NUMBER]: SchemaInputNumber,
  [FormElemType.RADIO]: SchemaRadio,
  [FormElemType.RATE]: SchemaRate,
  [FormElemType.SELECT]: SchemaSelect,
  [FormElemType.SLIDER]: SchemaSlider,
  [FormElemType.SWITCH]: SchemaSwitch,
  [FormElemType.TIME_PICKER]: SchemaTimePicker,
  [FormElemType.TIME_SELECT]: SchemaTimeSelect,
  [FormElemType.TREE_SELECT]: SchemaTreeSelect,
} as Record<string, Component>;
