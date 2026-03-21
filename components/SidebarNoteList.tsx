import { getAllNotes } from '@/lib/redis';
import sleep from '@/lib/sleep';
import SidebarNoteListFilter from '@/components/SidebarNoteListFilter';

export default async function NoteList() {
    await sleep(2000)

    //从 Redis 中获取所有笔记
    const notes: Record<string, string> = await getAllNotes()

    const arr = Object.entries(notes);

    if (arr.length == 0) {
        return <div className="notes-empty">
            {'No notes created yet!'}
        </div>
    }

    return <SidebarNoteListFilter notes={notes} />

}