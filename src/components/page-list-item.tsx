import type { Page } from '@prisma/client';
import Image from 'next/image';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageListItemProps {
  page: Page;
  isChild?: boolean;
}

export function PageListItem({ page, isChild }: PageListItemProps) {
  const meta = useMemo(
    () =>
      page.meta as {
        thumbnailImage: { url: string; alt: string };
      },
    [page.meta],
  );
  return (
    <div className='flex flex-row items-center gap-4'>
      <div>
        <figure className='relative overflow-clip hidden size-10 lg:block rounded-full md:size-12'>
          <div className='bg-base-300 size-full' />
          {meta?.thumbnailImage?.url && (
            <Image
              fill
              className='rounded-box object-cover'
              src={meta.thumbnailImage.url}
              alt={meta.thumbnailImage.alt}
              sizes='(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 5vw'
            />
          )}
          <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-xl font-extrabold text-white md:text-2xl'>
            {page.position + 1}
          </div>
        </figure>
      </div>

      <div>
        <h3
          className={twMerge('line-clamp-2 tracking-wide', [
            isChild && '',
            !isChild && 'font-thin md:text-2xl',
          ])}>
          {page.title}
        </h3>
        <p className='line-clamp-1 opacity-50'>{page.description}</p>
      </div>
    </div>
  );
}
