import Link from "next/link";
//在服务端组件里，React 的 Context（上下文）是不可用的。这个特殊的 Trans 版本不依赖上下文，适合在服务器上直接渲染。
import { Trans } from "react-i18next/TransWithoutContext"; // 导入无需 Context 的 Trans 组件，适用于服务端组件
import { locales } from "@/config";
import { getTranslation } from "@/app/i18n/index";

// Footer 是一个异步服务端组件
export const Footer = async ({ lng }: { lng: string }) => {
  // 使用 footer 命名空间加载翻译
  const { t } = await getTranslation(lng, "footer");

  return (
    <footer style={{ margin: 20 }}>
      {/* Trans 组件用于处理包含 HTML 标签或变量的复杂翻译文本 values */}
      <Trans i18nKey="languageSwitcher" t={t} values={{ lng }}>
        Switch from <strong>{lng}</strong> to:
      </Trans>

      {/* 遍历所有支持的语言，过滤掉当前正在使用的语言 */}
      {locales
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {/* 如果不是第一个切换选项，前面加一个分隔符 | */}
              {index > 0 && " | "}
              {/* 链接到对应的语言路径，例如 /en 或 /zh */}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </footer>
  );
};
