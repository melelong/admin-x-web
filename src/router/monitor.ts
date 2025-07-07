import { SafetyCertificateOutlined } from '@ant-design/icons-vue';
import { t } from '@/i18n';
import Layout from '@/layout/Layout.vue';

export const monitorList = [
  {
    path: '/monitor',
    name: 'Monitor',
    redirect: '/monitor/scheduled-task',
    component: Layout,
    meta: { title: t('系统监控'), icon: SafetyCertificateOutlined },
    children: [
      {
        path: 'scheduled-task',
        name: 'ScheduledTask',
        component: () => import('@/views/monitor/scheduled-task/index.vue'),
        meta: { title: t('定时任务') },
      },
      {
        path: 'log',
        name: 'OperationLog',
        component: () => import('@/views/monitor/log/index.vue'),
        meta: { title: t('操作日志') },
      },
    ],
  },
];
