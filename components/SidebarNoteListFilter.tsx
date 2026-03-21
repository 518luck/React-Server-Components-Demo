'use client'

import SidebarNoteItem from '@/components/SidebarNoteItem';
import type { Note } from '@/types';
import { useSearchParams } from 'next/navigation';

export default function SidebarNoteListFilter({ notes }: { notes: Record<string, string> }) {

    const searchParams = useSearchParams()
    const searchText = searchParams.get('q')

    return <ul className="notes-list">
        {Object.entries(notes).map(([noteId, note]) => {
            const noteData: Note = JSON.parse(note);
            if (!searchText || (searchText && noteData.title.toLowerCase().includes(searchText.toLowerCase()))) {
                return <li key={noteId}>
                    <SidebarNoteItem noteId={noteId} note={noteData} />
                </li>

            }
            return null
        })}
    </ul>

}