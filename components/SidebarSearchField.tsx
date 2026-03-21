'use client';

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

function Spinner({ active = true }) {
    return (
        <div
            className={['spinner', active && 'spinner--active'].join(' ')}
            role="progressbar"
            aria-busy={active ? 'true' : 'false'}
        />
    );
}

export default function SidebarSearchField() {
    const { replace } = useRouter()
    const pathname = usePathname()
    //useTransition 是一个 React Hook，它允许你在不阻塞 UI 的情况下更新状态（或导航）。
    const [isPending, startTransition] = useTransition()

    function handleSearch(term: string) {
        //URLSearchParams  它能把原本一长串乱糟糟的字符串（比如 ?q=react&id=123），变成一个可以轻松操作的对象。
        //window.location.search 拿到浏览器地址栏里当前的全部参数字符串。
        const params = new URLSearchParams(window.location.search)

        if (term) {
            //set(name, value): 设置参数。如果参数已存在就覆盖，不存在就新建。
            params.set('q', term)
        } else {
            params.delete('q')
        }

        startTransition(() => {
            //replace: 跳转到新页面，但会替换掉当前的历史条目。这意味着点击返回按钮时，会直接回到进入这个页面之前的状态。
            //toString(): 最核心的方法。它会把这个对象重新转换成标准的 URL 格式
            replace(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="search" role="search">
            <label className="offscreen" htmlFor="sidebar-search-input">
                Search for a note by title
            </label>

            <input
                id="sidebar-search-input"
                placeholder="Search"
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Spinner active={isPending} />
        </div>

    );
}