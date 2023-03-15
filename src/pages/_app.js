import serverAPI from "@/api/axios";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/UserContext";

export default function App({ Component, pageProps }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await serverAPI.get("/api/auth/refresh")
            setUser(res.data)
        }
        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={user}>
            <Navbar />
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}
