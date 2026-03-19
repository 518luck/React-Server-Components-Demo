import SidebarNoteItem from '@/components/SidebarNoteItem';
import type { Note } from '@/types';
export default async function NoteList({ notes }: { notes: Record<string, string> }) {

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