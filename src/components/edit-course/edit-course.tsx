"use client";

import { type EditCourseProps } from "./type";
import { Field, Form, Formik } from "formik";
import { Container } from "@app/components/container";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { LessonCard } from "@app/components/lesson-card";
import { ToggleInputComponent } from "@app/components/inputs/toggle";
import { TextareaInputComponent } from "@app/components/inputs/textarea";
import { FileInputComponent } from "@app/components/inputs/file-input";
import { CourseStatus } from "@prisma/client";
import { SelectComponent } from "@app/components/inputs/select";
import { api } from "@app/trpc/react";
import { useRouter } from "next/navigation";

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

export function EditCourse({ course }: EditCourseProps) {
  const { mutateAsync: create } = api.course.createCourse.useMutation();
  const { mutateAsync: update } = api.course.updateCourse.useMutation();
  const router = useRouter();
  return (
    <Container>
      <Formik
        validationSchema={toFormikValidationSchema(Schema)}
        initialValues={{
          id: course?.id ?? null,
          name: course?.name ?? "",
          description: course?.description ?? "",
          status: course?.status ?? CourseStatus.DRAFT,
          meta: course?.meta ?? { canBookmark: false, thumbnailImage: {} },
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const saved = await (course?.id ? update(values) : create(values));
          setSubmitting(false);
          router.push(`/courses/${saved.id}/edit`);
        }}
      >
        {(props) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <div>
              <Form className="flex flex-col gap-4">
                <Field
                  label="Name"
                  name="name"
                  component={TextareaInputComponent}
                  placeholder="Name"
                />
                <Field
                  label="Description"
                  name="description"
                  component={TextareaInputComponent}
                  placeholder="Description"
                />
                <Field
                  label="Can bookmark"
                  name="meta.canBookmark"
                  component={ToggleInputComponent}
                />
                {course?.id && (
                  <Field
                    label="Status"
                    name="status"
                    component={SelectComponent}
                  >
                    <option value={CourseStatus.DRAFT}>
                      {CourseStatus.DRAFT}
                    </option>
                    <option value={CourseStatus.PUBLISHED}>
                      {CourseStatus.PUBLISHED}
                    </option>
                  </Field>
                )}

                <FileInputComponent
                  label="Thumbnail image"
                  name="meta.thumbnailImage"
                  accept="image/png,image/jpeg"
                />
                <button className="btn btn-soft btn-primary" type="submit">
                  Submit
                </button>
              </Form>
            </div>

            <div className="hidden sm:block md:col-span-2 xl:col-span-4">
              <div className="mockup-window border bg-base-300 p-4">
                <div className="flex justify-center">
                  <div className="max-w-md">
                    <LessonCard disableLink={true} course={props.values} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </Container>
  );
}
