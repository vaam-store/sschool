import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className='btn btn-block btn-primary' href='/'>
        Return Home
      </Link>
    </div>
  );
}
