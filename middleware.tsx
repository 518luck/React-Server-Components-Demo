// middleware.js
//概念：标准的国际化区域设置（Locale）匹配工具。
//简单说明：它拿“浏览器想要的语言”去和“你网站支持的语言”做对比，选出最合适的一个。
import { match } from '@formatjs/intl-localematcher'
//HTTP 内容协商（Content Negotiation）解析器。
//简单说明：它专门用来解析浏览器发给服务器的 Accept-Language 请求头。
import Negotiator from 'negotiator'
import { locales, defaultLocale } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

//匹配静态文件和 API 路由 
//检查一个字符串（通常是 URL 路径）是否以 . 后面跟着一段字符结尾
const publicFile = /\.(.*)$/

const excludeFile = ['logo.svg']

function getLocale(request: Request) {
    const headers = { 'accept-language': request.headers.get('accept-language') || '' };
    // 这里不能直接传入 request，有更简单的写法欢迎评论留言
    //简单说明：浏览器在发送请求时，会带上一个 Accept-Language 的请求头。这个头信息通常很乱（包含权重值 q）。.languages() 的任务就是把这个乱糟糟的字符串变成一个干净、有序的数组。
    const languages = new Negotiator({ headers }).languages();
    //找交集
    return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 1. 排除静态文件和 API 路由，避免干扰

    // 判断请求路径中是否已存在语言，已存在语言则跳过
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // 如果是 public 文件，不重定向
    // .test() 是一个内置方法。 它的作用是“检测”。它查看一个字符串是否符合某种规则，如果符合就返回 true，不符合就返回 false。
    //pathname.substr(1)：从索引 1 开始截取到最后。因为 URL 的 pathname 通常以 / 开头（如 "/logo.svg"），substr(1) 的作用就是把开头的斜杠去掉，变成 "logo.svg"。
    if (publicFile.test(pathname) && excludeFile.indexOf(pathname.substring(1)) == -1) return

    // 获取匹配的 locale  
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`

    // 默认语言不重定向
    if (locale == defaultLocale) {
        return NextResponse.rewrite(request.nextUrl)
    }

    // 重定向，如 /products 重定向到 /en-US/products
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
