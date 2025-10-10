import { signIn, signOut, useSession } from "next-auth/react";

export const useAuthMenu = () => {
  const { data, status } = useSession();
  const user = data?.user ?? null;

  return {
    status,
    user,
    isLoading: status === "loading",
    isAuthed: status === "authenticated",
    isUnauthed: status === "unauthenticated",
    signInGitHub: () => signIn("github", { redirect: false, callbackUrl: "/" }),
    signOutUser: () => signOut(),
  };
};
