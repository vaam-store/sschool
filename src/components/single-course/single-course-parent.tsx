import { type Page } from '@prisma/client';
import Image from 'next/image';

export interface SingleCourseModuleProps {
  page: Page;
}

export function SingleCoursePage({ page }: SingleCourseModuleProps) {
  const meta = page.meta as {
    thumbnailImage: { url: string; alt: string };
  };
  return (
    <div className='flex flex-row items-center gap-4'>
      <div>
        <figure className='relative size-14 overflow-clip rounded-full md:size-16'>
          <div className='bg-base-300 size-full' />
          {meta?.thumbnailImage?.url && (
            <Image
              fill
              className='rounded-box object-cover contrast-125 grayscale'
              src={meta?.thumbnailImage?.url}
              alt={meta?.thumbnailImage?.alt}
              title={meta?.thumbnailImage?.alt ?? page.title}
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 15vw'
            />
          )}
          <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-3xl font-extrabold text-white md:text-4xl'>
            {page.position + 1}
          </div>
        </figure>
      </div>
      <div>
        <div className='text-2xl font-thin tracking-wide'>{page.title}</div>
        <p>{page.description}</p>
      </div>
    </div>
  );
}
