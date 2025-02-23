'use client';

import { api } from '@app/trpc/react';
import { DownloadCloud, UploadCloud } from 'react-feather';

interface UploadCourseProps {
  courseId: string;
}

export function UploadCourse({ courseId }: UploadCourseProps) {
  const { mutateAsync: getCompleteCourse } =
    api.course.getCourseForDownload.useMutation();

  const handleDownload = async () => {
    const completeCourse = await getCompleteCourse({ id: courseId });
    const i = document.createElement('a');
    i.href = `data:application/json,${encodeURIComponent(JSON.stringify(completeCourse))}`;
    i.download = `${completeCourse?.name}.json`;
    i.click();
  };

  const uploadCourse = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    throw new Error('Not implemented');
  };

  return (
    <>
      <button
        onClick={uploadCourse}
        className='btn btn-soft btn-primary btn-circle'>
        <UploadCloud />
      </button>
      <button
        onClick={handleDownload}
        className='btn btn-soft btn-primary btn-circle'>
        <DownloadCloud />
      </button>
    </>
  );
}
