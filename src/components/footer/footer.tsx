import { Container } from "@app/components/container";

export default function AppFooter() {
  return (
    <div className="bg-base-200">
      <Container>
        <footer className='footer footer-center'>
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              adorsys GIS
            </p>
          </aside>
        </footer>
      </Container>
    </div>
  );
}
