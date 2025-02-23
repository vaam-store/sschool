import { Container } from '@app/components/container';
import { signOut } from '@app/server/auth';
import { LogOut } from 'react-feather';

export default async function LogoutPage() {
  return (
    <Container className='mt-4'>
      <div className='flex flex-col gap-4'>
        <h2>Login to SSchool</h2>
        <div>
          <form
            key='adorsys'
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}>
            <button type='submit' className='btn btn-error'>
              <LogOut />
              <span>Do you wanna sign out?</span>
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
