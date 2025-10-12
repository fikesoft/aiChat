// Aside.tsx (edited)
"use client";

import { useAuthMenu } from "@/hooks/useAuthMenu";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavMenu, NavMenuItem } from "./NavMenu";
import AuthButton from "../Auth/AuthButton";
import AuthBadge from "../Auth/AuthBadge";
import "./Aside.module.css";
import { Home, History } from "lucide-react";
import Link from "next/link";
import style from "./Aside.module.css";
const Aside = () => {
  const { data } = useSession();
  const user = data?.user;
  const { isLoading } = useAuthMenu(); // single source of truth for loading

  const image = user?.image ?? undefined;
  const name = user?.name ?? undefined;
  const email = user?.email ?? undefined;
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) =>
    pathname === href
      ? "bg-sidebar-primary text-sidebar-primary-foreground md:bg-transparent md:text-foreground md:font-medium"
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <aside className={style.aside}>
      <nav className={style.nav}>
        <NavMenu>
          <NavMenuItem className="hidden md:block md:mb-4">
            {isLoading ? (
              <span className="text-sm text-muted-foreground">
                Loading badge...
              </span>
            ) : (
              <>
                <AuthButton type="signIn" />
                <AuthBadge image={image} userEmail={email} userName={name} />
              </>
            )}
          </NavMenuItem>
          <NavMenuItem>
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
          </NavMenuItem>
          <NavMenuItem>
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
          </NavMenuItem>
        </NavMenu>
        {!isLoading && <AuthButton type="signOut" />}
      </nav>
    </aside>
  );
};

export default Aside;
