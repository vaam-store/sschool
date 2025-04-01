'use client';

import MarkdownEditor from '@uiw/react-markdown-editor';

export interface EditorProps {
  initialData?: string;
  onChange?: (data: string) => void;
  readOnly?: boolean;
}

export function Editor({ initialData, onChange }: EditorProps) {
  return (
    <MarkdownEditor
      value={initialData}
      onChange={(value, _viewUpdate) => {
        onChange?.(value);
      }}
    />
  );
}
