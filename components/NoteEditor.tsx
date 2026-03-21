'use client'

import { useEffect, useState, useActionState } from 'react'
import NotePreview from '@/components/NotePreview'
import { deleteNote, saveNote } from '../app/[lng]/actions'
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'
import { z } from "zod";

export type FormState = {
    message?: string | null;
    errors?: z.core.$ZodIssue[];
};

const initialState: FormState = {
    message: null,
}

export default function NoteEditor({
    noteId,
    initialTitle,
    initialBody
}: {
    noteId: string | null,
    initialTitle: string,
    initialBody: string
}) {

    // 第一个参数：state（上一次的状态，也就是你的 initialState）。
    // 第二个参数：formData（表单提交的数据）。
    const [saveState, saveFormAction] = useActionState(saveNote, initialState)
    const [delState, delFormAction] = useActionState(deleteNote, initialState)

    const [title, setTitle] = useState(initialTitle)
    const [body, setBody] = useState(initialBody)

    const isDraft = !noteId

    useEffect(() => {
        if (saveState.errors) {
            // 处理错误
            console.log(saveState.errors)
            console.log("saveState", saveState);

        }
    }, [saveState])

    return (
        <div className="note-editor">
            <form className="note-editor-form" autoComplete="off">
                <div className="note-editor-menu" role="menubar">
                    <input type="hidden" name="noteId" value={noteId ?? ""} />
                    <SaveButton formAction={saveFormAction} />
                    <DeleteButton isDraft={isDraft} formAction={delFormAction} />
                </div>

                <div className="note-editor-menu">
                    {saveState?.message}
                </div>

                <div className="note-editor-menu">
                    {saveState?.message}
                    {saveState.errors && saveState.errors[0].message}
                </div>

                <label className="offscreen" htmlFor="note-title-input">
                    Enter a title for your note
                </label>

                <input
                    id="note-title-input"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
                <label className="offscreen" htmlFor="note-body-input">
                    Enter the body for your note
                </label>

                <textarea
                    name="body"
                    value={body}
                    id="note-body-input"
                    onChange={(e) => setBody(e.target.value)}
                />
            </form>

            <div className="note-editor-preview">
                <div className="label label--preview" role="status">
                    Preview
                </div>

                <h1 className="note-title">{title}</h1>

                <NotePreview>{body}</NotePreview>

            </div>

        </div>

    )
}
