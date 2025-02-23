import { Container } from '@app/components/container';
import { CourseList } from '@app/components/course-list';
import { CourseListSkeleton } from '@app/components/skeleton';
import { auth } from '@app/server/auth';
import { UserRole } from '@prisma/client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Plus } from 'react-feather';

export const metadata: Metadata = {
  title: 'All Courses',
};

export default async function AllCoursesPage({}) {
  const session = await auth();
  return (
    <Container>
      <div className='mb-4 flex flex-row items-center md:mb-8 md:justify-between'>
        <h1 className='app-title'>All Courses</h1>
        {session && session.user && session.user.role === UserRole.ADMIN && (
          <Link
            className='btn btn-circle btn-soft btn-primary'
            href='/courses/add'>
            <Plus />
          </Link>
        )}
      </div>

      <Suspense fallback={<CourseListSkeleton />}>
        <CourseList />
      </Suspense>
    </Container>
  );
}
