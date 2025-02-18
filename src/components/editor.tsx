"use client";

import EditorJS, { type OutputData } from "@editorjs/editorjs";
import { makeTools } from "./tools";
import { useEffect, useId, useMemo, useRef } from "react";
import { useUploadFile } from "@app/hooks/upload-file";

export interface EditorProps {
  initialData?: OutputData;
  onChange?: (data: OutputData) => void;
  readOnly?: boolean;
}

// TODO Creating duplicates
export function Editor({
  initialData,
  onChange,
  readOnly = false,
}: EditorProps) {
  const id = useId();
  const editorRef = useRef<EditorJS | null>(null);
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
    console.log("==>> Creating editor");
    if (editorRef.current) {
      console.error("==>> Editor already exists, skipping creation");
      return;
    }
    
    const editor = new EditorJS({
      readOnly: readOnly,
      tools: tools,
      holder: id,
      autofocus: true,
      data: initialData,
      onChange: () => {
        if (editor.saver && onChange && !readOnly) {
          editor.saver.save().then(onChange).catch(console.error);
        }
      },
    });

    // Save to ref if you need to access it elsewhere
    editorRef.current = editor;

    // Cleanup: destroy the editor instance created in THIS effect
    return () => {
      if (editor && typeof editor.destroy === "function") {
        console.log("==>> Destroying editor");
        editor.destroy();
      }
      editorRef.current = null;
    };
  }, []);

  return (
    <article className="prose prose-neutral lg:prose-xl mx-auto" id={id} />
  );
}
