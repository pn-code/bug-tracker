import React from "react";
import Link from "next/link";

const Login = () => {
    return (
        <div className="w-full h-[100vh] bg-[#1cba9b] flex items-center justify-center">
            <form className="bg-gray-100 p-10 rounded-md flex flex-col gap-4">
                <section>
                    <h1 className="text-3xl font-bold">Bug Tracker</h1>
                    <h2 className="text-[16px] font-semibold">User Login</h2>
                </section>

                <fieldset className="flex flex-col gap-4">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            className="p-2 rounded-md"
                            type="text"
                            placeholder="username"
                        />
                    </section>

                    <section className="flex flex-col">
                        <label htmlFor="username">Password:</label>
                        <input
                            id="password"
                            className="p-2 rounded-md"
                            type="text"
                            placeholder="password"
                        />
                    </section>
                </fieldset>
                <button className="py-4 bg-blue-400 text-gray-50 rounded-md">
                    Login
                </button>
                <span>
                    Don't have an account?{" "}
                    <Link className="underline" href="/register">Register here.</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
