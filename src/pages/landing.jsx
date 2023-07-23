import Link from "next/link";
import React from "react";

export default function LandingPage() {
    return (
        <main className="h-[calc(100vh-76px)] w-full flex justify-center items-center flex-col gap-8 custom-bg">
            <section className="bg-gray-900/95 flex flex-col gap-6 sm:gap-10 p-8 sm:rounded-md items-center">
                <h1 className=" text-white text-xl sm:text-5xl font-semibold">
                    Keep track of bugs for annihilation.
                </h1>
                <Link
                    className="bg-gray-200 px-10 py-3 rounded-sm text-[14px] sm:text-lg hover:bg-white duration-200 ease-linear"
                    href="/register"
                >
                    Get Started
                </Link>
            </section>
        </main>
    );
}
