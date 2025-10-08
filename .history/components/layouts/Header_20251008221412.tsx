import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Aside = () => {
  const { data, status } = useSession();
  return (
    <aside>
      <nav>
        <ul>
          <li>
            {status === "unauthenticated" ? (
              "Sign In"
            ) : status === "authenticated" ? (
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback />
              </Avatar>
            ) : (
              "Checking "
            )}
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
          <li>Sign Out</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
