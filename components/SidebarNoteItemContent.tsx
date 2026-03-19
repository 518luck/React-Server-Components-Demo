'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation'

export default function SidebarNoteContent({
    id,
    title,
    children,
    expandedChildren,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
    expandedChildren: React.ReactNode;
}) {
    const router = useRouter()
    const pathname = usePathname()
    const selectedId = pathname?.split('/')[1] || null
    const isActive = id === selectedId

    const [isPending] = useTransition()
    const [isExpanded, setIsExpanded] = useState(false)

    // Animate after title is edited.
    const itemRef = useRef<HTMLDivElement>(null);
    const prevTitleRef = useRef<string | null>(null);

    useEffect(() => {
        if (title !== prevTitleRef.current && prevTitleRef.current !== null) {
            prevTitleRef.current = title;
            itemRef?.current?.classList?.add('flash');
        }
    }, [title]);

    return (
        <div
            ref={itemRef}
            onAnimationEnd={() => {
                itemRef?.current?.classList?.remove('flash');
            }}
            className={[
                'sidebar-note-list-item',
                isExpanded ? 'note-expanded' : '',
            ].join(' ')}>
            {children}
            <button
                className="sidebar-note-open"
                style={{
                    backgroundColor: isPending
                        ? 'var(--gray-80)'
                        : isActive
                            ? 'var(--tertiary-blue)'
                            : '',
                    border: isActive
                        ? '1px solid var(--primary-border)'
                        : '1px solid transparent',
                }}
                onClick={() => {
                    const sidebarToggle = document.getElementById('sidebar-toggle')
                    console.log("sidebarToggle", sidebarToggle);

                    if (sidebarToggle && sidebarToggle instanceof HTMLInputElement) {
                        sidebarToggle.checked = true
                    }
                    router.push(`/note/${id}`)
                }}>
                Open note for preview
            </button>

            <button
                className="sidebar-note-toggle-expand"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}>
                {isExpanded ? (
                    <div style={{ cursor: 'pointer' }}>
                        <img
                            src="/chevron-down.svg"
                            width="10px"
                            height="10px"
                            alt="Collapse"
                        /></div>
                ) : (
                    <div style={{ cursor: 'pointer' }}>
                        <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
                    </div>
                )}
            </button>
            {isExpanded && expandedChildren}
        </div>

    );
}