// Aside.tsx (edited)
"use client";

import { useAuthMenu } from "@/hooks/useAuthMenu";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavMenu, NavMenuItem } from "./NavMenu";
import AuthButton from "../Auth/AuthButton";
import AuthBadge from "../Auth/AuthBadge";
import "./Aside.module.css";

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
    <aside className="aside">
      <nav className="nav">
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

          {/* hide signOut button while loading too */}
          {!isLoading && (
            <NavMenuItem>
              <AuthButton type="signOut" />
            </NavMenuItem>
          )}
        </NavMenu>
      </nav>
    </aside>
  );
};

export default Aside;
