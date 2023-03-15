import React, { useContext, useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserContext } from "@/contexts/UserContext";

const Navbar = () => {
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const user = useUserContext();

    return (
        <nav className="flex justify-between px-4 py-6 bg-[#1cba9b] text-white font-semibold items-center">
            <Link href="/">
                <h1 className="text-xl">Bug Tracker</h1>
            </Link>

            {user && (
                <button
                    onClick={() => setOpenNavMenu(true)}
                    className="sm:hidden"
                >
                    <GiHamburgerMenu size={28} />
                </button>
            )}

            {!user && <Link href="/login">Login</Link>}

            {/* Mobile NavMenu */}
            {openNavMenu &&
                user(
                    <div className="fixed bg-[#1cba9b] h-[100vh] w-full top-0 left-0 flex items-center justify-center">
                        <div className="w-[290px] flex flex-col mx-3 gap-12">
                            <section className="flex justify-between w-full">
                                <h1 className="text-3xl font-bold">
                                    Bug Tracker
                                </h1>
                                <button
                                    onClick={() => setOpenNavMenu(false)}
                                    className="text-xl font-bold hover:bg-gray-50 hover:text-[#1cba9b] rounded-full px-3 py-1"
                                >
                                    X
                                </button>
                            </section>
                            <ul className="flex flex-col gap-8 text-2xl">
                                <li className="w-full">
                                    <Link
                                        className="hover:bg-[#29947e] px-2 py-2 rounded-md"
                                        onClick={() => setOpenNavMenu(false)}
                                        href="/"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        className="hover:bg-[#29947e] px-2 py-2 rounded-md"
                                        onClick={() => setOpenNavMenu(false)}
                                        href="/roles"
                                    >
                                        Roles
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        className="hover:bg-[#29947e] px-2 py-2 rounded-md"
                                        onClick={() => setOpenNavMenu(false)}
                                        href="/issues"
                                    >
                                        Issues
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        className="hover:bg-[#29947e] px-2 py-2 rounded-md"
                                        onClick={() => setOpenNavMenu(false)}
                                        href="/projects"
                                    >
                                        Projects
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        className="hover:bg-[#29947e] px-2 py-2 rounded-md"
                                        onClick={() => setOpenNavMenu(false)}
                                        href="/profile"
                                    >
                                        Profile
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

            {user && (
                <ul className="gap-12 text-sm hidden sm:flex">
                    <Link href="/">Dashboard</Link>
                    <Link href="/roles">User Roles</Link>
                    <Link href="/issues">Issues</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/profile">Profile</Link>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
