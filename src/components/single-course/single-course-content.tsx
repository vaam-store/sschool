import { type Course } from "@prisma/client";
import { ArrowRight } from "react-feather";
import { SingleCourseModuleList } from "./single-course-module";
import Link from "next/link";
import { Container } from "@app/components/container";

interface SingleCourseContentProps {
  data: Course;
}

export function SingleCourseContent({
  data: { name, description, id },
}: SingleCourseContentProps) {
  return (
    <>
      <Container className="flex flex-col gap-4 md:max-w-3xl">
        <h1 className="big-title">
          <span>{name}</span>
        </h1>

        <p>{description}</p>

        <div className="py-4">
          <Link href={`/lectures/${id}`}>
            <button className="btn btn-primary">
              <span>Start learning</span>
              <ArrowRight />
            </button>
          </Link>
        </div>

        <div>
          <SingleCourseModuleList courseId={id} />
        </div>
      </Container>
    </>
  );
}
