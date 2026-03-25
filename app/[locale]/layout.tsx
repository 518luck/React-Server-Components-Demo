import { Footer } from "@/components/Footer";
import "./style.css";
import Sidebar from "@/components/Sidebar";
import { locales } from "@/config";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
          <div>
            <Footer lng={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}
