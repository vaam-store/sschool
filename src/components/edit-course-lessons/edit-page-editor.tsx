"use client";

import type { Page } from "@prisma/client";
import { Editor } from "@app/components/editor";
import { type OutputData } from "@editorjs/editorjs";
import { api } from "@app/trpc/react";
import { useCallback } from "react";

interface EditLessonEditorProps {
  page: Page;
}

export function EditPageEditor({ page }: EditLessonEditorProps) {
  const { mutateAsync } = api.page.updatePageContent.useMutation();
  const onChange = useCallback(
    async (data: OutputData) => {
      await mutateAsync({
        id: page.id,
        content: data as unknown as Record<string, unknown>,
      });
    },
    [page.id, mutateAsync],
  );

  return (
    <div>
      <Editor
        initialData={page.content as unknown as OutputData}
        onChange={onChange}
      />
    </div>
  );
}
