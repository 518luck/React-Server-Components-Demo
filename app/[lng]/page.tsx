import { useTranslation } from "@/app/i18n";

// app/page.js
export default async function Page({ params }: Readonly<{
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params

  const { t } = await useTranslation(lng)
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        {t('initText')}
      </span>
    </div>

  )
}
