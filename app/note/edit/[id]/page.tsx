import NoteEditor from '@/components/NoteEditor'
import { getNote } from '@/lib/redis';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const noteId = id;
    const note = await getNote(noteId)

    // 让效果更明显
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    await sleep(3000);

    if (note === null) {
        return (
            <div className="note--empty-state">
                <span className="note-text--empty-state">
                    Click a note on the left to view something! 🥺
                </span>

            </div>

        )
    }

    return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}
