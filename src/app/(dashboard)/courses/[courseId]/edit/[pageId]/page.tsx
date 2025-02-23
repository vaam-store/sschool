import { EditPageEditor } from '@app/components/edit-course-lessons';
import { getPage, type HasCourse, type HasPage } from '@app/hooks/courses';

type ParamsProps = HasCourse & HasPage;

export default async function EditLessonPage({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { pageId } = await params;
  const page = await getPage(pageId);

  return (
    <div className='bg-base-100 px-4 rounded-xl'>
      <EditPageEditor page={page} />
    </div>
  );
}
