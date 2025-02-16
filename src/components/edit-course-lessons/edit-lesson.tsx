"use client";

import { useCallback, useId, useRef } from "react";
import { Plus } from "react-feather";
import { api } from "@app/trpc/react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Field, Form, Formik } from "formik";
import { z } from "zod";
import { type Lesson } from "@prisma/client";
import { TextareaInputComponent } from "@app/components/inputs/textarea";
import { FileInputComponent } from "@app/components/inputs/file-input";
import { type EditLessonProps } from "./types";

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

export function EditLesson({
  onEdit,
  lesson,
  moduleId,
  nextPosition,
}: EditLessonProps) {
  const { mutateAsync: create } = api.lesson.createLesson.useMutation();
  const { mutateAsync: update } = api.lesson.updateLesson.useMutation();
  return (
    <Formik
      validationSchema={toFormikValidationSchema(Schema)}
      initialValues={{
        id: lesson?.id ?? null,
        title: lesson?.title ?? "",
        description: lesson?.description ?? "",
        meta: lesson?.meta ?? { thumbnailImage: {} },
        position: lesson?.position ?? nextPosition,
        content: lesson?.content ?? {},
      }}
      onSubmit={async ({ id, ...rest }, { setSubmitting, resetForm }) => {
        let saved: Lesson;
        if (lesson?.id) {
          saved = await update({
            ...rest,
            id: id!,
            module: { connect: { id: moduleId } },
          });
        } else {
          saved = await create({
            ...rest,
            module: { connect: { id: moduleId } },
          });
        }
        setSubmitting(false);
        onEdit(saved);
        resetForm();
      }}
    >
      <Form className="flex flex-col gap-4">
        <Field
          label="Title"
          name="title"
          component={TextareaInputComponent}
          placeholder="Title"
        />
        <Field
          label="Description"
          name="description"
          component={TextareaInputComponent}
          placeholder="Description"
        />

        <FileInputComponent
          label="Thumbnail image"
          name="meta.thumbnailImage"
          accept="image/png,image/jpeg"
        />
        <button className="btn btn-soft btn-primary" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
}

export function EditLessonModal({
  onEdit,
  ...props
}: Omit<EditLessonProps, "lesson">) {
  const modalId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const onChange = useCallback(
    (lesson: Lesson) => {
      if (ref.current) {
        ref.current.close();
      }
      onEdit(lesson);
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
      <button className="btn btn-circle btn-soft btn-ghost" onClick={show}>
        <Plus />
      </button>
      <dialog
        ref={ref}
        id={modalId}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <EditLesson {...props} onEdit={onChange} />

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
