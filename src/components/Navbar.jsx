import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between px-4 py-6 bg-[#1cba9b] text-white font-semibold items-center">
            <h1 className="text-xl">Bug Tracker</h1>
            <ul className="flex gap-12 text-sm">
                <Link href="/">Dashboard</Link>
                <Link href="/user-roles">User Roles</Link>
                <Link href="/issues">Issues</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/profile">Profile</Link>
            </ul>
        </nav>
    );
};

export default Navbar;
