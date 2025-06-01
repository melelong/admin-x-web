export enum DisplayMode {
  /** 详情 */
  VIEW = 'VIEW',
  /** 编辑 */
  EDIT = 'EDIT',
  /** 只读 */
  READONLY = 'READONLY',
  /** 禁用 */
  DISABLED = 'DISABLED',
}

export enum FormElemType {
  /** 单选框 */
  RADIO = 'SCHEMA-RADIO',
  /** 多选框 */
  CHECKBOX = 'SCHEMA-CHECKBOX',
  /** 输入框 */
  INPUT = 'SCHEMA-INPUT',
  /** 计数器 */
  INPUT_NUMBER = 'SCHEMA-INPUT-NUMBER',
  /** 选择器 */
  SELECT = 'SCHEMA-SELECT',
  /** 级联选择器 */
  CASCADER = 'SCHEMA-CASCADER',
  /** 开关 */
  SWITCH = 'SCHEMA-SWITCH',
  /** 滑块 */
  SLIDER = 'SCHEMA-SLIDER',
  /** 时间选择器 */
  TIME_PICKER = 'SCHEMA-TIME-PICKER',
  /** 时间选择 */
  TIME_SELECT = 'SCHEMA-TIME-SELECT',
  /** 树形选择 */
  TREE_SELECT = 'SCHEMA-TREE-SELECT',
  /** 日期选择器 */
  DATE_PICKER = 'SCHEMA-DATE-PICKER',
  /** 评分 */
  RATE = 'SCHEMA-RATE',
  /** 颜色选择器 */
  COLOR_PICKER = 'SCHEMA-COLOR-PICKER',
}
