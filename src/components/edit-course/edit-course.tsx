'use client';

import { CourseCard } from '@app/components/course-card';
import { FileInputComponent } from '@app/components/inputs/file-input';
import { SelectComponent } from '@app/components/inputs/select';
import { TextareaInputComponent } from '@app/components/inputs/textarea';
import { ToggleInputComponent } from '@app/components/inputs/toggle';
import { api } from '@app/trpc/react';
import { CourseStatus } from '@prisma/client';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { type EditCourseProps } from './type';

const Schema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum([CourseStatus.DRAFT, CourseStatus.PUBLISHED]),
  meta: z.object({
    canBookmark: z.boolean(),
    thumbnailImage: z.object({
      url: z.string(),
    }),
  }),
});

export function EditCourse({ course, large = true }: EditCourseProps) {
  const { mutateAsync: create } = api.course.createCourse.useMutation();
  const { mutateAsync: update } = api.course.updateCourse.useMutation();
  const router = useRouter();
  return (
    <>
      <Formik
        validationSchema={toFormikValidationSchema(Schema)}
        initialValues={{
          name: course?.name ?? '',
          description: course?.description ?? '',
          status: course?.status ?? CourseStatus.DRAFT,
          meta: course?.meta ?? { canBookmark: false, thumbnailImage: {} },
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const saved = await (course?.id
            ? update({ ...values, id: course.id })
            : create(values));
          setSubmitting(false);
          router.push(`/courses/${saved.id}/edit`);
        }}>
        {(props) => (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7'>
            <div
              className={twMerge('', [
                large && 'md:col-span-1 xl:col-span-2',
                !large && 'md:col-span-1 xl:col-span-3',
              ])}>
              <Form className='flex flex-col gap-4'>
                <TextareaInputComponent
                  label='Name'
                  name='name'
                  placeholder='Name'
                />
                <TextareaInputComponent
                  label='Description'
                  name='description'
                  placeholder='Description'
                />
                <ToggleInputComponent
                  label='Can bookmark'
                  name='meta.canBookmark'
                />
                {course?.id && (
                  <SelectComponent label='Status' name='status'>
                    <option value={CourseStatus.DRAFT}>
                      {CourseStatus.DRAFT}
                    </option>
                    <option value={CourseStatus.PUBLISHED}>
                      {CourseStatus.PUBLISHED}
                    </option>
                  </SelectComponent>
                )}

                <FileInputComponent
                  label='Thumbnail image'
                  name='meta.thumbnailImage'
                  accept='image/png,image/jpeg'
                />
                <button className='btn btn-soft btn-primary' type='submit'>
                  Submit
                </button>
              </Form>
            </div>

            <div
              className={twMerge('hidden sm:block', [
                large && 'md:col-span-3 xl:col-span-5',
                !large && 'md:col-span-2 xl:col-span-4',
              ])}>
              <div className='mockup-window bg-base-300 border p-4'>
                <div className='flex justify-center'>
                  <div className='max-w-md'>
                    <CourseCard disableLink={true} course={props.values} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
