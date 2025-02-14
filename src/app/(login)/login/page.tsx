import { signIn } from "@app/server/auth";
import { Container } from "@app/components/container";

export default async function LoginPage() {
  return (
    <Container className='mt-4'>
      <div className='flex flex-col gap-4'>
        <h2>Login to SSchool</h2>
        <div>
          <form
            key="adorsys"
            action={async () => {
              "use server";
              await signIn("keycloak", { redirectTo: "/" });
            }}
          >
            <button type="submit" className="btn btn-primary">
              <span>Sign in with Adorsys</span>
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
