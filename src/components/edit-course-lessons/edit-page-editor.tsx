'use client';

import { Editor } from '@app/components/editor';
import { api } from '@app/trpc/react';
import { type OutputData } from '@editorjs/editorjs';
import type { Page } from '@prisma/client';
import EditorJSMarkdownConverter from '@vingeray/editorjs-markdown-converter';
import { useCallback, useState } from 'react';

interface EditLessonEditorProps {
  page: Page;
}

export function EditPageEditor({ page }: EditLessonEditorProps) {
  const [data, setData] = useState<OutputData | undefined>(
    page.content as unknown as OutputData,
  );

  const { mutateAsync: updatePageContent } =
    api.page.updatePageContent.useMutation({
      onSuccess: (data) => {
        setData(data.content as unknown as OutputData);
      },
    });
  const { mutateAsync: genCourseLesson, isPending: isGenCourseLessonPending } =
    api.courseAi.genCourseLesson.useMutation({});

  const onChange = useCallback(
    async (data: OutputData) => {
      await updatePageContent({
        id: page.id,
        content: data as unknown as Record<string, unknown>,
      });
    },
    [page.id, updatePageContent],
  );

  const onGenCourseLesson = useCallback(async () => {
    const result = await genCourseLesson({
      course_id: page.courseId,
      page_id: page.id,
    });

    const converted = EditorJSMarkdownConverter.toBlocks(result);

    await updatePageContent({
      id: page.id,
      content: {
        blocks: converted,
      },
    });
  }, [genCourseLesson, page.id, page.courseId]);

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
