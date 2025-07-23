import { ShareAltOutlined } from '@ant-design/icons-vue';
import { t } from '@/i18n';
import Layout from '@/layout/Layout.vue';
import WebView from '@/views/iframe/index.vue';

export const externalList = [
  {
    path: '/web-view',
    name: 'WebView',
    meta: { title: t('三方连接'), icon: ShareAltOutlined },
    component: Layout,
    children: [
      {
        path: 'JueJin',
        name: 'JueJin',
        meta: {
          title: t('掘金（内嵌）'),
          iframeUrl: 'https://juejin.cn/user/3237402792170343',
        },
        component: WebView,
      },
      {
        path: 'github',
        name: 'GitHub',
        meta: {
          title: t('GitHub（跳转）'),
          externalUrl: 'https://github.com',
        },
        component: { render: () => null },
      },
      {
        path: 'antd',
        name: 'Antd',
        meta: {
          title: t('Ant Design Vue（跳转）'),
          externalUrl: 'https://www.antdv.com/components/icon-cn',
        },
        component: { render: () => null },
      },
    ],
  },
];
