import React, { useState } from "react";
import Link from "next/link";
import serverAPI from "@/api/axios";
import { useRouter } from "next/router";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const router = useRouter();

  const authenticateUser = useUser().authenticate;

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await serverAPI.post("/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        authenticateUser(res.data);
        router.push("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessage = error.response.data.message;
        setFormError(errorMessage);
      }
      console.error(error);
    }
  };

  const loginWithTestAcc = async (e) => {
    e.preventDefault();

    try {
      const res = await serverAPI.post("/api/auth/login", {
        email: "admin@admin.com",
        password: "Password123!",
      });

      if (res.status === 200) {
        authenticateUser(res.data);
        router.push("/");
      }
      
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessage = error.response.data.message;
        setFormError(errorMessage);
      }
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-78px)] flex sm:items-center sm:justify-center">
      <form
        onSubmit={(e) => handleUserLogin(e)}
        className="bg-gray-100 p-10 h-screen sm:max-h-[460px] sm:rounded-md flex flex-col gap-6 w-full sm:w-[340px]"
      >
        <section>
          <h1 className="text-3xl font-bold">User Login</h1>
          <span className="text-sm text-red-600 font-bold">{formError}</span>
        </section>

        <fieldset className="flex flex-col gap-4">
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

          <section className="flex flex-col">
            <label htmlFor="username">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              className="p-2 rounded-md w-64"
              type="password"
              placeholder="password"
              required
            />
          </section>
        </fieldset>
        <section className="flex gap-4">
          <button className="py-4 px-8 bg-primary text-gray-50 rounded-md hover:bg-primary/80">
            Login
          </button>
          <button onClick={loginWithTestAcc} type="button" className="py-4 px-8 bg-primary/10 text-primary rounded-md hover:bg-primary/20">
            Test Account
          </button>
        </section>

        <span>
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/register">
            Register here.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
