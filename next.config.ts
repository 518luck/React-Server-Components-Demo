import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// 第一层括号给路径，第二层括号给配置
export default withNextIntl("./i18n.ts")(nextConfig);
