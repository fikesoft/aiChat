import { useAuthMenu } from "@/hooks/useAuthMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
interface IAuthBadgeProps {
  image?: string;
  userEmail?: string;
  userName?: string;
}
const AuthBadge = ({ image, userEmail, userName }: IAuthBadgeProps) => {
  const { isAuthed, isLoading } = useAuthMenu();
  if (isLoading) {
    return (
      <span className="text-sm text-muted-foreground">Loading badge...</span>
    );
  }

  if (!isAuthed) {
    return null;
  }
  return (
    <div className="md:flex items-center gap-3 p-2 rounded-lg bg-card border border-border hidden">
      <Avatar className="block h-9 w-9 rounded-full overflow-hidden">
        {image ? (
          <AvatarImage src={image} className="h-full w-full object-cover" />
        ) : (
          <AvatarFallback className="text-xs">
            {userEmail ? userEmail.at(0) : "User email"}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{userName ?? "User"}</p>
        <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
      </div>
    </div>
  );
};

export default AuthBadge;
