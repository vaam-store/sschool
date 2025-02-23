import { Container } from '@app/components/container';
import { EditCourse } from '@app/components/edit-course';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Course',
  description: 'Here you can create a new course.',
};

export default async function AddCourse() {
  return (
    <>
      <Container>
        <h1 className='app-title'>Create course</h1>
      </Container>

      <Container>
        <EditCourse />
      </Container>
    </>
  );
}
