"use client ";
import React from "react";
interface INavMenuProps {
  children: React.ReactNode;
}
export const NavMenu = ({ children }: INavMenuProps) => {
  return <ul className={"nav__menu"}>{children}</ul>;
};

interface INavMenuItemProps {
  children: React.ReactNode;
  className?: string;
}
export const NavMenuItem = ({ children, className }: INavMenuItemProps) => {
  return <li className={`nav__menu-item ${className ?? ""}`}>{children}</li>;
};
