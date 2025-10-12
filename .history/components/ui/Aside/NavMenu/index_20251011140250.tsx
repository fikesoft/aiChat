"use client ";
import React from "react";
import style from "./Nav.module.css";
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
  return <li className={`${style.nav__menu_item} ${className}`}>{children}</li>;
};
