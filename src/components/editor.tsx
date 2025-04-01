'use client';

import MarkdownEditor from '@uiw/react-markdown-editor';
import * as _ from 'lodash';
import { useCallback } from 'react';
export interface EditorProps {
  initialData?: string;
  onChange?: (data: string) => void;
  readOnly?: boolean;
}

export function Editor({ initialData, onChange }: EditorProps) {
  const onChangeDebounced = useCallback(
    _.debounce((value: string) => onChange?.(value), 1000),
    [onChange],
  );

  return (
    <MarkdownEditor
      value={initialData}
      onChange={(value, _viewUpdate) => {
        onChangeDebounced(value);
      }}
    />
  );
}
