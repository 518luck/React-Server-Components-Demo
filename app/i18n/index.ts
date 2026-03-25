import { createInstance } from 'i18next' // i18next 核心库，用于创建国际化实例
import resourcesToBackend from 'i18next-resources-to-backend' // i18next 插件，用于动态加载本地语言文件
import { initReactI18next } from 'react-i18next/initReactI18next' // i18next 的 React 适配层，用于初始化 React 集成
import { locales, defaultLocale } from '@/config' // 导入项目定义的语言包列表和默认语言配置

//定义异步函数。接收两个参数：lng（当前语言，默认是 defaultLocale）和 ns（当前需要的命名空间，默认是 'basic'）。
const initI18next = async (lng = defaultLocale, ns = 'basic') => {
    const i18nInstance = createInstance()//生成一个全新的 i18n 引擎实例，保证配置隔离。
    await i18nInstance
        .use(initReactI18next)
        .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
        .init({
            // debug: true, //i18next 实例的一个调试模式 (Debug Mode) 标志位。
            supportedLngs: locales,     // 项目支持哪些语言（如 ['en', 'zh']）
            fallbackLng: defaultLocale, // 如果找不到当前语言，回退到哪个语言
            lng,                        // 当前实例要使用的语言
            fallbackNS: 'basic',        // 如果某个 Key 在当前命名空间找不到，去 'basic' 里找
            defaultNS: 'basic',         // 默认的命名空间名
            ns                          // 预加载指定的命名空间
        })
    return i18nInstance
}

export async function getTranslation(lng: string, ns?: string, options: any = {}) {
    const i18nextInstance = await initI18next(lng, ns)
    return {
        t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
        i18n: i18nextInstance
    }
}