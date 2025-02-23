"use client";

import EditorJS, { type OutputData } from "@editorjs/editorjs";
import { makeTools } from "./tools";
import { useEffect, useMemo, useRef } from "react";
import { useUploadFile } from "@app/hooks/upload-file";

export interface EditorProps {
  initialData?: OutputData;
  onChange?: (data: OutputData) => void;
  readOnly?: boolean;
}

export function Editor({
  initialData,
  onChange,
  readOnly = false,
}: EditorProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isReady = useRef(false);
  const { mutate } = useUploadFile();
  const tools = useMemo(
    () =>
      makeTools({
        uploadFile: async (file) => {
          if (!readOnly) {
            const { publicUrl } = await mutate(file);
            return { publicUrl };
          }
          return undefined;
        },
        uploadFileByUrl: async (_fileUrl) => undefined,
      }),
    [mutate, readOnly],
  );

  useEffect(() => {
    if (isReady.current) {
      return;
    }

    if (!ref.current) {
      return;
    }

    if (!tools) {
      return;
    }

    const editor = new EditorJS({
      readOnly: readOnly,
      tools: tools,
      holder: ref.current,
      autofocus: true,
      data: initialData,
      onChange: () => {
        if (editor.saver && onChange && !readOnly) {
          editor.saver.save().then(onChange).catch(console.error);
        }
      },
    });

    // Save to ref if you need to access it elsewhere
    isReady.current = true;

    // Cleanup: destroy the editor instance created in THIS effect
    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
      }
    };
  }, [initialData, onChange, readOnly, tools]);

  return (
    <article className="prose prose-neutral lg:prose-xl mx-auto" ref={ref} />
  );
}
