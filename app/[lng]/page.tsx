// app/page.js
export default async function Page({ params }: Readonly<{
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">
        Click a {lng} note on the left to view something! 🥺
      </span>
    </div>

  )
}
