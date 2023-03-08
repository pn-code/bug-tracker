import React from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-6 bg-[#1cba9b] text-white font-semibold items-center">
      <h1 className="text-xl">Bug Tracker</h1>

      <button className="sm:hidden">
        <GiHamburgerMenu size={28}/>
      </button>

      <ul className="gap-12 text-sm hidden sm:flex">
        <Link href="/">Dashboard</Link>
        <Link href="/roles">User Roles</Link>
        <Link href="/issues">Issues</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/profile">Profile</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
