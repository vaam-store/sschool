import Image from "next/image";
import { useMemo } from "react";
import type { Page } from "@prisma/client";
import { twMerge } from "tailwind-merge";

interface PageListItemProps {
  page: Page;
  isChild?: boolean;
}

export function PageListItem({ page, isChild }: PageListItemProps) {
  const meta = useMemo(
    () =>
      page.meta as {
        thumbnailImage: { url: string; alt: string };
      },
    [page.meta],
  );
  return (
    <div className="flex flex-row items-center gap-4">
      <div>
        <figure className="relative overflow-clip hidden size-10 lg:block">
          <Image
            fill
            className="rounded-box object-cover"
            src={meta.thumbnailImage.url}
            alt={meta.thumbnailImage.alt}
            sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 5vw"
          />
        </figure>
      </div>
      
      <div>
        <h3
          className={twMerge("line-clamp-2 tracking-wide", [
            isChild && "",
            !isChild && "font-thin md:text-2xl",
          ])}
        >
          {page.title}
        </h3>
        <p className="line-clamp-1 opacity-50">
          {page.description}
        </p>
      </div>
    </div>
  );
}
