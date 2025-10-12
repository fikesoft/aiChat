"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./Aside.module.css";
import { NavMenu, NavMenuItem } from "./NavMenu";
import AuthButton from "../Auth/AuthButton";
import AuthBadge from "../Auth/AuthBadge";
const Aside = () => {
  const { data, status } = useSession();
  const user = data?.user;
  let image: string, name: string, email: string;
  if (user && user?.image && user.name && user.email) {
    image = user.image;
    name = user.name;
    email = user.email;
  }
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? "bg-sidebar-primary text-sidebar-primary-foreground md:bg-transparent md:text-foreground md:font-medium"
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <aside className="aside">
      <nav className="nav">
        <NavMenu>
          <NavMenuItem className="hidden md:block md:mb-4">
            {status === "unauthenticated" ? (
              <AuthButton type="signIn" />
            ) : status === "authenticated" ? (
              <AuthBadge image="" userEmail="" userName="" />
            ) : (
              <span className="text-sm text-muted-foreground">Checking…</span>
            )}
          </NavMenuItem>
          <NavMenuItem>
            <AuthButton type="signOut" />
          </NavMenuItem>
        </NavMenu>
      </nav>
    </aside>
  );
};

export default Aside;
/**
 * <ul className={style.nav__menu}>
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
 */
