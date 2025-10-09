"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import style from "./Aside.module.css";
const Aside = () => {
  const { data, status } = useSession();
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? "bg-sidebar-primary text-sidebar-primary-foreground md:bg-transparent md:text-foreground md:font-medium"
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <aside className={style.aside}>
      <nav
        className={
          // Mobile dock surface; Desktop sidebar surface

          " md:border-t-0 md:border-r  " +
          "shadow-lg md:shadow-none " +
          // Height + safe area on mobile
          "h-16 md:h-full px-3 md:px-4 " +
        }
      >
        <ul
          className={
            // Mobile: horizontal dock; Desktop: vertical nav
            "flex items-center justify-around h-full gap-1 " +
            "md:flex-col md:items-stretch md:justify-start md:gap-2 md:py-4"
          }
        >
          {/* Profile / auth */}
          <li className="hidden md:block md:mb-4">
            {status === "unauthenticated" ? (
              <Button
                className="w-full"
                onClick={() =>
                  signIn("github", { redirect: false, callbackUrl: "/" })
                }
              >
                <LogIn className="h-4 w-4" />
                <span className="ml-2">Sign In</span>
              </Button>
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-3 p-2 rounded-lg bg-card border border-border">
                <Avatar className="block h-9 w-9 rounded-full overflow-hidden">
                  {data?.user?.image ? (
                    <AvatarImage
                      src={data.user.image}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-xs">
                      {data?.user?.email?.at(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {data?.user?.name ?? "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {data?.user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">Checking…</span>
            )}
          </li>

          {/* Links */}
          <li>
            <Link
              href="/"
              className={
                "inline-flex items-center gap-2 px-4 py-2 rounded-full md:rounded-md " +
                "transition-colors " +
                isActive("/")
              }
            >
              <Home className="h-5 w-5" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/history"
              className={
                "inline-flex items-center gap-2 px-4 py-2 rounded-full md:rounded-md " +
                "transition-colors " +
                isActive("/history")
              }
            >
              <History className="h-5 w-5" />
              <span className="hidden md:inline">History</span>
            </Link>
          </li>

          {/* Sign in/out button in the dock (mobile) */}
          <li className="md:hidden">
            {status === "authenticated" ? (
              <Button
                onClick={() => signOut()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log Out</span>
              </Button>
            ) : (
              <Button
                onClick={() =>
                  signIn("github", { redirect: false, callbackUrl: "/" })
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Sign In</span>
              </Button>
            )}
          </li>

          {/* Desktop sign out */}
          <li className="hidden md:block mt-auto">
            {status === "authenticated" ? (
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Log Out</span>
              </Button>
            ) : null}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
