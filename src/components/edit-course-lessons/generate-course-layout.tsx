'use client';

import { api } from '@app/trpc/react';
import { type Page } from '@prisma/client';
import { useCallback, useId, useRef, useState } from 'react';
import { RefreshCcw } from 'react-feather';
import { SingleCoursePage } from '../single-course/single-course-parent';
import { SingleCourseModuleListSkeleton } from '../skeleton';
import { type GenerateCourseLayoutProps } from './types';

export function GenerateCourseLayoutPage({
  onEdit,
  courseId,
}: GenerateCourseLayoutProps) {
  const [maxLessons, setMaxLessons] = useState(10);
  const [data, setData] = useState<Page[]>([]);
  const { mutateAsync: genCoursePlan, isPending } =
    api.courseAi.genCoursePlan.useMutation({});

  const onGenCoursePlan = useCallback(async () => {
    const result = await genCoursePlan({
      course_id: courseId,
      max_lessons: maxLessons,
    });

    setData(result);
  }, [genCoursePlan, courseId, maxLessons]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='form-control w-full flex join'>
        <label className='input input-bordered w-full join-item'>
          <span className='label-text opacity-50'>Max lessons</span>
          <input
            type='number'
            value={maxLessons}
            onChange={(e) => setMaxLessons(Number(e.target.value))}
          />
        </label>

        <button className='btn btn-primary join-item' onClick={onGenCoursePlan}>
          <RefreshCcw />
        </button>
      </div>

      <div className='divider' />

      <div className='list'>
        {isPending && <SingleCourseModuleListSkeleton />}
        {data?.map((page) => (
          <div key={page.id} className='list-row'>
            <SingleCoursePage page={page} />
          </div>
        ))}
      </div>

      {data && (
        <div>
          <button
            type='button'
            className='btn btn-block btn-primary'
            onClick={() => onEdit(data)}>
            Use
          </button>
        </div>
      )}
    </div>
  );
}

export function GenerateCourseLayoutModal({
  onEdit,
  ...props
}: Omit<GenerateCourseLayoutProps, 'page'>) {
  const modalId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const onChange = useCallback(
    (pages: Page[]) => {
      if (ref.current) {
        ref.current.close();
      }
      onEdit(pages);
    },
    [ref, onEdit],
  );

  const show = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref]);

  return (
    <>
      <button className='btn btn-circle btn-soft btn-primary' onClick={show}>
        AI
      </button>
      <dialog
        ref={ref}
        id={modalId}
        className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <GenerateCourseLayoutPage {...props} onEdit={onChange} />

          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
