"use client";

import EditorJS, { type OutputData } from "@editorjs/editorjs";
import { makeTools } from "./tools";
import { useEffect, useId, useMemo, useRef } from "react";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
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
  const id = useId();
  const ref = useRef<HTMLDivElement>();
  const editorRef = useRef<EditorJS>();
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
    if (!editorRef.current && ref.current) {
      const editor = new EditorJS({
        readOnly: readOnly,
        tools: tools,
        holder: ref.current,
        onReady: () => {
          editorRef.current = editor;
          if (!readOnly) {
            const undo = new Undo({ editor });
            new DragDrop(editor);

            undo.initialize(initialData);
          }
        },
        autofocus: true,
        data: initialData,
        onChange: async () => {
          if (editor.saver && onChange && !readOnly) {
            const content = await editor.saver.save();
            onChange(content);
          }
        },
      });
    }

    return () => {
      if (editorRef?.current) {
        editorRef.current.destroy();
        editorRef.current = undefined;
      }
    };
  }, [id, initialData, onChange, readOnly, tools]);

  return (
    <article className="prose prose-neutral lg:prose-xl mx-auto" ref={ref as any} id={id} />
  );
}
