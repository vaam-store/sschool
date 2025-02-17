"use client";

import { Container } from "@app/components/container";
import { type EditCourseModulesProps } from "./type";
import { useCallback } from "react";
import { ReactSortable, type Sortable, type Store } from "react-sortablejs";
import { EditModuleModal } from "./edit-module";
import Image from "next/image";
import { Grid, MoreVertical } from "react-feather";
import { SingleCourseModule } from "@app/components/single-course/single-course-module";
import { api } from "@app/trpc/react";

export function EditCourseModules({ course }: EditCourseModulesProps) {
  const { data = [], refetch } = api.module.latestModules.useQuery({
    page: 0,
    size: 10_000,
    courseId: course.id,
  });
  const { mutateAsync: updatePosition } =
    api.module.updatePosition.useMutation();

  const onChange = useCallback(
    async (
      newState: typeof data,
      _sortable: Sortable | null,
      _store: Store,
    ) => {
      await updatePosition(
        newState.map((module, position) => ({
          id: module.id,
          position,
        })),
      );
      await refetch();
    },
    [refetch, updatePosition],
  );

  return (
    <Container>
      <h2 className="app-title">Edit modules</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <ul className="list">
            <ReactSortable
              fallbackOnBody={true}
              swapThreshold={0.65}
              animation={150}
              list={data}
              setList={onChange}
              handle=".d-handle"
            >
              {data.map((item) => {
                const meta = item.meta as {
                  thumbnailImage: { url: string; alt: string };
                };
                return (
                  <li className="list-row items-center" key={item.id}>
                    <div className="flex flex-row items-center gap-4">
                      <Grid className="d-handle hover:cursor-pointer" />
                      <div className="relative size-10">
                        <Image
                          fill
                          className="rounded-box object-cover"
                          src={meta.thumbnailImage.url}
                          alt={meta.thumbnailImage.alt}
                          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 5vw"
                        />
                      </div>
                    </div>

                    <div>
                      <div>{item.title}</div>
                      <div className="text-xs opacity-60">
                        {item.description}
                      </div>
                    </div>

                    <div>
                      <button className="btn btn-soft btn-ghost btn-circle">
                        <MoreVertical />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ReactSortable>

            <li>
              <EditModuleModal
                courseId={course.id}
                onEdit={(_module) => refetch()}
                nextPosition={data.length}
              />
            </li>
          </ul>
        </div>

        <div className="hidden sm:block md:col-span-2 xl:col-span-3">
          <div className="mockup-window bg-base-200 border p-4">
            <div className="flex justify-center">
              <div className="list">
                {data.map((module) => (
                  <div key={module.id} className="list-row">
                    <SingleCourseModule module={module} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
