import { type HTMLProps, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Container({
  className,
  ...props
}: PropsWithChildren<HTMLProps<any>>) {
  return (
    <div className={twMerge('container mx-auto p-4', className)} {...props} />
  );
}
