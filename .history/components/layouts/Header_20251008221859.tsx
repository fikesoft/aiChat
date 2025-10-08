import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

const Aside = () => {
  const { data, status } = useSession();
  return (
    <aside>
      <nav>
        <ul>
          <li>
            {status === "unauthenticated" ? (
              <Button>
                <LogIn />
                {" Sign In"}
              </Button>
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
