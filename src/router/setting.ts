import {SettingOutlined} from "@ant-design/icons-vue";

export const settingList = [
    {
        path: '/setting',
        name: 'Setting',
        redirect: '/setting/theme',
        meta: { title: '系统设置', icon: SettingOutlined },
        children: [
            {
                path: 'theme',
                name: 'Theme',
                component: () => import('@views/setting/theme/index.vue'),
                meta: { title: '主题设置' }
            },
        ]
    }
]