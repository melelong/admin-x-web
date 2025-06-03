import { FormElemType } from '@/components/Schema/enums';
import { getPoliticalOutlooks } from '@/views/content/mock';

export const initSchema = () => {
  return [
    {
      name: 'name',
      dataIndex: 'name',
      title: '姓名',
      component: FormElemType.INPUT,
    },
    {
      name: 'age',
      dataIndex: 'age',
      title: '年龄',
      required: true,
      component: FormElemType.INPUT_NUMBER,
      props: {
        controlsPosition: 'right',
      },
    },
    {
      dataIndex: 'gender',
      title: '性别',
      component: FormElemType.SELECT,
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' },
      ],
    },
    {
      dataIndex: 'subjectType',
      title: '学科倾向',
      component: FormElemType.RADIO,
      required: true,
      options: [
        { value: 0, label: '文科' },
        { value: 1, label: '理科' },
      ],
      change: async function(params) {
        const { loadOptions } = params;
        // 重新加载一次爱好的选项数据
        loadOptions({
          targetField: 'hobby',
        });
      },
    },
    {
      dataIndex: 'hobby',
      title: '爱好',
      component: FormElemType.CHECKBOX,
      required: true,
      visible: ({ formData }: any) => {
        // 当前选择了学科倾向后才会显示爱好
        return formData.subjectType ?? false;
      },
      options: ({ formData }: any) => {
        // 选择文科：政治、历史、地理
        // 选择理科：物理、化学、生物
        const subjects = [
          { value: 0, label: '政治', type: 0 },
          { value: 1, label: '历史', type: 0 },
          { value: 2, label: '地理', type: 0 },
          { value: 3, label: '物理', type: 1 },
          { value: 4, label: '化学', type: 1 },
          { value: 5, label: '生物', type: 1 },
        ];
        return subjects.filter((item) => item.type === formData.subjectType);
      },
      props: {
        width: 240,
      },
    },
    {
      component: FormElemType.SELECT,
      title: '政治面貌',
      dataIndex: 'politicalOutlook',
      labelKey: 'name',
      valueKey: 'value',
      required: true,
      remoteOptions: () => {
        return getPoliticalOutlooks();
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      customSlot: 'action',
      props: {
        width: 100,
      },
    },
  ];
};