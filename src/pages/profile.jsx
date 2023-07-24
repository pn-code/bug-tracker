import serverAPI from "@/api/axios";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import { serialize } from "cookie";

const Profile = () => {
    const user = useUser().user;

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
        <main className="h-full sm:h-[90vh] w-full flex flex-col px-4 pt-5 gap-4 text-text">
            <header className="flex justify-between">
            <h1 className="text-2xl font-bold">User Profile</h1>
                <button
                    onClick={() => logoutUser()}
                    className="w-24 px-4 py-2 bg-red-600/90 text-white rounded-md hover:bg-red-600/80"
                >
                    Log Out
                </button></header>
            

            <section>
                <article>
                    <h2 className="font-semibold">Full Name: </h2>
                    <p className="text-green-300">{user?.name}</p>
                </article>
                <article>
                    <h2 className="font-semibold">Role: </h2>
                    <p className="text-green-300">{user?.role}</p>
                </article>
            </section>

        </main>
    );
};

export default Profile;
