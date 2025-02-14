import EditorJS, { LogLevels, type OutputData } from "@editorjs/editorjs";
import { makeTools } from "./tools";
import { useEffect, useId, useMemo, useRef } from "react";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import { useUploadFile } from "@app/hooks/upload-file";

export interface EditorProps {
  initialData?: OutputData;
  onChange?: (data: OutputData) => void;
  logLevel: LogLevels;
}

export function Editor({
  logLevel = LogLevels.ERROR,
  initialData,
  onChange,
}: EditorProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>();
  const editorRef = useRef<EditorJS>();
  const { mutate } = useUploadFile();
  const tools = useMemo(
    () =>
      makeTools({
        uploadFile: (file) => mutate(file),
        uploadFileByUrl: (fileUrl) => null,
      }),
    [mutate],
  );

  useEffect(() => {
    if (!editorRef.current && ref.current) {
      const editor = new EditorJS({
        tools: tools,
        holder: ref.current,
        logLevel: logLevel,
        onReady: () => {
          editorRef.current = editor;
          const undo = new Undo({ editor });
          new DragDrop(editor);

          undo.initialize(initialData);
        },
        autofocus: true,
        data: initialData,
        onChange: async () => {
          const content = await editor.saver.save();
          onChange?.(content);
        },
      });
    }

    return () => {
      editorRef?.current?.destroy();
      editorRef?.current = undefined;
    };
  }, [data, id, onChange]);

  return <div ref={ref as any} id={id} />;
}
