import { twMerge } from "tailwind-merge";

export function PageListItemSkeleton({ large = false }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <div
          className={twMerge("skeleton size-10 shrink-0 rounded-full", [
            large && "size-14 md:size-16",
          ])}
        />
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="skeleton h-48 w-full" />

      <div className="flex flex-col gap-4">
        <div className="skeleton h-8 w-56" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
      </div>
      
      <div className="flex flex-row gap-4">
        <div className="skeleton size-10 rounded-full" />
        <div className="skeleton size-10 rounded-full" />
        <div className="skeleton h-10 w-28" />
      </div>
    </div>
  );
}

export function LecturePageListSkeleton() {
  return (
    <div className="list">
      <div className="list-row">
        <PageListItemSkeleton />
      </div>

      <div className="list-row">
        <PageListItemSkeleton />
      </div>

      <div className="list-row">
        <PageListItemSkeleton />
      </div>

      <div className="list-row">
        <PageListItemSkeleton />
      </div>

      <div className="list-row">
        <PageListItemSkeleton />
      </div>
    </div>
  );
}

export function SingleCourseModuleListSkeleton() {
  return (
    <div className="list">
      <div className="list-row">
        <PageListItemSkeleton large />
      </div>

      <div className="list-row">
        <PageListItemSkeleton large />
      </div>

      <div className="list-row">
        <PageListItemSkeleton large />
      </div>

      <div className="list-row">
        <PageListItemSkeleton large />
      </div>

      <div className="list-row">
        <PageListItemSkeleton large />
      </div>
    </div>
  );
}

export function CourseListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
    </div>
  );
}
