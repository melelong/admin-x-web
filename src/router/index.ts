import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import Layout from "@/layout/Layout.vue";
// 路由配置
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@views/home/index.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/system',
                name: 'System',
                redirect: '/system/menu',
                meta: { title: '系统管理', icon: 'setting-outlined' },
                children: [
                    {
                        path: 'menu',
                        name: 'Menu',
                        component: () => import('@views/system/menu/index.vue'),
                        meta: { title: '菜单管理' }
                    },
                    {
                        path: 'user',
                        name: 'User',
                        component: () => import('@views/system/user/index.vue'),
                        meta: { title: '用户管理' }
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    console.log('to：', to)
    console.log('from：', from)
    next()
})

export default router