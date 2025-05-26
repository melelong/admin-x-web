import {SafetyCertificateOutlined} from '@ant-design/icons-vue'
import Layout from "@/layout/Layout.vue";
export const monitorList = [
    {
        path: '/monitor',
        name: 'Monitor',
        redirect: '/monitor/scheduled-task',
        component: Layout,
        meta: { title: '系统监控', icon: SafetyCertificateOutlined },
        children: [
            {
                path: 'scheduled-task',
                name: 'ScheduledTask',
                component: () => import('@views/monitor/scheduled-task/index.vue'),
                meta: { title: '定时任务' }
            },
            {
                path: 'operation-log',
                name: 'OperationLog',
                component: () => import('@views/monitor/operation-log/index.vue'),
                meta: { title: '操作日志' }
            },
        ]
    }
]