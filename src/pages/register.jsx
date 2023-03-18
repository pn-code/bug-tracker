import React, { useState } from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [inputError, setInputError] = useState(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegisterUser = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);
        if (!checkName(name)) {
            setInputError("Full name must be at least 3 characters.");
        } else if (!checkPassword(password)) {
            setInputError(
                "Password should be 8-30 characters, with at least 1 symbol, uppercase, lowercase, and a number."
            );
        } else {
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
        }
        setLoading(false);
    };

    const checkPassword = (str) => {
        // Regex for password: 8-30 characters, w/ at least 1 symbol, uppercase, lowercase, and a number.
        const regEx =
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,100}$/;
        return regEx.test(str);
    };

    const checkName = (str) => (str.length > 2 ? true : false);

    return (
        <div className="w-full h-[92vh] bg-[#1cba9b] flex items-center justify-center">
            <form
                onSubmit={(e) => handleRegisterUser(e)}
                className="bg-gray-100 p-10 rounded-md flex flex-col gap-4 w-[320px]"
            >
                <section>
                    <h1 className="text-3xl font-bold">Bug Tracker</h1>
                    <h2 className="text-[16px] font-semibold">
                        User Registration
                    </h2>
                </section>

                {inputError && (
                    <section className="text-red-500 font-semibold text-sm">
                        <span>*{inputError}</span>
                    </section>
                )}

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
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            required
                        />
                    </section>

                    <section className="flex gap-2">
                        <input
                            onChange={() => setShowPassword((show) => !show)}
                            id="showPassword"
                            type="checkbox"
                        />
                        <label htmlFor="showPassword">Show Password</label>
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
