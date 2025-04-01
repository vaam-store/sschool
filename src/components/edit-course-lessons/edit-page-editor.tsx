'use client';

import { Editor } from '@app/components/editor';
import { api } from '@app/trpc/react';
import type { Page } from '@prisma/client';
import { useCallback, useState } from 'react';

interface EditLessonEditorProps {
  page: Page;
}

export function EditPageEditor({ page }: EditLessonEditorProps) {
  const [data, setData] = useState<string | undefined>(page.content);

  const { mutateAsync: updatePageContent } =
    api.page.updatePageContent.useMutation();
  const { mutateAsync: genCourseLesson, isPending: isGenCourseLessonPending } =
    api.courseAi.genCourseLesson.useMutation({});

  const onChange = useCallback(
    async (data: string) => {
      await updatePageContent({
        id: page.id,
        content: data,
      });
    },
    [page.id, updatePageContent],
  );

  const onGenCourseLesson = useCallback(async () => {
    const result = await genCourseLesson({
      course_id: page.courseId,
      page_id: page.id,
    });

    await updatePageContent({
      id: page.id,
      content: result,
    });

    setData(result);
  }, [genCourseLesson, page.id, page.courseId, updatePageContent]);

  return (
    <div>
      <div className='flex items-center justify-end pt-4'>
        <button
          className='btn btn-circle btn-soft btn-primary'
          onClick={onGenCourseLesson}>
          AI
        </button>
      </div>

      {!isGenCourseLessonPending && (
        <Editor initialData={data} onChange={onChange} />
      )}

      {isGenCourseLessonPending && (
        <div className='flex items-center justify-center pb-4'>
          <div className='loading loading-spinner loading-lg' />
        </div>
      )}
    </div>
  );
}
