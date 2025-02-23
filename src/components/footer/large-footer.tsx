import { Container } from '@app/components/container';
import icon from '@app/components/icon.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function LargeFooter() {
  return (
    <div className='bg-base-300'>
      <Container>
        <footer className='footer sm:footer-horizontal p-10'>
          <aside>
            <Image src={icon} className='fill-current w-24 h-24' alt='logo' />

            <p>
              Copyright © {new Date().getFullYear()}
              <br />
              All right reserved by adorsys GIS
            </p>
          </aside>
          <nav>
            <h6 className='footer-title'>Company</h6>
            <Link href='/res/faq' className='link link-hover'>
              FAQ
            </Link>
            <Link href='/res/contact' className='link link-hover'>
              Contact
            </Link>
          </nav>
          <nav>
            <h6 className='footer-title'>Legal</h6>
            <Link href='/res/tos' className='link link-hover'>
              Terms of use
            </Link>
            <Link href='/res/privacy' className='link link-hover'>
              Privacy policy
            </Link>
          </nav>
        </footer>
      </Container>
    </div>
  );
}
