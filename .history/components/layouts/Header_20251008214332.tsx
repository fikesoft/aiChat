import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
