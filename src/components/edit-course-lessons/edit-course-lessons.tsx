"use client";

import { type EditCourseLessonsProps } from "./types";
import { Container } from "@app/components/container";
import { api } from "@app/trpc/react";
import { useCallback, useId } from "react";
import { type Module } from "@prisma/client";
import { ArrowRight, Grid, RefreshCw } from "react-feather";
import { ReactSortable, type Sortable, type Store } from "react-sortablejs";
import { EditLessonModal } from "@app/components/edit-course-lessons/edit-lesson";
import Image from "next/image";
import Link from "next/link";

interface EditModuleLessonProps {
  module: Module;
}

export function EditModuleLesson({ module }: EditModuleLessonProps) {
  const id = useId();
  const { data = [], refetch } = api.lesson.latestLessons.useQuery({
    page: 0,
    size: 10_000,
    moduleId: module.id,
  });
  const { mutateAsync: updatePosition } =
    api.lesson.updatePosition.useMutation();

  const onChange = useCallback(
    async (
      newState: typeof data,
      _sortable: Sortable | null,
      _store: Store,
    ) => {
      await updatePosition(
        newState.map((lesson, position) => ({
          id: lesson.id,
          position,
        })),
      );

      await refetch();
    },
    [refetch, updatePosition],
  );

  return (
    <div id={id}>
      <h3 className="text-2xl tracking-wide">{module.title}</h3>

      <ul className="list">
        <ReactSortable
          fallbackOnBody={true}
          swapThreshold={0.65}
          animation={150}
          list={data}
          setList={onChange}
          handle=".d-handle"
        >
          {data.map((lesson) => (
            <li key={lesson.id} className="list-row items-center">
              <div>
                <Grid className="d-handle hover:cursor-pointer" />
              </div>

              <div>
                <div className="list-title">{lesson.title}</div>
                <div className="list-subtitle">{lesson.description}</div>
              </div>

              <div className="flex flex-row items-center gap-4">
                <Link
                  href={`/courses/${module.courseId}/edit/modules/${lesson.moduleId}/lessons/${lesson.id}`}
                >
                  <ArrowRight />
                </Link>

                <div className="relative size-10">
                  <Image
                    fill
                    className="rounded-box object-cover"
                    src={lesson.meta.thumbnailImage.url}
                    alt={lesson.meta.thumbnailImage.alt}
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 5vw"
                  />
                </div>
              </div>
            </li>
          ))}
        </ReactSortable>

        <li className="list-row">
          <EditLessonModal
            moduleId={module.id}
            nextPosition={data.length}
            onEdit={(_lesson) => refetch()}
          />
        </li>
      </ul>
    </div>
  );
}

export function EditCourseLessons({ course }: EditCourseLessonsProps) {
  const { data: modules, refetch } = api.module.latestModules.useQuery({
    page: 0,
    size: 10_000,
    courseId: course.id,
  });
  return (
    <Container>
      <div className="mb-4 flex flex-row items-center gap-4">
        <h2 className="app-title">Edit lessons</h2>
        <button
          onClick={() => refetch()}
          className="btn btn-soft btn-primary btn-circle"
        >
          <RefreshCw />
        </button>
      </div>

      {(modules ?? []).map((module) => (
        <EditModuleLesson module={module} key={module.id} />
      ))}
    </Container>
  );
}
