import { useUploadFile } from '@app/hooks/upload-file';
import { useField } from 'formik';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function FileInputComponent({
  label,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  name: string;
}) {
  const [field, meta, { setValue }] = useField(props);
  const { mutate } = useUploadFile();
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files?.length) {
      return;
    }

    const file = files.item(0)!;
    const { publicUrl } = await mutate(file);
    await setValue({ url: publicUrl, alt: file.name });
  };
  return (
    <label className='form-control w-full'>
      <div className='label'>
        <span className='label-text'>{label ?? field.name}</span>
      </div>
      <input
        type='file'
        onChange={onChange}
        {...props}
        className={twMerge(
          'file-input file-input-bordered w-full',
          props.className,
        )}
      />

      {meta.touched && meta.error && (
        <div className='label'>
          <span className='label-text-alt text-error'>{meta.error}</span>
        </div>
      )}
    </label>
  );
}
