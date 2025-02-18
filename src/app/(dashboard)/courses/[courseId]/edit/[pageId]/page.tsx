import { getPage, type HasCourse, type HasPage } from "@app/hooks/courses";
import { EditPageEditor } from "@app/components/edit-course-lessons";

type ParamsProps = HasCourse & HasPage;

export default async function EditLessonPage({
  params,
}: {
  params: Promise<ParamsProps>;
}) {
  const { pageId } = await params;
  const page = await getPage(pageId);

  return (
    <div className="bg-base-100">
      <EditPageEditor page={page} />
    </div>
  );
}
