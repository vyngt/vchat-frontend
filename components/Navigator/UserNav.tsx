"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Spinner,
} from "@material-tailwind/react";

import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";

import { signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export function LoginButton() {
  return <Button onClick={() => signIn()}>Login</Button>;
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
      return <LoginButton />;
    }
  }

  return <></>;
}
