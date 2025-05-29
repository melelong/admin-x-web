import { SettingOutlined } from '@ant-design/icons-vue';
import Layout from '@/layout/Layout.vue';
export const settingList = [
  {
    path: '/setting',
    name: 'Setting',
    redirect: '/setting/theme',
    meta: { title: '系统设置', icon: SettingOutlined },
    component: Layout,
    children: [
      {
        path: 'theme',
        name: 'Theme',
        component: () => import('@views/setting/theme/index.vue'),
        meta: { title: '主题设置' },
      },
    ],
  },
];
