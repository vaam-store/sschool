import { type EditModuleProps, type OnEditModuleProps } from "./type";
import { useCallback, useId, useRef } from "react";
import { Plus } from "react-feather";
import { api } from "@app/trpc/react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Field, Form, Formik } from "formik";
import { z } from "zod";
import { type Module } from "@prisma/client";
import { TextareaInputComponent } from "@app/components/inputs/textarea";
import { FileInputComponent } from "@app/components/inputs/file-input";

const Schema = z.object({
  title: z.string(),
  description: z.string(),
  meta: z.object({
    thumbnailImage: z.object({
      url: z.string(),
    }),
  }),
});

export function EditModule({
  onEdit,
  module,
  courseId,
}: EditModuleProps & OnEditModuleProps) {
  const { mutateAsync: create } = api.course.createModule.useMutation();
  const { mutateAsync: update } = api.course.updateModule.useMutation();
  return (
    <Formik
      validationSchema={toFormikValidationSchema(Schema)}
      initialValues={{
        id: module?.id ?? null,
        title: module?.title ?? "",
        description: module?.description ?? "",
        meta: module?.meta ?? { thumbnailImage: {} },
        position: module?.position ?? 0,
      }}
      onSubmit={async ({ id, ...rest }, { setSubmitting, resetForm }) => {
        let saved: Module;
        if (module?.id) {
          saved = await update({
            ...rest,
            id: id!,
            course: { connect: { id: courseId } },
          });
        } else {
          saved = await create({
            ...rest,
            course: { connect: { id: courseId } },
          });
        }
        setSubmitting(false)
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

export function EditModuleModal({
  onEdit,
  ...props
}: EditModuleProps & OnEditModuleProps) {
  const modalId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const onChange = useCallback(
    (module: Module) => {
      if (ref.current) {
        ref.current.close();
      }
      onEdit(module);
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
      <button className="btn btn-primary btn-soft" onClick={show}>
        <span>Add a module</span>
        <Plus />
      </button>
      <dialog
        ref={ref}
        id={modalId}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <EditModule {...props} onEdit={onChange} />

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
