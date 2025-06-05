'use client';

import { markdownToHtml } from '@app/server/md/converter';
import MarkdownEditor from '@uiw/react-markdown-editor';
import * as _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export interface EditorProps {
  initialData?: string;
  onChange?: (data: string) => void;
}

export function Editor({ initialData, onChange }: EditorProps) {
  const [data, setData] = useState<EditorProps['initialData']>();

  const onChangeDebounced = useCallback(
    _.debounce((value: string) => onChange?.(value), 1000),
    [onChange],
  );

  const calculateHtml = useCallback(
    async (data: EditorProps['initialData']) => {
      if (!data) return;
      const html = await markdownToHtml(data);
      setData(html);
    },
    [],
  );

  useEffect(() => {
    calculateHtml(initialData).catch(console.error);
  }, [initialData]);

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-1'>
        <MarkdownEditor
          value={initialData}
          onChange={async (value, _viewUpdate) => {
            onChangeDebounced(value);
            await calculateHtml(value);
          }}
        />
      </div>
      <div className='col-span-2'>
        {data && (
          <article
            className='prose prose-neutral lg:prose-xl mx-auto'
            dangerouslySetInnerHTML={{ __html: data }}
          />
        )}
      </div>
    </div>
  );
}
