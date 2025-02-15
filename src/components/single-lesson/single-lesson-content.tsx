import { Container } from "@app/components/container";
import { type Lesson } from "@prisma/client";

export interface SingleLessonContentProps {
  data: Lesson;
}

export default function SingleLessonContent({
  data: { title, description, id },
}: SingleLessonContentProps) {
  return (
    <Container>
      <p>Found {id}!</p>
    </Container>
  );
}
