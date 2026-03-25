import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/config";

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4: 参数是 requestLocale（Promise），需要 await 获取实际值
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale,
  };
});
