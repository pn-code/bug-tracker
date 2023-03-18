import serverAPI from "@/api/axios";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import { serialize } from "cookie";

const Profile = () => {
    const user = useUser()[0];

    const logoutUser = async () => {
        const res = await serverAPI.get("/api/auth/logout");
        if (res.status == 200) {
            const cookieSerialized = serialize("jwt", "", {
                maxAge: -1,
                path: "/",
            });
            document.cookie = cookieSerialized;
            window.location.href = "/";
        }
    };

    return (
        <div className="bg-gray-100 h-[90vh] w-full flex flex-col px-4 pt-5 items-center lg:justify-center lg:items-start gap-12 lg:flex-row">
            <section className="flex flex-col gap-4">
                <h1 className="text-xl font-bold">User Information</h1>
                <article>
                    <h2 className="font-semibold">Full Name: </h2>
                    <p>{user?.name}</p>
                </article>
                <article>
                    <h2 className="font-semibold">Role: </h2>
                    <p>{user?.role}</p>
                </article>
            </section>
            <section className="flex flex-col gap-4">
                <h1 className="text-xl font-bold">User Actions</h1>
                <button
                    onClick={() => logoutUser()}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Log Out
                </button>
            </section>
        </div>
    );
};

export default Profile;
