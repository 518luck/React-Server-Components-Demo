import Note from '@/components/Note'
import { getNote } from '@/lib/redis';
import sleep from '@/lib/sleep';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    // 动态路由 获取笔记 id
    const { id } = await params;
    const noteId = id;

    const note = await getNote(noteId)

    // 为了让 Suspense 的效果更明显
    await sleep(2000);

    if (note == null) {
        return (
            <div className="note--empty-state">
                <span className="note-text--empty-state">
                    Click a note on the left to view something! 🥺
                </span>

            </div>

        )
    }

    return <Note noteId={noteId} note={note} />
}
