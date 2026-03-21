import Link from 'next/link'
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from '@/components/EditButton';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import { Suspense } from 'react';
import SidebarSearchField from '@/components/SidebarSearchField';
import { useTranslation } from '@/app/i18n';

export default async function Sidebar({ lng }: { lng: string }) {
    const { t } = await useTranslation(lng)

    return (
        <>
            <section className="col sidebar">
                <Link href={'/'} className="link--unstyled">
                    <section className="sidebar-header">
                        <img
                            className="logo"
                            src="/logo.svg"
                            width="22px"
                            height="20px"
                            alt=""
                            role="presentation"
                        />
                        <strong>React Notes</strong>
                    </section>
                </Link>

                <section className="sidebar-menu" role="menubar">
                    <SidebarSearchField />
                    <EditButton noteId={null}>{t('new')}</EditButton>
                </section>

                <nav>
                    <Suspense fallback={<NoteListSkeleton />}>
                        <SidebarNoteList />
                    </Suspense>
                </nav>

            </section>

        </>
    )
}