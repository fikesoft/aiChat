"use client";

import { Button } from "../button";
import { LogIn, LogOut } from "lucide-react";
import { useAuthMenu } from "@/hooks/useAuthMenu";

type AuthButtonProps = {
  type?: "signIn" | "signOut" | "both";
  className?: string;
};

export default function AuthButton({
  type = "both",
  className,
}: AuthButtonProps) {
  const { isAuthed, isUnauthed, isLoading, signInGitHub, signOutUser } =
    useAuthMenu();

  if (isLoading) {
    return <span className="text-sm text-muted-foreground">Checking…</span>;
  }

  // Only sign-in button
  if (type === "signIn") {
    if (!isUnauthed) return null;
    return (
      <Button className={`w-full ${className ?? ""}`} onClick={signInGitHub}>
        <LogIn className="h-4 w-4" />
        <span className="ml-2">Sign In</span>
      </Button>
    );
  }

  // Only sign-out button
  if (type === "signOut") {
    if (!isAuthed) return null;
    return (
      <Button
        variant="secondary"
        className={`w-full ${className ?? ""}`}
        onClick={signOutUser}
      >
        <LogOut className="h-4 w-4" />
        <span className="ml-2">Log Out</span>
      </Button>
    );
  }

  return isAuthed ? (
    <Button
      variant="secondary"
      className={`w-full ${className ?? ""}`}
      onClick={signOutUser}
    >
      <LogOut className="h-4 w-4" />
      Log Out
    </Button>
  ) : (
    <Button className={`w-full ${className ?? ""}`} onClick={signInGitHub}>
      <LogIn className="h-4 w-4" />
      <span className="ml-2">Sign In</span>
    </Button>
  );
}
