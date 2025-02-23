'use client';

import { PageListItem } from '@app/components/page-list-item';
import { PageListItemSkeleton } from '@app/components/skeleton';
import { api } from '@app/trpc/react';
import Link from 'next/link';
import { Fragment, Suspense } from 'react';

export interface LecturePageListProps {
  courseId: string;
  parentId?: string | null;
  parentSuffix?: string;
}

export function LecturePageList({
  courseId,
  parentId = null,
  parentSuffix: prevParentSuffix = '',
}: LecturePageListProps) {
  const [pages] = api.page.latestPages.useSuspenseQuery({
    courseId,
    page: 0,
    size: 10_000,
    parentId: parentId,
  });

  if (pages.length === 0) {
    return null;
  }

  const parentSuffix = parentId ? `/${parentId}` : '';

  return (
    <>
      {pages.map((page) => (
        <Fragment key={page.id}>
          <Link
            className='hover:cursor-pointer'
            href={`/lectures/${courseId}${prevParentSuffix}${parentSuffix}/${page.id}`}>
            <div className='list-row'>
              <PageListItem isChild={!!parentId} page={page} />
            </div>
          </Link>

          <div className='list pl-8'>
            <Suspense
              fallback={
                <div className='list-row'>
                  <PageListItemSkeleton />
                </div>
              }>
              <LecturePageList
                key={page.id}
                parentId={page.id}
                courseId={courseId}
                parentSuffix={parentSuffix}
              />
            </Suspense>
          </div>
        </Fragment>
      ))}
    </>
  );
}
