import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { GiHamburgerMenu } from "react-icons/gi";
import { useUser } from "@/contexts/UserContext";
import logo from "/public/assets/logo.png";

const Navbar = () => {
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const user = useUser().user;

    return (
        <nav className="flex justify-between px-4 py-3 bg-black text-text font-semibold items-center">
            <Link className="hover:scale-105 ease-linear duration-200" href="/">
                <Image src={logo} alt="Bug Tracker" height={70} width={210} />
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
            {openNavMenu && user && (
                <div className="fixed bg-background h-[100vh] z-[999] w-full top-0 left-0 flex items-center justify-center">
                    <div className="w-[290px] flex flex-col mx-3 gap-12">
                        <section className="flex justify-between w-full">
                            <Image
                                className="p-2 rounded-md bg-black"
                                src={logo}
                                alt="Bug Tracker"
                                height={70}
                                width={210}
                            />
                            <button
                                onClick={() => setOpenNavMenu(false)}
                                className="text-xl font-bold hover:bg-gray-50 hover:text-background rounded-full px-3 py-1"
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
                            {user?.role === "admin" && (
                                <li className="w-full">
                                    <Link
                                        className="hover:bg-[#29947e] px-2 py-2 rounded-md"
                                        onClick={() => setOpenNavMenu(false)}
                                        href="/roles"
                                    >
                                        Roles
                                    </Link>
                                </li>
                            )}
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
                <ul className="gap-12 text-sm sm:text-[16px] hidden sm:flex">
                    <Link
                        className="border-b-4 border-transparent hover:border-accent ease-linear duration-200"
                        href="/"
                    >
                        Dashboard
                    </Link>

                    {user?.role === "admin" && (
                        <Link
                            className="border-b-4 border-transparent hover:border-accent ease-linear duration-200"
                            href="/roles"
                        >
                            User Roles
                        </Link>
                    )}

                    <Link
                        className="border-b-4 border-transparent hover:border-accent ease-linear duration-200"
                        href="/issues"
                    >
                        Issues
                    </Link>
                    <Link
                        className="border-b-4 border-transparent hover:border-accent ease-linear duration-200"
                        href="/projects"
                    >
                        Projects
                    </Link>
                    <Link
                        className="border-b-4 border-transparent hover:border-accent ease-linear duration-200"
                        href="/profile"
                    >
                        Profile
                    </Link>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
