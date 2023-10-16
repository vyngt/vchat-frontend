"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
} from "@material-tailwind/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export function LoginButton() {
  return (
    <button
      className="border-2 border-primary rounded-md p-2 hover:text-background hover:bg-primary transition-colors"
      onClick={() => signIn()}
    >
      Login
    </button>
  );
}

export function SignUpButton() {
  return (
    <Link
      href="/register"
      className="border-2 border-secondary rounded-md p-2 text-background bg-secondary transition-colors"
    >
      Sign Up
    </Link>
  );
}

export function UserMenu({ user }: { user: string }) {
  return (
    <Menu>
      <MenuHandler>
        <div>{user}</div>
      </MenuHandler>
      <MenuList className="bg-background">
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export function UserNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session?.error]);

  if (pathname !== "/login" && pathname !== "/register") {
    if (status === "loading") {
      return <Spinner className="h-10 w-10 text-primary" />;
    } else if (status === "authenticated") {
      return <UserMenu user={session.user?.name as string} />;
    } else {
      return (
        <div className="flex justify-center gap-2">
          <LoginButton />
          <SignUpButton />
        </div>
      );
    }
  }

  return <></>;
}
