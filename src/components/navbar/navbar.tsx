import { LoginButton } from '@app/components/auth';
import { Container } from '@app/components/container';
import icon from '@app/components/icon.svg';
import ThemeToggle from '@app/components/theme';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Menu } from 'react-feather';

export function AppNavBar() {
  return (
    <div className='sticky top-0 z-40 bg-base-300'>
      <Container className='py-0'>
        <nav className='navbar'>
          <div className='navbar-start flex gap-4'>
            <Link href='/' className='flex flex-row items-center gap-2'>
              <Image src={icon} className='w-8' alt='logo' />
              <span className='text-xl font-extrabold uppercase' color='ghost'>
                Learn
              </span>
            </Link>
          </div>

          <div className='navbar-center'>
            <div className='hidden gap-4 lg:flex'>
              <Link href='/courses'>Course</Link>
            </div>
          </div>

          <div className='navbar-end flex gap-4'>
            <ThemeToggle />
            <Suspense fallback={<span className='loading loading-sm' />}>
              <LoginButton />
            </Suspense>

            <div className='flex gap-4 lg:hidden'>
              <div>
                <details className='dropdown'>
                  <summary className='btn btn-circle btn-soft btn-primary m-1'>
                    <Menu />
                  </summary>

                  <ul className='menu dropdown-content dropdown-end dropdown-bottom z-[1] w-52 rounded-box bg-base-100 p-2 shadow'>
                    <li>
                      <Link href='/courses'>Course</Link>
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}
