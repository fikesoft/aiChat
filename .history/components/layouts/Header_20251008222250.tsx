import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";

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
                <AvatarFallback>{data.user?.email?.at(0)}</AvatarFallback>
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
              <Button>
                <Button>
                  <LogOut />
                  {" Log Out"}
                </Button>
              </Button>
            ) : null}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
