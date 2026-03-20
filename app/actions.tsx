'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addNote, updateNote, delNote } from '@/lib/redis';

export async function saveNote(formData: FormData) {

    let noteId = String(formData.get('noteId'));
    const title = formData.get('title')
    const body = formData.get('body')

    const data = JSON.stringify({
        title,
        content: body,
        updateTime: new Date()
    })

    if (noteId && noteId !== null) {
        await updateNote(noteId, data)
    } else {
        noteId = await addNote(data)
    }

    // 通知 Next.js：数据变了，请重新获取页面数据
    revalidatePath('/')
    redirect(`/note/${noteId}`)
}

export async function deleteNote(formData: FormData) {
    const noteId = String(formData.get('noteId'));
    await delNote(noteId)
    // 通知 Next.js：数据变了，请重新获取页面数据
    revalidatePath('/')
    redirect('/')
}