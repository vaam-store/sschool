import { type Module } from "@prisma/client";
import Image from "next/image";

export interface SingleCourseModuleProps {
  module: Module;
}

export function SingleCourseModule({ module }: SingleCourseModuleProps) {
  return (
    <div className="card card-side">
      <figure className="relative w-24">
        <Image
          fill
          objectFit="cover"
          className="rounded-box size-16 grayscale"
          src={module.meta.thumbnailImage.url}
          alt={module.meta.thumbnailImage.alt}
        />
      </figure>
      <div className="card-body">
        <div className="card-title">{module.title}</div>
        <p>{module.description}</p>
      </div>
    </div>
  );
}
