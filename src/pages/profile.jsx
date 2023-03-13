import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session?.user) {
            router.push("/login");
        }
    }, []);

    return (
        <div className="bg-gray-100 h-[90vh] w-full flex flex-col px-4 pt-5 items-center lg:justify-center lg:items-start gap-12 lg:flex-row">
            <section className="flex flex-col gap-4">
                <h1 className="text-xl font-bold">User Information</h1>
                <article>
                    <h2 className="font-semibold">Full Name: </h2>
                    <p>User's Full Name</p>
                </article>
                <article>
                    <h2 className="font-semibold">Role: </h2>
                    <p>User's Role</p>
                </article>
            </section>
            <section className="flex flex-col gap-4">
                <h1 className="text-xl font-bold">User Actions</h1>
                <button
                    onClick={() => signOut()}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
                >
                    Log Out
                </button>
            </section>
        </div>
    );
};

export default Profile;
