"use client";

import { type Lesson } from "@prisma/client";
import { Editor } from "@app/components/editor";
import { type OutputData } from "@editorjs/editorjs";
import { api } from "@app/trpc/react";
import { useCallback } from "react";

interface EditLessonEditorProps {
  lesson: Lesson;
}

export function EditLessonEditor({ lesson }: EditLessonEditorProps) {
  const { mutateAsync } = api.lesson.updateLessonContent.useMutation();
  const onChange = useCallback(
    async (data: OutputData) => {
      await mutateAsync({
        id: lesson.id,
        content: data,
      });
    },
    [lesson.id, mutateAsync],
  );
  
  return (
    <div>
      <Editor initialData={lesson.content as OutputData} onChange={onChange} />
    </div>
  );
}
