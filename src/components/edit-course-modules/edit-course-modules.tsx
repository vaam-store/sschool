"use client";

import { Container } from "@app/components/container";
import { type EditCourseModulesProps } from "./type";
import { forwardRef, useState } from "react";
import type { Module } from "@prisma/client";
import { ReactSortable } from "react-sortablejs";
import { EditModuleModal } from "@app/components/edit-course-modules/edit-module";
import Image from "next/image";
import { Grid } from "react-feather";
import { SingleCourseModule } from "@app/components/single-course/single-course-module";

const CustomComponent = forwardRef<HTMLUListElement, any>((props, ref) => {
  return (
    <ul className="list" ref={ref}>
      {props.children}
    </ul>
  );
});

export function EditCourseModules({ course, modules }: EditCourseModulesProps) {
  const [state, setState] = useState<Module[]>(() => modules);

  return (
    <Container>
      <h2 className="app-title">Edit modules</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        <div>
          <ReactSortable
            fallbackOnBody={true}
            swapThreshold={0.65}
            onChange={console.log}
            animation={150}
            tag={CustomComponent}
            list={state}
            setList={setState}
            handle=".d-handle"
          >
            {state.map((item) => (
              <li className="list-row items-center" key={item.id}>
                <div className="flex flex-row items-center gap-4">
                  <Grid className="d-handle text-primary hover:cursor-pointer" />
                  <div className="relative size-10">
                    <Image
                      fill
                      objectFit="cover"
                      className="rounded-box size-16"
                      src={item.meta.thumbnailImage.url}
                      alt={item.meta.thumbnailImage.alt}
                    />
                  </div>
                </div>

                <div>
                  <div>{item.title}</div>
                  <div className="text-xs opacity-60">{item.description}</div>
                </div>
              </li>
            ))}
          </ReactSortable>

          <EditModuleModal
            courseId={course.id}
            onEdit={(module) => {
              setState((prev) => [...prev, module]);
            }}
          />
        </div>

        <div className="col-span-2 hidden sm:block xl:col-span-4">
          <div className="mockup-window bg-base-200 border p-4">
            <div className="flex justify-center">
              <div className="flex flex-col gap-4 md:gap-6">
                {state.map((module) => (
                  <SingleCourseModule key={module.id} module={module} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
