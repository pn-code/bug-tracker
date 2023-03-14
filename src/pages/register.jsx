import React, { useState } from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        try {
            const res = await serverAPI.post("/api/auth/register", {
                name,
                email,
                password,
            });
            if (res.status === 201) {
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-[100vh] bg-[#1cba9b] flex items-center justify-center">
            <form
                onSubmit={(e) => handleRegisterUser(e)}
                className="bg-gray-100 p-10 rounded-md flex flex-col gap-4"
            >
                <section>
                    <h1 className="text-3xl font-bold">Bug Tracker</h1>
                    <h2 className="text-[16px] font-semibold">
                        User Registration
                    </h2>
                </section>

                <fieldset className="flex flex-col gap-4">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="name"
                            className="p-2 rounded-md"
                            type="text"
                            placeholder="full name"
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            className="p-2 rounded-md"
                            type="email"
                            placeholder="email"
                            required
                        />
                    </section>

                    <section className="flex flex-col">
                        <label htmlFor="password">Password:</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            className="p-2 rounded-md"
                            type="password"
                            placeholder="password"
                            required
                        />
                    </section>

                </fieldset>
                <button className="py-4 bg-blue-400 text-gray-50 rounded-md hover:bg-blue-500">
                    Register
                </button>
                <span>
                    Have an account?{" "}
                    <Link className="underline" href="/login">
                        Login here.
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
