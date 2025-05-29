import { createI18n, type I18n, useI18n as baseUseI18n } from 'vue-i18n'
import { App, ref, computed } from 'vue'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import keyMap from './locales/key-map.json'

// 响应式语言状态
const currentLocale = ref<'zh-CN' | 'en-US'>(
    (localStorage.getItem('lang') as any) || 'zh-CN'
)

// 创建 i18n 实例
export const i18n = createI18n({
    legacy: false,
    locale: currentLocale.value,
    fallbackLocale: 'en-US',
    messages: { 'zh-CN': zhCN, 'en-US': enUS },
    silentTranslationWarn: true
})

/**
 * 创建响应式翻译函数
 * 1. 通过计算属性确保语言切换时自动更新
 * 2. 使用闭包缓存映射关系避免重复计算
 */
const createTFunction = () => {
    const localeRef = computed(() => i18n.global.locale.value)

    return computed(() => {
        const rawT = i18n.global.t
        const locale = localeRef.value

        return (text: string) => {
            const key = keyMap[text] || text
            const result = rawT(key)
            return result === key ? text : result
        }
    })
}

// 导出的响应式翻译函数
export const t = createTFunction()

// 设置语言的函数
export function setLocale(lang: 'zh-CN' | 'en-US') {
    currentLocale.value = lang
    i18n.global.locale.value = lang
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
}

// 获取当前语言
export const getLocale = () => currentLocale.value

// 增强版 useI18n 组合式函数
export function useI18n() {
    const base = baseUseI18n({ useScope: 'global' })

    return {
        t: t.value, // 直接返回翻译函数
        locale: computed(() => currentLocale.value),
        setLocale,
        // 保留原始方法
        ...base
    }
}

// 类型扩展
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: ReturnType<typeof t.value>
    }
}

// 安装 i18n 插件
export function setupI18n(app: App) {
    app.use(i18n)

    // 全局注入自定义 t 函数
    app.config.globalProperties.$t = (text: string) => {
        const key = keyMap[text] || text
        return i18n.global.t(key) || text
    }
}