'use client';

import { FileInputComponent } from '@app/components/inputs/file-input';
import { TextareaInputComponent } from '@app/components/inputs/textarea';
import { api } from '@app/trpc/react';
import { type Page, PageType } from '@prisma/client';
import { Form, Formik } from 'formik';
import { useCallback, useId, useRef } from 'react';
import { Plus } from 'react-feather';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { type EditPageProps } from './types';

const Schema = z.object({
  title: z.string(),
  description: z.string(),
  meta: z
    .object({
      thumbnailImage: z
        .object({
          url: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export function EditPage({
  onEdit,
  page,
  parentPageId,
  nextPosition,
  courseId,
}: EditPageProps) {
  const { mutateAsync: create } = api.page.createPage.useMutation();
  const { mutateAsync: update } = api.page.updatePage.useMutation();
  return (
    <Formik
      validationSchema={toFormikValidationSchema(Schema)}
      initialValues={{
        id: page?.id ?? null,
        title: page?.title ?? '',
        description: page?.description ?? '',
        meta: page?.meta ?? { thumbnailImage: {} },
        position: page?.position ?? nextPosition,
        content: page?.content ?? {},
      }}
      onSubmit={async ({ id, ...rest }, { setSubmitting, resetForm }) => {
        let saved: Page;
        if (page?.id) {
          saved = await update({
            ...rest,
            id: id!,
            parentPage: parentPageId
              ? { connect: { id: parentPageId } }
              : undefined,
            type: PageType.ARTICLE,
            course: { connect: { id: courseId } },
          });
        } else {
          saved = await create({
            ...rest,
            parentPage: parentPageId
              ? { connect: { id: parentPageId } }
              : undefined,
            type: PageType.ARTICLE,
            course: { connect: { id: courseId } },
          });
        }
        setSubmitting(false);
        onEdit(saved);
        resetForm();
      }}>
      <Form className='flex flex-col gap-4'>
        <TextareaInputComponent
          label='Title'
          name='title'
          placeholder='Title'
        />
        <TextareaInputComponent
          label='Description'
          name='description'
          placeholder='Description'
        />

        <FileInputComponent
          label='Thumbnail image'
          name='meta.thumbnailImage'
          accept='image/png,image/jpeg'
        />
        <button className='btn btn-soft btn-primary' type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  );
}

export function AddPageModal({
  onEdit,
  ...props
}: Omit<EditPageProps, 'page'>) {
  const modalId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const onChange = useCallback(
    (page: Page) => {
      if (ref.current) {
        ref.current.close();
      }
      onEdit(page);
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
        <Plus />
      </button>
      <dialog
        ref={ref}
        id={modalId}
        className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <EditPage {...props} onEdit={onChange} />

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
