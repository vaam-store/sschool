import { signIn } from "@app/server/auth";

export default async function LoginPage() {
  return (
    <div className='container mx-auto px-4 mt-4'>
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
    </div>
  );
}
