import SidebarNoteItem from '@/components/SidebarNoteItem';
import type { Note } from '@/types';
import { getAllNotes } from '@/lib/redis';

export default async function NoteList() {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(3000)

    const notes: Record<string, string> = await getAllNotes()

    const arr = Object.entries(notes);

    if (arr.length == 0) {
        return <div className="notes-empty">
            {'No notes created yet!'}
        </div>

    }

    return <ul className="notes-list">
        {arr.map(([noteId, noteString]) => {
            const note: Note = JSON.parse(noteString);
            return <li key={noteId}><SidebarNoteItem noteId={noteId} note={note} /></li>
        })}
    </ul>

}