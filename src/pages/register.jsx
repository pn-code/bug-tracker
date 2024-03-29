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
        <div className="w-full h-[calc(100vh-78px)] flex sm:items-center sm:justify-center">
            <form
                onSubmit={(e) => handleRegisterUser(e)}
                className="bg-gray-100 p-10 h-screen sm:max-h-[540px] sm:rounded-md flex flex-col gap-6 w-full sm:w-[340px]"
            >
                <section>
                    <h1 className="text-3xl font-bold">User Registration</h1>
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
                            className="p-2 rounded-md w-64"
                            type="text"
                            placeholder="full name"
                            required
                        />
                    </section>
                    <section className="flex flex-col gap-1">
                        <label htmlFor="email">Email:</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            className="p-2 rounded-md w-64"
                            type="email"
                            placeholder="email"
                            required
                        />
                    </section>

                    <section className="flex flex-col gap-1">
                        <label htmlFor="password">Password:</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            className="p-2 rounded-md w-64"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            required
                        />
                    </section>

                    <section className="flex gap-2">
                        <input
                            className="w-4"
                            onChange={() => setShowPassword((show) => !show)}
                            id="showPassword"
                            type="checkbox"
                        />
                        <label htmlFor="showPassword">Show Password</label>
                    </section>
                </fieldset>
                <button className="py-4 bg-primary text-gray-50 rounded-md hover:bg-primary/80">
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
