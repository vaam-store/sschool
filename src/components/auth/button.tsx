import { auth } from '@app/server/auth';
import Link from 'next/link';
import { LogIn, LogOut, Plus } from 'react-feather';
import { twMerge } from 'tailwind-merge';

export async function LoginButton() {
  const session = await auth();
  return (
    <div className='flex flex-row gap-4 items-center'>
      {session && session.user && session.user.role === 'ADMIN' && (
        <Link
          className='btn btn-circle btn-soft btn-primary'
          href='/courses/add'>
          <Plus />
        </Link>
      )}
      {session && <div className='hidden sm:block'>{session.user.name}</div>}
      <Link
        href={session ? '/logout' : '/login'}
        className={twMerge('btn btn-circle btn-soft', [
          session && 'btn-error',
          !session && 'btn-primary',
        ])}>
        {session ? <LogOut /> : <LogIn />}
      </Link>
    </div>
  );
}
