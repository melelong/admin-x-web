import { createI18n, type I18n, type Composer } from 'vue-i18n';
import { App, ref, computed, readonly } from 'vue';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';
import { getLang, setLang } from '@/utils/lang';

type SupportedLocale = 'zh-CN' | 'en-US';

// 定义翻译文件类型
type TranslationDictionary = Record<string, string>;
type LocaleMessages = Record<SupportedLocale, TranslationDictionary>;

/** 语言状态 */
const currentLocale = ref<SupportedLocale>(getLang() as SupportedLocale || 'zh-CN');

// 创建反向映射：从中文文本到 KEY
const textToKeyMap: Map<string, string> = new Map();
Object.entries(zhCN as TranslationDictionary).forEach(([key, value]) => {
  textToKeyMap.set(value, key);
});

// 创建完整的消息对象
const messages: LocaleMessages = {
  'zh-CN': zhCN as TranslationDictionary,
  'en-US': enUS as TranslationDictionary
};

/** 创建 i18n 实例 */
export const i18n: I18n = createI18n({
  legacy: false,
  locale: currentLocale.value,
  fallbackLocale: 'en-US',
  messages,
  silentTranslationWarn: true,
});

// 获取全局 composer 实例
const globalI18n = i18n.global as unknown as Composer;

/**
 * 智能翻译函数
 *
 * 使用方式：
 * t('中文文本') - 自动查找对应的 KEY 并进行翻译
 * t('KEY12345678') - 直接使用 KEY 进行翻译
 *
 * 回退机制：
 * 1. 如果是中文文本输入，且找不到对应 KEY，返回原始中文文本
 * 2. 如果是 KEY 输入，且找不到翻译，返回 KEY 本身
 */
export const t = computed(() => (input: string): string => {
  // 判断输入是否是 KEY（12位大写字母和数字）
  const isKey = /^[A-Z0-9]{12}$/.test(input);

  // 获取实际要翻译的 KEY
  const key = isKey ? input : textToKeyMap.get(input) || input;

  try {
    // 使用类型安全的翻译调用
    const result = globalI18n.t(key);

    // 处理未找到翻译的情况
    if (result === key) {
      return isKey ? key : input;
    }

    return result;
  } catch (error) {
    // 在开发环境下输出错误信息
    if (process.env.NODE_ENV === 'development') {
      console.warn(`翻译错误: key=${key}, input=${input}`, error);
    }
    return isKey ? key : input;
  }
});

/** 设置语言 */
export function setLocale(lang: SupportedLocale) {
  setLang(lang);
  currentLocale.value = lang;
  globalI18n.locale.value = lang;
  document.documentElement.lang = lang;
}

/** 当前语言状态 */
export const currentLanguage = readonly(currentLocale);

/** 安装 i18n */
export function setupI18n(app: App) {
  app.use(i18n);
}