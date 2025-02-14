import { LogIn, LogOut } from "react-feather";
import Link from "next/link";
import { auth } from "@app/server/auth";
import { twMerge } from "tailwind-merge";

export async function LoginButton() {
  const session = await auth();
  return (
    <Link
      href={session ? "/logout" : "/login"}
      className={twMerge("btn btn-circle btn-outline", [
        session && "btn-error",
        !session && "btn-primary",
      ])}
    >
      {session ? <LogOut /> : <LogIn />}
    </Link>
  );
}
