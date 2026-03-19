import { marked } from 'marked'           // 代表“翻译官”：负责把 Markdown 转成 HTML
import sanitizeHtml from 'sanitize-html'  // 代表“安检员”：负责过滤掉危险代码

// 允许显示的标签。除了默认的，我们额外允许了图片 <img> 和标题 <h1>~<h3>
// sanitize-html.defaults.allowedTags 是库自带的一套“基础套餐”，通常只包含 <b>, <i>, <a>, <p> 等最基本的文本标签。
// 逻辑：通过 .concat([...])，你在基础套餐上又增加了 img（图片）和 h1~h3（大标题）。
// 如果不加这个：即便你在笔记里写了 # 这是一个标题，经过处理后，<h1> 标签会被强行删掉，变成一段没有任何样式的普通文字。
const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'h1',
    'h2',
    'h3'
])

// 允许的属性。比如图片 <img> 必须允许有 src 和 alt 属性，否则图显不出来
// sanitizeHtml.defaults.allowedAttributes 是默认允许的属性集合。
// 逻辑：我们基于默认集合，额外给 img 标签开放了 src（图片地址）和 alt（图片描述）这两个关键属性。
// 如果不加这个：你的图片 <img> 标签虽然存在，但因为没有 alt 属性，会被 sanitize-html 视为不安全而直接移除，图片自然就看不到了。
const allowedAttributes = Object.assign(
    {},
    sanitizeHtml.defaults.allowedAttributes,
    {
        img: ['alt', 'src']
    }
)

//dangerouslySetInnerHTML : 这是一个 React 属性，它允许你直接将一个字符串作为 HTML 插入到 DOM 中。
// 正常情况下，React 会阻止这种操作（为了防止 XSS 攻击）。
// 但在这里，我们通过 sanitize-html 库对内容进行了严格的“安检”，确保没有恶意代码，所以使用它是安全的。
export default function NotePreview({ children }: { children: string }) {

    // marked.parse() 在没有异步插件时实际返回的是 string，这里用类型断言告诉 TypeScript
    const html = marked.parse(children || '') as string;

    return (
        <div className="note-preview">
            <div
                className="text-with-markdown"
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(html, {
                        allowedTags,
                        allowedAttributes
                    })
                }}
            />
        </div>
    )
}
