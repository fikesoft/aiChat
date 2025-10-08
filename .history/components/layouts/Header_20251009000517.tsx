"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";

interface IAsideProps {
  className?: string;
}
const Aside = ({ className }: IAsideProps) => {
  const { data, status } = useSession();
  console.log(data?.user.id?)
  return (
    <aside className={className ?? ""}>
      <nav>
        <ul>
          <li>
            {status === "unauthenticated" ? (
              <Button
                onClick={() =>
                  signIn("github", {
                    redirect: false,
                    callbackUrl: "/",
                  })
                }
              >
                <LogIn />
                {" Sign In"}
              </Button>
            ) : status === "authenticated" ? (
              <Avatar>
                {data.user?.image ? (
                  <AvatarImage src={data.user?.image} />
                ) : (
                  <AvatarFallback>{data.user?.email?.at(0)}</AvatarFallback>
                )}
              </Avatar>
            ) : (
              "Checking"
            )}
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
          <li>
            {status === "authenticated" ? (
              <Button onClick={() => signOut()}>
                <LogOut />
                {" Log Out"}
              </Button>
            ) : null}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
