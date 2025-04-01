import { useUploadFile } from '@app/hooks/upload-file';
import { useField } from 'formik';
import React, { useCallback, useId } from 'react';

import Image from 'next/image';
import { Upload, X } from 'react-feather';
import { useImperativeFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileSizeValidator,
} from 'use-file-picker/validators';

interface FilePicked {
  url: string;
  name: string;
}

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
  const id = useId();
  const [field, { touched, error, value }, { setValue }] = useField<
    FilePicked[] | FilePicked | undefined
  >(props);
  const {
    mutate,
    link: { isPending },
  } = useUploadFile();

  const { openFilePicker, errors, loading, removeFileByIndex } =
    useImperativeFilePicker({
      readAs: 'DataURL',
      accept: props.accept,
      multiple: props.multiple,
      validators: [
        new FileAmountLimitValidator({ max: Number(props.max ?? 10) }),
        new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
      ],
      onFilesSuccessfullySelected: async ({ plainFiles }) => {
        const files = plainFiles.map((file) =>
          mutate(file).then(
            ({ publicUrl }) =>
              ({ url: publicUrl, name: file.name }) as FilePicked,
          ),
        );

        const uploadedFiles = await Promise.all(files);
        if (props.multiple) {
          await setValue(uploadedFiles);
        } else {
          await setValue(uploadedFiles?.[0]);
        }
      },
    });

  const removeOne = useCallback(
    async (idx: number) => {
      if (props.multiple) {
        removeFileByIndex(idx);
        await setValue(
          (value as FilePicked[])?.filter((_, index) => index !== idx),
        );
      } else {
        await setValue(undefined);
      }
    },
    [removeFileByIndex, setValue, value, props.multiple],
  );

  const showLoading = loading || isPending;

  return (
    <label className='form-control w-full'>
      <label htmlFor={id} className='label'>
        <span className='label-text opacity-60 tracking-tight text-base-content'>
          {label ?? field.name}
        </span>
      </label>

      <div className='pt-2'>
        <button
          type='button'
          className='btn btn-primary btn-soft'
          id={id}
          onClick={() => openFilePicker()}>
          <span>Select files</span>
          <Upload />
        </button>

        <div className='list'>
          {(props.multiple
            ? ((value as FilePicked[]) ?? [])
            : [value as FilePicked]
          )
            .filter((file) => Boolean(file.url))
            .map((file, index) => (
              <div
                className='list-row flex flex-row items-center gap-4'
                key={index}>
                <div className='text-primary'>
                  <div className='avatar'>
                    <div className='w-12 rounded-full relative'>
                      <Image
                        fill
                        className='object-contain'
                        src={file.url}
                        alt={file.name}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className='line-clamp-2 tracking-wide'>{file.name}</h2>
                  <p className='line-clamp-1 opacity-50'>{file.url}</p>
                </div>

                <button
                  type='button'
                  className='btn btn-soft btn-error btn-circle ml-auto'
                  onClick={() => removeOne(index)}>
                  <X />
                </button>
              </div>
            ))}

          {errors.map(({ name }) => (
            <div key={name} className='list-row'>
              <span className='text-error'>{name}</span>
            </div>
          ))}

          {showLoading && <span className='loading loading-lg' />}
        </div>
      </div>

      {touched && error && (
        <div className='label'>
          <span className='label-text-alt text-error'>{error}</span>
        </div>
      )}
    </label>
  );
}
