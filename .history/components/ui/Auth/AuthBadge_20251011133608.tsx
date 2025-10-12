import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
interface IAuthBadgeProps {
  image: string;
  userEmail: string;
}
const AuthBadge = ({ image, userEmail }: IAuthBadgeProps) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-card border border-border">
      <Avatar className="block h-9 w-9 rounded-full overflow-hidden">
        {image ? (
          <AvatarImage src={image} className="h-full w-full object-cover" />
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
  );
};

export default AuthBadge;
