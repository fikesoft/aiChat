import Link from "next/link";
import React from "react";

const Aside = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link></Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
